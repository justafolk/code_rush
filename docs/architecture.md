# Architecture

## Services

- `apps/web` is a React single-page application bundled and served in development by Vite.
- `apps/api` is a Go HTTP service. It owns server-side behavior and exposes JSON under `/api`.
- In development, Vite proxies `/api` to the Go service, keeping browser requests same-origin.

## API conventions

- Use `/api` as the prefix for application endpoints.
- Return JSON for successful API responses and use standard HTTP status codes.
- Add route behavior in `apps/api/internal/httpapi` and update this document when adding endpoints.

