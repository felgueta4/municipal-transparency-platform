#!/bin/sh
set -e

echo "🚀 Starting deployment process..."

# Run Prisma migrations from the database package directory
echo "📦 Running Prisma migrations..."
if cd /app/packages/database && npx prisma migrate deploy; then
    echo "✅ Migrations applied successfully"
else
    echo "❌ Error applying migrations"
    exit 1
fi

# Start the application from the API directory
echo "🎯 Starting the application..."
cd /app/apps/api
exec node dist/main.js
