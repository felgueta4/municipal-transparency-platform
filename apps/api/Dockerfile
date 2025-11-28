# Multi-stage Dockerfile for NestJS API in a monorepo

# Stage 1: Build stage
FROM node:18-slim AS builder

# Install OpenSSL and ca-certificates for Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

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

# Clean up any existing Prisma binaries and generated files to force fresh generation
RUN rm -rf packages/database/src/generated/client && \
    rm -rf node_modules/.prisma && \
    find . -name ".prisma" -type d -exec rm -rf {} + 2>/dev/null || true

# Generate Prisma Client with correct Debian binaries
RUN cd packages/database && npx prisma generate

# Build the API
RUN cd apps/api && npm run build

# Stage 2: Production stage
FROM node:18-slim AS runner

# Install OpenSSL and ca-certificates for Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

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

# Clean up any existing Prisma binaries to force fresh generation
RUN rm -rf packages/database/src/generated/client && \
    rm -rf node_modules/.prisma && \
    find . -name ".prisma" -type d -exec rm -rf {} + 2>/dev/null || true

# Generate Prisma Client in production with correct Debian binaries
RUN cd packages/database && npx prisma generate

# Copy built application from builder stage
COPY --from=builder /app/apps/api/dist ./apps/api/dist

# Copy start script from root (contains migration logic)
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Set working directory to api
WORKDIR /app/apps/api

# Expose port
EXPOSE 3000

# Set environment to production
ENV NODE_ENV=production

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use start script to run migrations before starting the application
CMD ["/bin/sh", "/app/start.sh"]
