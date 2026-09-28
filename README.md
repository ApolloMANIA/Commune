# Commune

Real-time chat app with auth, profiles, and Socket.IO messaging.

## Stack

| Layer | Tech |
| --- | --- |
| Client | React, Vite, Tailwind CSS, Zustand, Socket.IO Client |
| Server | Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Socket.IO |

## Project layout

```
client/   # Vite React frontend (default port 5173)
server/   # Express API + Socket.IO (default port 3000)
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB running locally (or a remote MongoDB URI)

## Setup

```bash
git clone https://github.com/ApolloMANIA/Commune.git
cd Commune
```

Install dependencies in both apps:

```bash
cd server && npm install && cd ..
cd client && npm install && cd ..
```

### Environment

**`server/.env`**

```env
PORT=3000
JWT_KEY=your_jwt_secret
ORIGIN=http://localhost:5173
DATABASE_URL=mongodb://localhost:27017/Commune
```

**`client/.env`**

```env
VITE_SERVER_URL=http://localhost:3000
```

## Run

Start MongoDB, then in two terminals:

```bash
# terminal 1 — API
cd server
npm run dev   # or: npm start

# terminal 2 — UI
cd client
npm run dev
```

- App: [http://localhost:5173](http://localhost:5173)
- API: [http://localhost:3000](http://localhost:3000)

## Features

- Email/password signup and login (JWT + httpOnly cookies)
- Profile setup (avatar upload, display name)
- Contact search and DM-style chat
- Real-time messaging over Socket.IO

## Scripts

| Location | Command | Purpose |
| --- | --- | --- |
| `server/` | `npm start` | Run API |
| `server/` | `npm run dev` | API with nodemon |
| `client/` | `npm run dev` | Vite dev server |
| `client/` | `npm run build` | Production build |
| `client/` | `npm run preview` | Preview production build |

## Notes

- Keep `ORIGIN` in `server/.env` aligned with the Vite URL (usually `http://localhost:5173`) or CORS will block requests.
- `server/node_modules` should be installed on the machine that runs the API — native modules like `bcrypt` break if copied from another OS/arch.
- Google OAuth UI is wired via `@react-oauth/google`; set a real `clientId` in `client/src/main.jsx` if you want that flow.

## Deploy on Render (free)

1. Push this repo to GitHub.
2. In [Render Dashboard](https://dashboard.render.com) → **New** → **Blueprint** → select `Commune`.
3. When prompted, set:
   - `DATABASE_URL` — your Atlas URI (`...mongodb.net/commune?...`)
   - `ORIGIN` — leave a placeholder for now (e.g. `https://commune-web.onrender.com`), then update after the static site URL exists
   - `VITE_SERVER_URL` — `https://commune-api.onrender.com` (use your real API URL; must include `https://`)
4. In Atlas → **Network Access**, allow `0.0.0.0/0`.
5. After both services are live, set `ORIGIN` exactly to the frontend URL and **Manual Deploy** the API once.
6. Optional custom domain: in Render add your Hostinger domain, then in Hostinger DNS add the CNAME Render shows you.

Free web services sleep after ~15 minutes idle (cold start on next visit).
