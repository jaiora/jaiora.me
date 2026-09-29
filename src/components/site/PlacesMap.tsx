import type { CSSProperties } from 'react'
import type { Place } from '@/data/places'
import { WORLD_LAT0, WORLD_LON0, WORLD_MASK, WORLD_STEP } from '@/data/worldmask'
import { useT, type L } from '@/lib/i18n'

const W = WORLD_MASK[0].length * WORLD_STEP
const H = WORLD_MASK.length * WORLD_STEP

// Суша — один путь из точек нулевой длины с круглыми концами: лёгкий SVG без картинок и библиотек
const LAND = WORLD_MASK.flatMap((row, r) =>
  [...row].flatMap((c, i) => (c === '#' ? [`M${i * WORLD_STEP + WORLD_STEP / 2} ${r * WORLD_STEP + WORLD_STEP / 2}h0`] : [])),
).join('')

const px = (lon: number) => lon - WORLD_LON0
const py = (lat: number) => WORLD_LAT0 - lat

// Карта мира с точками: подсветка точки синхронизирована со списком (active / onActive).
// current — индекс текущего города (страница конкретной локации): крупнее и другим цветом,
// чтобы было видно, где мы, даже без наведения. Подпись при этом только при наведении —
// имя текущего города и так видно в заголовке страницы, повторять его на карте не нужно.
// onSelect — клик мышью по точке ведёт на страницу города, как и клик по тегу под картой;
// клавиатурным фокусом точки намеренно не делаем — тот же переход уже доступен через теги
// под картой, а системная рамка доступности вокруг фокусируемого SVG-элемента (не убирается
// через CSS outline, рисуется поверх на уровне ОС) выглядит как визуальный баг.
// Название точки показываем только своей подписью (s-map-label): нативный title браузера
// у сильно смасштабированного SVG всплывает не там, где точка на экране.
export default function PlacesMap({ places, label, active, onActive, onSelect, current, sequential, sequentialStepMs = 70 }: {
  places: Place[]
  label: L
  active: number | null
  onActive: (i: number | null) => void
  onSelect?: (i: number) => void
  current?: number | null
  // Точки появляются по очереди (для интро-анимации на главной), а не все сразу
  sequential?: boolean
  sequentialStepMs?: number
}) {
  const { t } = useT()
  const cur = active !== null ? places[active] : null
  return (
    <svg className="s-map" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={t(label)}>
      <path className="s-map-land" d={LAND} />
      {places.map((p, i) => {
        const isCurrent = current === i
        const style: Record<string, string> = {}
        if (p.color) style['--pin-color'] = p.color
        if (sequential) style.animationDelay = `${i * sequentialStepMs}ms`
        return (
          <g
            key={p.name.ru}
            className={`s-map-pin${p.key ? ' is-key' : ''}${active === i ? ' is-active' : ''}${isCurrent ? ' is-current' : ''}${onSelect ? ' is-clickable' : ''}${sequential ? ' is-sequential' : ''}`}
            style={Object.keys(style).length ? (style as CSSProperties) : undefined}
            onMouseEnter={() => onActive(i)}
            onMouseLeave={() => onActive(null)}
            onClick={onSelect ? () => onSelect(i) : undefined}
          >
            <circle className="s-map-halo" cx={px(p.lon)} cy={py(p.lat)} r={isCurrent ? 8 : p.key ? 7 : 5} />
            <circle className="s-map-dot" cx={px(p.lon)} cy={py(p.lat)} r={isCurrent ? 3 : p.key ? 2.6 : 1.6} />
          </g>
        )
      })}
      {cur && (
        <text key={cur.name.ru} className="s-map-label" x={px(cur.lon)} y={py(cur.lat) - 7} textAnchor="middle">
          {t(cur.name)}
        </text>
      )}
    </svg>
  )
}
