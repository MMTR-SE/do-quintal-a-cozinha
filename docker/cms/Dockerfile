FROM node:22-bookworm-slim AS build

WORKDIR /app

COPY cms/package*.json ./
RUN --mount=type=cache,target=/root/.npm npm ci

COPY cms/ ./
RUN npm run build
RUN npm prune --omit=dev

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app ./

EXPOSE 1337

CMD ["npm", "run", "start"]
