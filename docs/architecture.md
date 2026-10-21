# Architecture

## Services

- `apps/web` is a React single-page application bundled and served in development by Vite.
  - Implements the "Puzzle Rush" competitive programming engine:
    - **Game Modes**: 3-Minute Rush, 5-Minute Rush, Survival Mode (3 strikes).
    - **Sequential Problem Bank** (`apps/web/src/problems`): 30+ curated algorithmic puzzles ordered by ascending rating (400 to 2000+) starting with FooBar / basic math.
    - **Client-side Execution Engine** (`apps/web/src/engine/executor.js`): Isolated execution with Web Worker fallback, runtime timeouts (protecting against infinite loops), and deep equality testing.
    - **Multi-language Preprocessor** (`apps/web/src/engine/transpiler.js`): Zero-latency execution for JavaScript and TypeScript.
    - **Audio Synthesizer** (`apps/web/src/audio/soundEffects.js`): Procedural Web Audio API sound synthesis with pitch-scaling combo streaks and strike buzzers.
    - **AI Agent Compatibility Bridge**: Exposes `window.__CODE_RUSH_AGENT__` for automated agents and testing workflows (`getGameState`, `submitCode`, `startGame`, `skipProblem`, `solveWithReference`).
- `apps/api` is a Go HTTP service. It owns server-side behavior and exposes JSON under `/api`. (Reserved for future cloud sync, leaderboards, and server-side verification).
- In development, Vite proxies `/api` to the Go service, keeping browser requests same-origin.

## API conventions

- Use `/api` as the prefix for application endpoints.
- Return JSON for successful API responses and use standard HTTP status codes.
- Add route behavior in `apps/api/internal/httpapi` and update this document when adding endpoints.

