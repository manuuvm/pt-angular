# Builder
FROM node:10-alpine AS builder
COPY / ./app
WORKDIR /app

RUN npm install && npm run build

# Build
FROM node:10-alpine
COPY --from=builder /app/dist ./app/dist

WORKDIR /app
COPY server/index.js ./
COPY server/package.json ./

# Dependencies
ENV NODE_ENV=production PUBLIC_PATH="./dist"
RUN npm install

# Port exposing
EXPOSE 4200

CMD ["npm", "start"]
