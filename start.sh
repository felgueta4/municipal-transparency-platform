#!/bin/bash
set -e

echo "🚀 Starting deployment process..."

# Change to the database package directory
cd /app/packages/database

echo "📦 Running Prisma migrations..."
if npx prisma migrate deploy; then
    echo "✅ Migrations applied successfully"
else
    echo "❌ Error applying migrations"
    exit 1
fi

# Return to the API directory
cd /app/apps/api

echo "🎯 Starting the application..."
exec node dist/main.js
