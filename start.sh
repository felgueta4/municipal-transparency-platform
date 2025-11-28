#!/bin/sh

echo "🚀 Starting deployment process..."

# Run Prisma migrations from the database package directory
echo "📦 Running Prisma migrations..."
cd /app/packages/database
if npx prisma migrate deploy; then
    echo "✅ Migrations applied successfully"
else
    echo "❌ Error applying migrations"
    exit 1
fi

# Run database seed to ensure superadmin user and demo data exist
echo "🌱 Running database seed..."
if npm run seed; then
    echo "✅ Database seeded successfully (superadmin and demo data created)"
else
    echo "⚠️  Warning: Seed encountered errors (data may already exist)"
    echo "   Continuing with application startup..."
fi

# Start the application from the API directory
echo "🎯 Starting the application..."
cd /app/apps/api
exec node dist/main.js
