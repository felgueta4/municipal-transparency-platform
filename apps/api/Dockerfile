# Multi-stage Dockerfile for NestJS API in a monorepo

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy workspace packages
COPY packages ./packages

# Copy api app
COPY apps/api ./apps/api

# Install all dependencies (including workspace dependencies)
RUN npm ci

# Generate Prisma Client
RUN cd packages/database && npx prisma generate

# Build the API
RUN cd apps/api && npm run build

# Stage 2: Production stage
FROM node:18-alpine AS runner

# Install required system dependencies for Prisma
RUN apk add --no-cache openssl1.1-compat

# Set working directory
WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy workspace packages (source and package.json files needed for resolution)
COPY packages/config/package*.json ./packages/config/
COPY packages/config/src ./packages/config/src

COPY packages/database/package*.json ./packages/database/
COPY packages/database/src ./packages/database/src
COPY packages/database/prisma ./packages/database/prisma

# Copy api package.json
COPY apps/api/package*.json ./apps/api/

# Install only production dependencies
RUN npm ci --only=production --workspace=@municipal-platform/api

# Generate Prisma Client in production
RUN cd packages/database && npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Set working directory to api
WORKDIR /app/apps/api

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start the application
CMD ["node", "dist/main.js"]
