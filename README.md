# Slate & Thread

Коммерческий сайт независимой digital-студии на React 19, TypeScript, Vite, Tailwind CSS 4, React Router и Framer Motion.

## Запуск

```bash
npm install
npm run dev
```

## Docker

Сборка production-образа из корня проекта:

```powershell
docker build `
  --build-arg SITE_SUPABASE_URL="https://your-project.supabase.co" `
  --build-arg SITE_SUPABASE_PUBLISHABLE="your-publishable-key" `
  --build-arg SITE_CANONICAL_URL="https://your-domain.com" `
  -t slate-and-thread .
docker run --rm -p 8080:80 slate-and-thread
```

Откройте `http://localhost:8080`. Nginx настроен на SPA-маршруты, поэтому прямые переходы на страницы вроде `/services` и `/work` работают внутри контейнера.

Локальная конфигурация хранится в `.env.local` и не коммитится:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SITE_URL=https://your-domain.com
```

Клиент использует только publishable key. Секретный ключ Supabase не нужен в браузере и не должен попадать в исходники сайта.

## Supabase

Выполните `supabase/schema.sql` в SQL Editor проекта. Скрипт создаёт:

- `project_inquiries` — приём брифов и обращений. Публичная роль может только отправлять новую заявку; читать заявки она не может.
- `work_projects` — каталог работ. Публичная роль читает только записи с `published = true`; добавлять и менять проекты можно из авторизованной панели Supabase.

Для каталога добавляйте только реальные опубликованные проекты. Поле `body` — JSON-объект с необязательными строками `objective`, `concept`, `solution`. Обложки можно загрузить в публичный bucket Supabase Storage и записать URL в `cover_image_url` и `hero_image_url`. SQL-схема не добавляет тестовые строки.

## Страницы

- `/` — главная.
- `/services` и `/services/:slug` — направления и описание услуги.
- `/work` и `/work/:slug` — каталог и кейс из опубликованных строк Supabase.
- `/about`, `/process`, `/pricing` — студия, этапы и состав стоимости.
- `/start-project` — пятиэтапный бриф с локальным черновиком и отправкой в Supabase.
- `/contact` — форма обращения.
- `/privacy` — политика обработки обращений.

Сайт не содержит придуманных отзывов, клиентов, результатов, портфолио или контактных данных. Если проекты ещё не добавлены в Supabase, архив честно показывает пустое состояние. Стоимость оценивается индивидуально после определения состава работ.

## Структура

- `src/data/site.ts` — тексты услуг, этапы, FAQ и варианты ответов брифа.
- `src/components/` — общая шапка, футер и повторно используемые UI-компоненты.
- `src/pages.tsx` — страницы сайта и сценарии форм.
- `src/lib/` — клиент Supabase, чтение портфолио и отправка заявок.
- `supabase/schema.sql` — таблицы, ограничения и RLS-политики.
- `public/` — favicon, robots и sitemap.
- `public/images/IMAGE_SOURCES.md` — источники локальных редакционных изображений.

Sitemap и `robots.txt` создаются при production-сборке, когда задан настоящий `VITE_SITE_URL`. До выбора домена фиктивный адрес не используется.

## Проверка

```bash
npm run build
```

## GitHub Actions и GHCR

Workflow `.github/workflows/build.yml` запускает `npm ci` и production-сборку на push в `main` и на Pull Request. Публикация контейнера в GitHub Container Registry выполняется только после успешной сборки при push в `main`; образ получает теги `latest` и полный SHA коммита.

Для подключённого Supabase добавьте в Settings → Secrets and variables → Actions → Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SITE_URL` — реальный домен сайта, когда он появится; без него sitemap и robots.txt не генерируются.

Publishable key и URL используются клиентом сайта и не являются секретами. Секретный Supabase key в workflow не требуется. В репозитории нет отдельного набора unit-тестов, поэтому CI проверяет TypeScript и production-сборку.
