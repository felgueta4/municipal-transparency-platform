#!/bin/sh
# Script para ejecutar el seed en Railway después del despliegue
# Uso: railway run sh run-seed-railway.sh

echo "🌱 Ejecutando seed de base de datos en Railway..."
cd /app/packages/database
npm run seed:prod
