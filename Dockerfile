# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all application files
COPY . .

# Build application for production
RUN npm run build

# Stage 2: Production Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Copy built application with source trees for router entry resolution
COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]
