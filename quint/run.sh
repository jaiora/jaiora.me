#!/usr/bin/env bash
# Прогон всех моделей и проверка правил quint/PRACTICES.md. Использование:
#   ./run.sh                 все модели
#   ./run.sh live_stream     одна модель
#   SAMPLES=200000 ./run.sh  перебор шире (по умолчанию 20000)
#   SEED=7 ./run.sh          другой seed (по умолчанию 42)
#   VERIFY=1 ./run.sh        ещё и Apalache по fixed (VSTEPS шагов, по умолчанию 8; нужна Java 21+)
#                            и TLC по // temporal: (полный перебор, минуты)
#
# Что требуется от модели (строки шапки):
#   // props: a b c                  свойства
#   // expect current: ❌ ✅ ❌        что даёт current по каждому свойству, в том же порядке (fixed — всегда все ✅)
#   // witnesses: w1 w2              интересные состояния — в fixed каждое должно случаться (> 0 % трасс)
#   // options: a b                  развилка: модули opt_a, opt_b (только если решение не принято)
#   // option props: x y             свойства, которыми варианты различаются; // expect opt_a: ✅ ❌ — цена варианта
#   // temporal: p                   «когда-нибудь случится» (temporal …), проверяет TLC при VERIFY=1
#   // temporal mutants: name→p      мутант, ломающий temporal-свойство
#   // mutants: name→prop …          модуль mut_<name>: одна порча, ломающая prop. Обязателен для каждого
#                                    свойства, которое current не нарушает (иначе у свойства нет «зубов»)
# Проверяется: сценарии …BugTest (current) и …FixedTest (fixed) есть и проходят; ожидания совпали; тупиков нет
# (трасса = STEPS+1); witnesses > 0 %; каждый мутант ломает своё свойство. Код выхода ≠ 0 при любом расхождении.
set -u
cd "$(dirname "$0")/specs"
SAMPLES="${SAMPLES:-20000}"
STEPS="${STEPS:-25}"
SEED="${SEED:-42}"
VSTEPS="${VSTEPS:-8}"
[ -d /opt/homebrew/opt/openjdk/bin ] && export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"
specs=("$@")
[ ${#specs[@]} -eq 0 ] && specs=($(ls *.qnt | sed 's/\.qnt$//'))
bad=0
fail() { echo "  ⚠ $1"; bad=1; }
head_of() { grep -m1 "^// $1:" "$file" | sed "s#^// $1:##"; }

for spec in "${specs[@]}"; do
  file="$spec.qnt"
  echo "━━ $spec"
  quint typecheck "$file" >/dev/null 2>&1 || { fail "не разбирается: quint typecheck $file"; continue; }
  props=($(head_of props)); expect=($(head_of "expect current")); wits=($(head_of witnesses)); muts=($(head_of mutants))
  [ ${#props[@]} -eq 0 ] && fail "нет строки // props:"
  [ ${#expect[@]} -ne ${#props[@]} ] && fail "// expect current: ${#expect[@]} значений на ${#props[@]} свойств"
  [ ${#wits[@]} -eq 0 ] && fail "нет строки // witnesses:"

  for main in current fixed; do
    want=$([ "$main" = current ] && echo BugTest || echo FixedTest)
    out=$(quint test "$file" --main="$main" --match="${want}\$" 2>&1)
    res=$(echo "$out" | grep -E "passing|failing|failed" | tr '\n' ' ')
    names=$(echo "$out" | grep -oE "[A-Za-z]+${want}" | sort -u | tr '\n' ' ')
    echo "  $main · сценарии: ${res:-нет} · ${names:-—}"
    if [ -z "$res" ] || echo "$res" | grep -qE "failing|failed"; then fail "сценарии $main"; fi

    i=0
    for p in ${props[@]+"${props[@]}"}; do
      wflag=(); [ "$main" = fixed ] && [ ${#wits[@]} -gt 0 ] && wflag=(--witnesses "${wits[@]}")
      out=$(quint run "$file" --main="$main" --invariant="$p" --max-steps="$STEPS" --max-samples="$SAMPLES" --seed="$SEED" ${wflag[@]+"${wflag[@]}"} 2>&1)
      r=$(echo "$out" | grep -E "^\[(ok|violation)\]" | sed 's/ (.*//; s/\[ok\] No violation found/✅/; s/\[violation\] Found an issue/❌/')
      want_r=$([ "$main" = fixed ] && echo ✅ || echo "${expect[$i]:-?}")
      mark=$([ "$r" = "$want_r" ] && echo "" || echo "  ← ждали $want_r")
      echo "  $main · $p: ${r:-?}$mark"
      [ -n "$mark" ] && bad=1
      # 🧱 тупик: на ✅ все трассы должны дойти до STEPS+1
      if [ "$r" = ✅ ]; then
        mn=$(echo "$out" | sed -n 's/.*Trace length statistics: max=[0-9]*, min=\([0-9]*\).*/\1/p')
        [ -n "$mn" ] && [ "$mn" -lt $((STEPS + 1)) ] && fail "$main · $p: тупик — трасса $mn из $((STEPS + 1)) (нужен шаг stutter или недостающее действие)"
      fi
      # 🎯 witnesses в fixed: каждое > 0 %
      if [ "$main" = fixed ]; then
        echo "$out" | grep -E "was witnessed in 0 trace" | sed 's/ was witnessed.*//' | while read -r w; do echo "  ⚠ $p: witness $w — 0 % трасс"; done
        echo "$out" | grep -qE "was witnessed in 0 trace" && bad=1
      fi
      i=$((i + 1))
    done
  done

  # 🧬 зубы: свойство, которое current не нарушает, обязано ломаться мутантом
  i=0
  for p in ${props[@]+"${props[@]}"}; do
    if [ "${expect[$i]:-}" = ✅ ] && ! printf "%s\n" ${muts[@]+"${muts[@]}"} | grep -q "→$p\$"; then fail "$p держится и в current — нужен мутант (// mutants: name→$p)"; fi
    i=$((i + 1))
  done
  for m in ${muts[@]+"${muts[@]}"}; do
    name=${m%%→*}; p=${m#*→}
    r=$(quint run "$file" --main="mut_$name" --invariant="$p" --max-steps="$STEPS" --max-samples="$SAMPLES" --seed="$SEED" 2>&1 | grep -E "^\[(ok|violation)\]")
    if echo "$r" | grep -q violation; then echo "  🧬 mut_$name ломает $p ✅"; else fail "mut_$name не ломает $p — свойство без зубов"; fi
  done

  # 🔀 развилка (решение не принято): модули opt_<name>, свойства // option props:, ожидание // expect opt_<name>:
  #    печатается таблицей «вариант × свойство»; ❌ у варианта — не ошибка, а его цена. Ошибка — расхождение с ожиданием
  opts=($(head_of options)); oprops=($(head_of "option props"))
  for o in ${opts[@]+"${opts[@]}"}; do
    oexp=($(head_of "expect opt_$o")); row=""; i=0
    [ ${#oexp[@]} -ne ${#oprops[@]} ] && fail "// expect opt_$o: ${#oexp[@]} значений на ${#oprops[@]} свойств"
    for p in ${oprops[@]+"${oprops[@]}"} ${props[@]+"${props[@]}"}; do
      r=$(quint run "$file" --main="opt_$o" --invariant="$p" --max-steps="$STEPS" --max-samples="$SAMPLES" --seed="$SEED" 2>&1 \
          | grep -E "^\[(ok|violation)\]" | sed 's/ (.*//; s/\[ok\] No violation found/✅/; s/\[violation\] Found an issue/❌/')
      if [ $i -lt ${#oprops[@]} ]; then w="${oexp[$i]:-?}"; else w=✅; fi   # обязательные свойства — ✅ в любом варианте
      row="$row $p ${r:-?}"; [ "$r" != "$w" ] && { row="$row(ждали $w)"; bad=1; }
      i=$((i + 1))
    done
    echo "  🔀 $o:$row"
  done

  # 🔬 Apalache (по запросу): bounded-проверка fixed, ловит и тупики
  if [ "${VERIFY:-0}" = 1 ]; then
    r=$(quint verify "$file" --main=fixed --invariant="$(IFS=,; echo "${props[*]}" | sed 's/,/ and /g')" --max-steps="$VSTEPS" 2>&1 | grep -E "^\[(ok|violation)\]|deadlock|^error" | head -2)
    echo "  🔬 verify fixed ($VSTEPS шагов): ${r:-?}"
    echo "$r" | grep -q "^\[ok\]" || bad=1
    # ⏳ «когда-нибудь случится» — только полный перебор TLC (quint run temporal не проверяет): fixed держит,
    #    каждый // temporal mutants: name→prop ломает. </dev/null — чтобы вопрос y/N не повесил прогон
    tl() { quint verify "$file" --main="$1" --temporal="$2" --backend=tlc </dev/null 2>&1 | grep -E "^\[(ok|violation)\]" | sed 's/ (.*//'; }
    for p in $(head_of temporal); do
      r=$(tl fixed "$p"); echo "  ⏳ tlc fixed · $p: ${r:-?}"; echo "$r" | grep -q "^\[ok\]" || bad=1
    done
    for m in $(head_of "temporal mutants"); do
      name=${m%%→*}; p=${m#*→}; r=$(tl "mut_$name" "$p")
      if echo "$r" | grep -q violation; then echo "  🧬 mut_$name ломает $p ✅"; else fail "mut_$name не ломает $p (tlc)"; fi
    done
  fi
done
[ $bad -ne 0 ] && echo "⚠ есть расхождения — см. строки ⚠ / ← ждали" || echo "✅ все модели по правилам PRACTICES.md"
exit $bad
