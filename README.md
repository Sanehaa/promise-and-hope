# Promise and Hope

A modern, faith-inspired charity website built with Next.js, Prisma, SQLite/PostgreSQL, and Stripe.

## Requirements

- Node.js 20.9+
- Stripe account (test mode for development)

## Quick start

```bash
npm install
cp .env.example .env.local   # then add your Stripe keys
npm run db:push
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | **Pooled** Postgres URL for the app (see Vercel section below) |
| `DIRECT_DATABASE_URL` | Direct Postgres URL — migrations/seed only, not used at runtime |
| `NEXT_PUBLIC_SITE_URL` | Public site URL for Stripe redirects |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (optional, for future Elements) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret from Stripe CLI or Dashboard |
| `NEXT_PUBLIC_LOAD_LOCAL_IMAGES` | Set `true` when images exist in `/public/images/` |

## Database

All content lives in the database — nothing is hardcoded in the app.

### Models

- **SiteSetting** — org info, hero copy, donation amounts, CTAs
- **PageHero** — per-page banner images and text
- **NavLink** — main and footer navigation
- **Service, Project, CaseStory, RegionalOffice, GalleryItem**
- **Testimonial, ImpactStat, CoreValue, TimelineEvent, TeamMember**
- **DonationCause, Donation** — causes and payment records
- **ContactMessage, NewsletterSubscriber**

### Commands

```bash
npm run db:push      # Apply schema (dev)
npm run db:seed      # Seed initial content
npm run db:studio    # Browse data in Prisma Studio
npm run db:migrate   # Create migrations (production)
```

### Production database

The schema uses PostgreSQL. Set two connection strings in Vercel:

| Vercel env var | Map from (Vercel Postgres integration) |
|----------------|----------------------------------------|
| `DATABASE_URL` | `POSTGRES_PRISMA_URL` |
| `DIRECT_DATABASE_URL` | `POSTGRES_URL_NON_POOLING` |

**Do not** point `DATABASE_URL` at the migration URL or a direct/non-pooled URL. That causes `too many connections for role "prisma_migration"` on serverless.

After setting env vars, redeploy. Run migrations once locally or in CI:

```bash
DIRECT_DATABASE_URL="..." DATABASE_URL="..." npx prisma db push
DIRECT_DATABASE_URL="..." DATABASE_URL="..." npm run db:seed
```

## Deploying on Vercel

1. **Storage** — Add Vercel Postgres (or Neon/Supabase) to the project.
2. **Environment variables** in Vercel → Settings → Environment Variables:

   | Name | Value |
   |------|--------|
   | `DATABASE_URL` | `POSTGRES_PRISMA_URL` (pooled) |
   | `DIRECT_DATABASE_URL` | `POSTGRES_URL_NON_POOLING` |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` |
   | Stripe keys | as in `.env.example` |

3. **Redeploy** after changing env vars.
4. **Seed** the production DB once (from your machine using `DIRECT_DATABASE_URL`).

If you use **Neon**, set `DATABASE_URL` to the `-pooler` host and append `?pgbouncer=true&connection_limit=1`.

## Stripe donations

1. Add keys to `.env.local`
2. Donate form → `POST /api/donate/create-checkout` → Stripe Checkout
3. Success redirect → `/donate/success?session_id=...`
4. Webhook `POST /api/stripe/webhook` marks donations complete and updates project totals

### Local webhook testing

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`.

Use test card: `4242 4242 4242 4242`.

## Images

Place files under `/public/images/{hero,projects,stories,gallery,team,offices}/` and update URLs in the database via **Prisma Studio** (`npm run db:studio`) on `PageHero`, `Project`, `Service`, etc.

Set `NEXT_PUBLIC_LOAD_LOCAL_IMAGES=true` to load real files instead of placeholders.

## Editing content

Use **Prisma Studio** (`npm run db:studio`) or any SQL client. No code changes needed for:

- Projects, stories, services, offices, gallery
- Navigation links
- Site settings and page heroes
- Donation causes and suggested amounts
- Team, timeline, values, testimonials, impact stats

## Project structure

```
prisma/
  schema.prisma    # Database schema
  seed.ts          # Initial data (run once)
src/
  app/             # Pages and API routes
  components/      # UI components
  lib/
    prisma.ts      # DB client
    queries/       # Data access layer
    stripe.ts      # Stripe client
  types/           # Shared TypeScript types
```

## Tech stack

- Next.js 16 (App Router)
- Prisma 5 + SQLite (dev) / PostgreSQL (prod)
- Stripe Checkout
- TypeScript, Tailwind CSS v4, Framer Motion
- React Hook Form + Zod
