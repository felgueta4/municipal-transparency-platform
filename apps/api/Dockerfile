# ==================================
# Multi-stage Dockerfile for NestJS API
# ==================================

# Stage 1: Base dependencies
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies needed for native modules
RUN apk add --no-cache libc6-compat openssl

# Copy root package files
COPY package*.json ./
COPY turbo.json ./

# Stage 2: Install all dependencies
FROM base AS deps
WORKDIR /app

# Copy workspace configuration
COPY package*.json ./
COPY packages/config/package.json ./packages/config/
COPY packages/database/package.json ./packages/database/
COPY apps/api/package.json ./apps/api/

# Install all dependencies including devDependencies for build
RUN npm ci

# Stage 3: Build application
FROM base AS builder
WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY packages/config ./packages/config
COPY packages/database ./packages/database
COPY apps/api ./apps/api
COPY package*.json ./
COPY tsconfig.json ./

# Generate Prisma client
RUN npx prisma generate --schema=./packages/database/prisma/schema.prisma

# Build the API
RUN npm run build --workspace=apps/api

# Stage 4: Production runtime
FROM node:18-alpine AS runner
WORKDIR /app

# Install production dependencies only
RUN apk add --no-cache libc6-compat openssl curl

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nestjs

# Copy workspace configuration
COPY package*.json ./
COPY packages/config/package.json ./packages/config/
COPY packages/database/package.json ./packages/database/
COPY apps/api/package.json ./apps/api/

# Install production dependencies only
RUN npm ci --omit=dev && npm cache clean --force

# Copy built application from builder
COPY --from=builder --chown=nestjs:nodejs /app/apps/api/dist ./apps/api/dist
COPY --from=builder --chown=nestjs:nodejs /app/packages/config ./packages/config
COPY --from=builder --chown=nestjs:nodejs /app/packages/database ./packages/database

# Copy Prisma files for migrations
COPY --from=builder --chown=nestjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder --chown=nestjs:nodejs /app/node_modules/@prisma ./node_modules/@prisma

# Switch to non-root user
USER nestjs

# Expose API port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["node", "apps/api/dist/main.js"]
