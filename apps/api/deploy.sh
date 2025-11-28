#!/bin/bash
set -e

echo "🔧 Running database migrations..."
cd ../../packages/database
npx prisma migrate deploy

echo "✅ Migrations complete!"
echo "🚀 Starting application..."
cd ../../apps/api
NODE_ENV=production node dist/main
