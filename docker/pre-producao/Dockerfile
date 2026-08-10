FROM node:22-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat dumb-init gcompat

WORKDIR /app

COPY package.json package-lock.json* ./

# Install production dependencies (prisma is now in dependencies for Prisma Client availability)
RUN npm ci  --omit=dev


FROM base AS builder
WORKDIR /app
ARG NEXT_PUBLIC_STRAPI_URL=https://conteudos.mulheresrurais.com.br
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
COPY --from=deps /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=deps /app/node_modules ./node_modules
COPY . .

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
