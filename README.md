# jaiora.me

Лендинг сообщества Jaiora — перенесён со страницы `/jaiora` сайта [urvanov.com](https://www.urvanov.com/jaiora/) и выделен в отдельный сайт на своём домене.

## Стек

- **Vite + React 19 + TypeScript** — основа
- **react-router-dom** — только переключение RU (`/`) / EN (`/en`)

## Запуск

```bash
npm install
npm run dev       # dev-server на http://localhost:5173/
npm run build     # → dist/
npm run preview   # локальный preview билда
```

## Контент

Тексты, чаты по городам и хроника — в `src/data/jaiora.ts` и `src/data/links.ts`.
Это тот же контент, что на `urvanov.com/jaiora`; при изменениях синхронизировать обе стороны вручную.

## Деплой

GitHub Pages через `.github/workflows/pages.yml`, домен закреплён в `public/CNAME`.

## Аналитика

Пока не подключена — счётчики для этого домена ещё не заведены.
