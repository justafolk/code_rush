# Code Rush

A JavaScript and Go monorepo starter. The React frontend is served by Vite, and the Go API uses only the standard library.

## Requirements

- Node.js 20.19+ or 22.12+
- npm 10+
- Go 1.22+

## Getting started

```sh
npm install
npm run dev
```

The frontend is available at `http://localhost:5173`. Vite forwards `/api/*` requests to the Go server at `http://127.0.0.1:8080`.

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the frontend and API together |
| `npm run dev:web` | Start only the Vite frontend |
| `npm run dev:api` | Start only the Go API |
| `npm run build` | Build the frontend for production |
| `npm run check` | Build the frontend and run `go vet` |

## Repository layout

```text
apps/
  api/                 Go HTTP API
  web/                 React frontend and Vite config
docs/
  architecture.md      Service boundaries and API notes
AGENTS.md              Instructions for coding agents
```

## API

- `GET /api/health` returns the API's health and service name.
- Set `API_ADDR` to change the Go server listen address. It defaults to `127.0.0.1:8080`.

