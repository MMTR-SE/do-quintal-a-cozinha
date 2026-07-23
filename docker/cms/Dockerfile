FROM node:22-alpine

WORKDIR /app

COPY cms/package*.json ./
RUN npm install --omit=dev

COPY cms/ ./

EXPOSE 1337

CMD ["npm", "run", "start"]
