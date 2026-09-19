# CreditFlow

CreditFlow is a credit management system built as a full-stack TypeScript monorepo.

## Tech Stack

- TypeScript
- React
- Vite
- Express
- PostgreSQL
- pnpm
- Docker Compose
- Oxlint
- Oxfmt

## Project Structure

```text
creditflow/
├── apps/
│   ├── api/              # Express API
│   └── web/              # React web application
├── .env.example          # Environment variable template
├── compose.yaml          # Local PostgreSQL container
├── package.json          # Root scripts and dependencies
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── tsconfig.base.json    # Shared TypeScript configuration
```

## Prerequisites

- Node.js 22+
- pnpm 12+
- Docker Desktop

## Getting Started

Clone the repository:

```bash
git clone https://github.com/muhroyhan/creditflow.git
cd creditflow
```

Install dependencies:

```bash
pnpm install
```

Create the local environment file:

```bash
cp .env.example .env
```

Configure `.env`:

```env
API_PORT=3000
VITE_WEB_PORT=3001
VITE_API_BASE_URL=http://localhost:3000
```

## Run the Application

Start the API:

```bash
pnpm api:dev
```

Start the web application in another terminal:

```bash
pnpm web:dev
```

Open the web application:

```text
http://localhost:3001
```

## Health Endpoints

| Endpoint     | Description                                         |
| ------------ | --------------------------------------------------- |
| `GET /live`  | Checks whether the API process is running.          |
| `GET /ready` | Checks whether the API is ready to accept requests. |

Examples:

```text
http://localhost:3000/live
http://localhost:3000/ready
```

## Database

Start PostgreSQL:

```bash
pnpm db:up
```

Check the database container:

```bash
docker compose ps
```

## Available Scripts

| Command          | Description                                  |
| ---------------- | -------------------------------------------- |
| `pnpm api:dev`   | Run the API in development mode.             |
| `pnpm api:build` | Build the API.                               |
| `pnpm api:start` | Run the built API.                           |
| `pnpm web:dev`   | Run the web application in development mode. |
| `pnpm web:build` | Build the web application.                   |
| `pnpm web:start` | Preview the built web application.           |
| `pnpm db:up`     | Start the PostgreSQL container.              |
| `pnpm fmt`       | Format the codebase.                         |
| `pnpm fmt:check` | Check code formatting.                       |
| `pnpm lint`      | Run the linter.                              |

## License

This project is for portfolio and educational purposes.
