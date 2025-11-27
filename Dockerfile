# Multi-stage Dockerfile for NestJS API in NPM Workspaces Monorepo
# This should be placed at the ROOT of the repository

# Stage 1: Dependencies and Build
FROM node:18-alpine AS builder

# Install build essentials for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./
COPY packages/config/package*.json ./packages/config/
COPY packages/database/package*.json ./packages/database/
COPY apps/api/package*.json ./apps/api/

# Install all dependencies (respects workspace structure)
RUN npm ci

# Copy source code
COPY packages ./packages
COPY apps/api ./apps/api
COPY tsconfig.json ./

# Generate Prisma Client
WORKDIR /app/packages/database
RUN npx prisma generate

# Build the NestJS API
WORKDIR /app/apps/api
RUN npm run build

# Stage 2: Production Runtime
FROM node:18-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY packages/config/package*.json ./packages/config/
COPY packages/database/package*.json ./packages/database/
COPY apps/api/package*.json ./apps/api/

# Install production dependencies only
RUN npm ci --only=production

# Copy necessary source files for workspace packages
COPY packages/config/src ./packages/config/src
COPY packages/database/src ./packages/database/src
COPY packages/database/prisma ./packages/database/prisma

# Generate Prisma Client in production
WORKDIR /app/packages/database
RUN npx prisma generate

# Copy built API from builder
WORKDIR /app/apps/api
COPY --from=builder /app/apps/api/dist ./dist

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

USER nestjs

# Expose application port
EXPOSE 3000

# Environment
ENV NODE_ENV=production \
    PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/main.js"]
