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
npm run db:migrate-producao    # Importa conteudo do Strapi de producao p/ o Postgres (ver abaixo)
npm run db:importar-sqlite     # Importa o banco SQLite de producao p/ o Postgres (SQLITE_SRC=arquivo.db)
npm run db:importar-cms        # Importa o conteudo do site p/ o CMS (preenche site_id e sobe imagens)
npm run verify:dados           # Confere no navegador se o site carrega os dados do Postgres

# Storybook
npm run storybook              # Component docs (port 6006)

# Docker (development)
docker compose -f docker/desenvolvimento/docker-compose.yml up -d  # Port 3001 (app) + 5432 (PostgreSQL) + 1337 (CMS) + 3002/3003 (Typebot) + 8025 (Mailpit)
```

Services in `docker/desenvolvimento/docker-compose.yml`: `dev-quintal` (app, port 3001), `postgres` (port 5432), `cms` (Strapi, port 1337, DB `quintal_cms`), `typebot-builder` (port 3002), `typebot-viewer` (port 3003), `typebot-redis`, `mailpit` (SMTP dev para os magic links do Typebot, UI em http://localhost:8025).

## Architecture

Next.js App Router + TypeScript + PostgreSQL/Prisma + Tailwind CSS + React Query + shadcn/ui

### Data Flow Pattern

All data fetching follows this chain — use the same pattern for new features:

```
Page ("use client") → React Query hook (src/hooks/) → Server Action (src/app/actions/) → Prisma → PostgreSQL
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

### Product Slugs Are Derived, Not Stored

Products route via `/nossa-producao/[slug]`, where the slug is `produtora + nome` (e.g. `dona-fatima-mel-de-engenho`), built by `buildProductSlug` in `src/lib/slug.ts`. Unlike stories, the slug is **not persisted**: it is derived from the same fields in `get-all-products.ts`, `get-product-by-id.ts` and `get-product-by-slug.ts`, so listing and detail always agree. Legacy `/nossa-producao/strapi-<documentId>` URLs keep working because the content migration imports CMS items with id `strapi-<documentId>`.

### Site reads only Postgres (CMS writes into it)

Server actions and API routes never call the Strapi CMS at runtime — all content comes from Postgres via Prisma (`src/lib/strapi.ts` and `src/lib/strapi-content.ts` were removed). The CMS is an **editing front-end that feeds the site's Postgres**:

```
Typebot → API do site (/api/product, /api/recipe) ─┬→ Postgres (quintal) → SITE
                                                   └→ CMS (painel, via site_id)
CMS (Strapi) → lifecycle hook → POST /api/cms-sync → Postgres (quintal) → SITE
```

- `src/lib/cms-sync.ts` + `POST /api/cms-sync` (protegida pelo `API_KEY` do middleware): puxa o conteúdo do Strapi e faz upsert no Postgres.
- `cms/src/utils/cms-sync.ts` + `lifecycles.ts` de cada content type: ao criar/atualizar/publicar/remover no CMS, avisa o site (com ~2,5s de atraso, para o item já estar visível na API REST). Requer `SITE_SYNC_URL` no ambiente do CMS.
- `src/lib/site-to-cms.ts`: o inverso — ao cadastrar/atualizar produto ou receita **pela API** (fluxo do Typebot), o item também é criado/atualizado no CMS (`after()` do Next, sem atrasar a resposta), então o painel mostra tudo. Não há loop: a sincronização do CMS escreve direto no Prisma, sem passar pela API.
- O campo **`site_id`** (produtos/histórias/receitas/produtoras) liga o item do CMS ao registro do Postgres: a sincronização atualiza **no lugar** (sem duplicar). Item criado no CMS sem `site_id` entra com id `strapi-<documentId>`.
- Importação inicial do conteúdo que já existia no site: `npm run db:importar-cms` (`prisma/scripts/importar-site-para-cms.mjs`) — cria/atualiza no CMS, preenche `site_id` e sobe as imagens.
- Importadores avulsos: `npm run db:importar-sqlite` (`SQLITE_SRC=/caminho/prod.db`, banco da aplicação em produção) e `npm run db:migrate-producao` (`STRAPI_SRC_URL`/`STRAPI_SRC_TOKEN`, conteúdo do CMS).

Depois de importar, `npm run verify:dados` abre o site no navegador (Playwright) e confere que as listagens e um detalhe carregam do Postgres. Para carregar a pré-produção com os dados de produção (sem seed), limpe antes com `npx prisma migrate reset --force --skip-seed`. As imagens continuam apontando para os domínios liberados em `next.config.ts`.

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
| `/nossa-producao/[slug]/` | Product detail (slug = produtora + produto) |
| `/nossas-receitas/` | Recipe library |
| `/nossas-receitas/[id]/` | Recipe detail |
| `/nosso-espaco/` | Physical space |
| `/onde-estamos/` | Location / territory map |

## Environment Variables

See `.env.example`. Required:

```bash
DATABASE_URL=postgresql://quintal:quintal@localhost:5432/quintal?schema=public   # PostgreSQL (dev: docker/desenvolvimento postgres service)
GROQ_API_KEY=gsk_...                # Groq Whisper audio transcription
API_KEY=...                         # API authentication (checked by middleware)
```

PostgreSQL runs via the `postgres` service in `docker/desenvolvimento/docker-compose.yml`
(exposed on host port 5432). Set `POSTGRES_USER`/`POSTGRES_PASSWORD`/`POSTGRES_DB` in `.env`
(compose defaults: `quintal`/`quintal`/`quintal`).

## Remote Image Domains

New image sources require whitelisting in `next.config.ts`. Current allowed domains:
`typebot.luisotee.com`, `storage.luisotee.com`, `md.coolab.org`, `typebot.mulheresrurais.com.br`, `storage.mulheresrurais.com.br`
