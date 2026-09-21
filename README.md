# CreditFlow

CreditFlow is a credit-management system built as a full-stack TypeScript monorepo.

## Tech stack

- TypeScript
- React and Vite
- Express
- PostgreSQL
- pnpm workspaces
- Docker Compose
- Vitest and Supertest
- Oxlint and Oxfmt

## Project structure

```text
creditflow/
├── apps/
│ ├── api/               # Express API
│ │ ├── src/
│ │ │ ├── modules/       # Feature modules
│ │ │ ├── middleware/    # Shared HTTP middleware
│ │ │ └── app.ts         # Express app factory
│ │ └── test/            # API integration tests
│ └── web/               # React web application
├── .env.example         # Environment-variable template
├── compose.yaml         # Local PostgreSQL container
├── package.json         # Root workspace scripts
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── tsconfig.base.json   # Shared TypeScript configuration
```

## Prerequisites

- Node.js 24 or newer
- pnpm 12 or newer
- Docker Desktop (required only when running PostgreSQL locally)

## Getting started

Clone the repository and install dependencies:

```bash
git clone https://github.com/muhroyhan/creditflow.git
cd creditflow
pnpm install
```

Create the local environment file:

```bash
cp .env.example .env
```

The default local configuration is:

```env
API_PORT=3000
WEB_URL=http://localhost:3001
DATABASE_USER=creditflow
DATABASE_PASS=creditflow
DATABASE_HOST=localhost:5432
DATABASE_NAME=creditflow
VITE_API_URL=http://localhost:3000
VITE_WEB_PORT=3001
```

Start PostgreSQL:

```bash
pnpm db:up
```

Start the API in one terminal:

```bash
pnpm api:dev
```

Start the web application in another terminal:

```bash
pnpm web:dev
```

Open the web application at [http://localhost:3001](http://localhost:3001).

## Health endpoints

| Endpoint            | Purpose                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------- |
| `GET /health/live`  | Confirms that the API process is running. This endpoint does not check the database.        |
| `GET /health/ready` | Confirms that the API can reach PostgreSQL. Returns `503` when the database is unavailable. |

Examples:

```text
http://localhost:3000/health/live
http://localhost:3000/health/ready
```

## Testing

The API integration test suite uses Vitest and Supertest. It builds the Express application through `createApp()` and injects a fake database client, so Docker and PostgreSQL are **not** required to run the tests.

Run all API tests:

```bash
pnpm --filter @creditflow/api exec vitest run
```

Run tests in watch mode while developing:

```bash
pnpm --filter @creditflow/api exec vitest
```

Current test coverage includes:

- `GET /health/live` returns `200` without querying the database.
- `GET /health/ready` returns `200` when the database check succeeds.
- `GET /health/ready` returns `503` with `DATABASE_UNAVAILABLE` when the database check fails.
- An unknown endpoint returns `404`.

## Available scripts

| Command                                         | Description                                  |
| ----------------------------------------------- | -------------------------------------------- |
| `pnpm api:dev`                                  | Run the API in development mode.             |
| `pnpm api:build`                                | Build the API.                               |
| `pnpm api:start`                                | Run the built API.                           |
| `pnpm web:dev`                                  | Run the web application in development mode. |
| `pnpm web:build`                                | Build the web application.                   |
| `pnpm web:start`                                | Preview the built web application.           |
| `pnpm db:up`                                    | Start the local PostgreSQL container.        |
| `pnpm fmt`                                      | Format the codebase.                         |
| `pnpm fmt:check`                                | Check code formatting.                       |
| `pnpm lint`                                     | Run the linter.                              |
| `pnpm --filter @creditflow/api exec vitest run` | Run API integration tests.                   |

## License

This project is for portfolio and educational purposes.
