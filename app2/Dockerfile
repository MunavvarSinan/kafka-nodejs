FROM node:18-alpine AS builder

WORKDIR /app2

COPY package*.json ./

COPY . .
RUN npm install -g pnpm && pnpm install

FROM node:18-alpine AS runner

WORKDIR /app2

COPY --from=builder /app2/node_modules ./node_modules
COPY --from=builder /app2/package.json ./

EXPOSE 8080
RUN npm install nodemon -g
CMD ["nodemon", "index.js"]
