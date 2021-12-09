# Install dependencies
FROM node:15-alpine AS deps
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build project
FROM node:15-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Run project
FROM node:15-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.env ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/dist ./dist

EXPOSE 3000
ENV NODE_ENV production
ENV NODE_PATH dist/

CMD ["node", "./dist/index.js"]