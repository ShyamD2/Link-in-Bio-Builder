# Bioline — Link in Bio Builder

A full-stack link-in-bio page builder: build a shareable profile page with a custom bio, links, and theme, and share it at a single clean URL. Built with **React + TypeScript** on the frontend and **Node.js + Express + TypeScript** on the backend.

## Features

- **Live drag-free editor** — edit your display name, bio, avatar, and links with instant autosave (debounced, no save button to hunt for)
- **Real-time phone preview** — a docked device mockup that updates as you type
- **Unlimited links** — add, edit, reorder (▲/▼), toggle active/inactive, or delete any link
- **Click tracking** — every public link click increments a per-link counter, shown live in the editor
- **Theme customization** — 5 built-in presets plus custom background (solid or gradient), button color, text color, and button shape (pill / rounded / square / outline)
- **Social icon row** — Instagram, YouTube, TikTok, X, LinkedIn, website, and email, shown at the top of your public page
- **Shareable public page** at `/u/:username`, fully responsive and styled entirely from your theme settings
- **One-click copy** of your public page link from the dashboard

## Tech stack

| Layer     | Choice |
|-----------|--------|
| Frontend  | React 18, TypeScript, Vite, Tailwind CSS, React Router |
| Backend   | Node.js, Express, TypeScript |
| Storage   | A local JSON file (`server/data/db.json`) — no database server to install |
| Dev orchestration | `concurrently` (root-level, optional) |

No authentication, no external database, and no unnecessary dependencies — this is a single-user local builder for one bio page. (See **Future improvements** for multi-user notes.)

## Project structure

```text
link-in-bio/
├── client/                      # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileEditor.tsx
│   │   │   ├── ThemePicker.tsx
│   │   │   ├── LinkList.tsx
│   │   │   ├── LinkEditorItem.tsx
│   │   │   ├── PhonePreview.tsx
│   │   │   └── PublicProfile.tsx   # shared render used by preview + public page
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx       # the builder, at "/"
│   │   │   └── PublicPage.tsx      # the public bio page, at "/u/:username"
│   │   ├── api/client.ts           # typed fetch wrapper around the API
│   │   ├── types.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html, vite.config.ts, tailwind.config.js, tsconfig*.json, package.json
│
├── server/                      # Node.js + Express + TypeScript backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── profile.ts        # GET/PUT /api/profile
│   │   │   ├── links.ts          # CRUD + reorder + click tracking
│   │   │   └── public.ts         # GET /api/public/:username
│   │   ├── db.ts                 # JSON-file read/write layer
│   │   ├── types.ts
│   │   └── index.ts              # Express app entry point
│   ├── data/                     # created on first run — holds db.json
│   ├── tsconfig.json, package.json
│
├── package.json                  # root scripts to run both apps together
└── README.md
```

## Installation

```bash
npm install            # installs the root dev tool (concurrently)
npm run install:all    # installs both client/ and server/ dependencies
```

## Run locally (development)

```bash
npm run dev
```

This starts the API on `http://localhost:4000` and the Vite dev server on `http://localhost:5173` at the same time. The client dev server proxies `/api/*` requests to the backend, so just open:

```
http://localhost:5173
```

- The builder/dashboard lives at `/`
- Your public bio page lives at `/u/<your-username>` (default seed username: `jordan`)

## Run in production (single process)

```bash
npm run build   # builds both the server (dist/) and the client (dist/)
npm run start   # starts the Express server, which now also serves the built client
```

Then open `http://localhost:4000` — one Node process serves the API and the app.

## How data is stored

The server persists everything to `server/data/db.json`, created automatically (with sample seed data) the first time the server runs. There's no database engine to install or configure — delete `server/data/db.json` at any time to reset to the seed profile and links.

## API reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/profile` | Get the profile |
| PUT | `/api/profile` | Update profile fields (partial) |
| GET | `/api/links` | List all links, sorted by order |
| POST | `/api/links` | Create a new link |
| PUT | `/api/links/:id` | Update a link (partial) |
| DELETE | `/api/links/:id` | Delete a link |
| PUT | `/api/links/reorder` | Reorder links — body: `{ orderedIds: string[] }` |
| POST | `/api/links/:id/click` | Increment a link's click count |
| GET | `/api/public/:username` | Public profile + active links only |

## Screenshots

> _Add screenshots of the dashboard, phone preview, and public page here._

| Dashboard | Public page (Dusk theme) | Public page (Paper theme) |
|---|---|---|
| _placeholder_ | _placeholder_ | _placeholder_ |

## Future improvements

- Multi-user accounts with authentication, so each user gets their own `/u/:username`
- Swap the JSON-file store for a real database (Postgres/SQLite) once multi-user support is added
- Drag-and-drop reordering (currently up/down buttons, to avoid an extra dependency)
- Custom domains and QR-code export for the public page
- Per-link scheduling (auto-activate/deactivate links on a date range)
- Analytics over time (clicks per day/week), not just totals
- Image upload for avatars instead of URL-only

## License

MIT — do whatever you'd like with this project.
