FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat dumb-init gcompat

WORKDIR /app

COPY package.json package-lock.json* ./

# Install all dependencies (prisma is now in dependencies, not devDependencies)
RUN npm ci --omit=dev

FROM base AS builder
WORKDIR /app

# NEXT_PUBLIC_* values are compiled into the Next.js build. Declaring the
# argument here also lets next.config.ts allow images served by Strapi.
ARG NEXT_PUBLIC_STRAPI_URL=https://conteudos.mulheresrurais.com.br
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL

COPY --from=deps /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Deploy migration and build app
RUN npx prisma migrate deploy
RUN npm run build

FROM base AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /usr/bin/dumb-init /usr/bin/dumb-init

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]
