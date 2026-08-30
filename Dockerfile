# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all application files
COPY . .

# Build application for production (generates standalone .output)
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy standalone production build
COPY --from=builder /app/.output ./.output

EXPOSE 3000

# Start standalone Node.js server directly
CMD ["node", ".output/server/index.mjs"]
