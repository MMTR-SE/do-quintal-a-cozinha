# CLAUDE.md

## Project Overview

**Do Quintal à Cozinha** — Community platform for rural women producers from MMTR-SE (Movimento da Mulher Trabalhadora Rural de Sergipe). Products, recipes, and stories showcasing rural women entrepreneurs.

- All UI text and content is in **Brazilian Portuguese**
- Use `npm` as package manager (not pnpm/yarn)

## Commands

```bash
npm run dev                    # Dev server
npm run build                  # Production build (runs prisma generate first)
npm run lint                   # ESLint

# Database
npx prisma migrate dev --name descriptive_name  # Create + apply migration
npx prisma generate                             # Regenerate client after schema change
npx prisma studio                               # Database GUI
npm run db:deploy              # Apply migrations + generate (production)
npm run db:seed                # Seed database (prisma/seeds/main.js)
npm run db:backfill-slugs      # Backfill story slugs

# Storybook
npm run storybook              # Component docs (port 6006)

# Docker (development)
docker compose -f docker/desenvolvimento/docker-compose.yml up -d  # Port 3001
```

## Architecture

Next.js App Router + TypeScript + SQLite/Prisma + Tailwind CSS + React Query + shadcn/ui

### Data Flow Pattern

All data fetching follows this chain — use the same pattern for new features:

```
Page ("use client") → React Query hook (src/hooks/) → Server Action (src/app/actions/) → Prisma → SQLite
```

### Key References

- **Database schema**: `prisma/schema.prisma` (Profile, Product, Recipe, Story, Region, Media + junction tables)
- **API documentation**: `public/openapi.json` (served at `/api-docs/` via Scalar)
- **API routes**: `src/app/api/` (product, recipe, profile, whatsapp, email, transcription)
- **Server actions**: `src/app/actions/` (get-all-\*, get-\*-by-id, get-story-by-slug)
- **React Query hooks**: `src/hooks/` (one hook wrapping each server action)
- **UI primitives**: `src/components/ui/` (shadcn/ui — Button, Card, Carousel, Dialog, etc.)
- **Types**: `src/types/` (recipe.ts, story.ts, product.ts)

## Gotchas

### Prisma Decimal Serialization (CRITICAL)

Prisma `Decimal` cannot be passed to client components. Server actions MUST convert to `number` before returning:

```typescript
return products.map(product => ({
  ...product,
  price: product.price ? Number(product.price) : null  // preserve null, don't convert to 0
}));
```

See `src/app/actions/get-all-products.ts` for the full pattern. This applies to all non-plain Prisma types (Decimal, BigInt, etc.).

### Story Routes Use Slugs, Not IDs

Stories route via `/nossas-historias/[slug]`, not `[id]`. The server action is `get-story-by-slug.ts` and the hook is `use-get-story-by-slug.ts`. The `Story` model has a unique `slug` field.

### Middleware API Key Authentication

`src/middleware.ts` requires `API_KEY` header on all `/api/*` routes **except** `/api/email` and `/api/whatsapp` (internal redirects). Returns 401 without valid key.

### OpenAPI Spec Must Stay Updated

When modifying API routes, update `public/openapi.json` to match. This is the source of truth for API documentation.

### Prisma Migration Workflow

1. Edit `prisma/schema.prisma`
2. `npx prisma migrate dev --name descriptive_name`
3. `npx prisma generate`

Never use `npx prisma db push` in development.

## Routes

All routes use trailing slashes (configured in `next.config.ts`).

| Path | Description |
|------|-------------|
| `/` | Home page |
| `/sobre/` | About MMTR-SE |
| `/nossas-historias/` | Stories listing |
| `/nossas-historias/[slug]/` | Story detail (slug-based) |
| `/nossa-producao/` | Product showcase |
| `/nossa-producao/[id]/` | Product detail |
| `/nossas-receitas/` | Recipe library |
| `/nossas-receitas/[id]/` | Recipe detail |
| `/nosso-espaco/` | Physical space |
| `/onde-estamos/` | Location / territory map |

## Environment Variables

See `.env.example`. Required:

```bash
DATABASE_URL=file:./prisma/dev.db   # SQLite database path
GROQ_API_KEY=gsk_...                # Groq Whisper audio transcription
API_KEY=...                         # API authentication (checked by middleware)
```

## Remote Image Domains

New image sources require whitelisting in `next.config.ts`. Current allowed domains:
`typebot.luisotee.com`, `storage.luisotee.com`, `md.coolab.org`, `typebot.mulheresrurais.com.br`, `storage.mulheresrurais.com.br`
