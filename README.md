# Promise and Hope

A modern, faith-inspired charity website built with Next.js, Prisma, SQLite/PostgreSQL, and Square donations.

## Requirements

- Node.js 20.9+

## Quick start

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | **Pooled** Postgres URL for the app (`POSTGRES_PRISMA_URL` on Vercel) |
| `DIRECT_URL` | Direct Postgres URL for migrations/seed only (`POSTGRES_URL_NON_POOLING`) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL |
| `NEXT_PUBLIC_SQUARE_PAYMENT_LINK` | Square payment link (defaults to Promise and Hope link if unset) |
| `NEXT_PUBLIC_LOAD_LOCAL_IMAGES` | Set `true` when images exist in `/public/images/` |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_RECEIVER_EMAIL` | Inbox for contact form submissions |

## Donations (Square)

Donors complete the form on `/donate`, then are redirected to your [Square payment link](https://square.link/u/YB8kQy0g) to pay securely. Card details are handled entirely by Square — not stored on this site.

Set `NEXT_PUBLIC_SQUARE_PAYMENT_LINK` in Vercel if you change the link in Square.

## Database

All content lives in the database — nothing is hardcoded in the app.

### Commands

```bash
npm run db:push      # Apply schema (dev)
npm run db:seed      # Seed initial content
npm run db:studio    # Browse data in Prisma Studio
npm run db:migrate   # Create migrations (production)
```

### Production database

Set two connection strings in Vercel:

| Vercel env var | Map from (Vercel Postgres integration) |
|----------------|----------------------------------------|
| `DATABASE_URL` | `POSTGRES_PRISMA_URL` |
| `DIRECT_URL` | `POSTGRES_URL_NON_POOLING` |

After setting env vars, redeploy. Seed once:

```bash
DIRECT_URL="..." DATABASE_URL="..." npm run db:seed
```

## Deploying on Vercel

1. Add Vercel Postgres (or Neon/Supabase).
2. Set environment variables (see table above).
3. Redeploy and seed the production DB once.

## Images

Place files under `/public/images/{hero,projects,stories,gallery,team,offices}/` and update URLs via **Prisma Studio** (`npm run db:studio`).

Set `NEXT_PUBLIC_LOAD_LOCAL_IMAGES=true` to load real files instead of placeholders.

## Tech stack

- Next.js 16 (App Router)
- Prisma 5 + SQLite (dev) / PostgreSQL (prod)
- Square payment links
- TypeScript, Tailwind CSS v4, Framer Motion
- React Hook Form + Zod
