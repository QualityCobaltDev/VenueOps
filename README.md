# Venue Ops MVP

Venue Ops is a lean SaaS MVP for hospitality operators to run daily operations with consistency.

## Stack
- Next.js App Router + TypeScript
- Prisma + PostgreSQL
- Server Actions for writes
- Cookie session auth
- Zod validation

## Required environment variables

Create `.env`:

```bash
DATABASE_URL="postgresql://user:password@host:5432/venueops"
AUTH_SECRET="replace-with-random-long-secret"
```

## Setup

```bash
npm install
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

Demo user seeded:
- email: `demo@venueops.app`
- password: `DemoPass123!`

## Routes

Public:
- `/`
- `/signin`
- `/signup`

Protected:
- `/app`
- `/app/checklists`
- `/app/checklists/[id]`
- `/app/incidents`
- `/app/incidents/new`
- `/app/incidents/[id]`
- `/app/logs`
- `/app/logs/new`
- `/app/logs/[id]`
- `/app/templates`
- `/app/settings`

## Deferred intentionally
- Billing/Stripe integration
- Team member roles and invitations
- File upload management UI for templates
