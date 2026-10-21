# Repository Guide

## Start here
- Read `README.md` for setup and `docs/architecture.md` for service boundaries.
- The JavaScript frontend lives in `apps/web`; the Go API lives in `apps/api`.
- Keep changes focused in the owning app. The frontend calls API routes through Vite's `/api` proxy.

## Working agreements
- Prefer existing platform and library features before adding dependencies.
- Keep API responses JSON and document new routes in `docs/architecture.md`.
- Keep secrets and local environment files out of version control.
- Make changes easy to review: use clear names, small modules, and update docs when behavior or setup changes.
- Run `npm run check` after implementation when practical; format Go files with `gofmt`.

