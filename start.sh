#!/bin/sh
set -e

echo "🚀 Starting deployment process..."

# Navigate to database directory and run migrations
echo "📦 Running Prisma migrations from: $(pwd)"
cd /app/packages/database

echo "📋 DATABASE_URL: ${DATABASE_URL:0:50}..."  # Print first 50 chars only for security

# Deploy migrations
echo "▶️  Executing: npx prisma migrate deploy"
npx prisma migrate deploy

echo "✅ Migrations completed successfully"

# Navigate back to app root and start the application
echo "🎯 Starting the application from /app/apps/api..."
cd /app/apps/api

echo "▶️  Executing: node dist/main.js"
exec node dist/main.js
