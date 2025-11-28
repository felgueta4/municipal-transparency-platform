#!/bin/bash
set -e

echo "🔧 Running Prisma migrations on Railway database..."
cd packages/database
npx prisma migrate deploy

echo "✅ Database schema created successfully!"
echo "📊 Checking database status..."
npx prisma migrate status
