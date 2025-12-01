#!/bin/bash

# ═══════════════════════════════════════════════════════════════════
# 🔧 Script de Fix para Ambos Deployments (Vercel + Railway)
# ═══════════════════════════════════════════════════════════════════

set -e

echo "═══════════════════════════════════════════════════════════════════"
echo "  🚀 Iniciando diagnóstico y fix de deployments"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ───────────────────────────────────────────────────────────────────
# PASO 1: Verificar Railway Backend
# ───────────────────────────────────────────────────────────────────

echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${BLUE}PASO 1: Verificando estado del Backend (Railway)${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

BACKEND_URL="https://municipal-transparency-platform-production.up.railway.app/api/health"

echo "🔍 Verificando health check del backend..."
echo "URL: $BACKEND_URL"
echo ""

HEALTH_RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL" || echo "000")

if [ "$HEALTH_RESPONSE" = "200" ]; then
    echo "${GREEN}✓ Backend responde correctamente (HTTP 200)${NC}"
    echo ""
    echo "Respuesta completa:"
    curl -s "$BACKEND_URL" | jq '.' || curl -s "$BACKEND_URL"
    echo ""
    BACKEND_OK=true
else
    echo "${RED}✗ Backend no responde correctamente (HTTP $HEALTH_RESPONSE)${NC}"
    echo "${YELLOW}⚠️  El backend puede estar caído o reiniciándose${NC}"
    BACKEND_OK=false
fi

echo ""

# ───────────────────────────────────────────────────────────────────
# PASO 2: Verificar si las tablas existen
# ───────────────────────────────────────────────────────────────────

echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${BLUE}PASO 2: Verificando login (para detectar error de DB)${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

LOGIN_URL="https://municipal-transparency-platform-production.up.railway.app/api/auth/login"

echo "🔍 Intentando login para verificar tabla users..."
echo ""

LOGIN_RESPONSE=$(curl -s -X POST "$LOGIN_URL" \
  -H "Content-Type: application/json" \
  -d '{"email":"superadmin@transparencia.cl","password":"demo12345"}' \
  || echo '{"error":"curl_failed"}')

if echo "$LOGIN_RESPONSE" | grep -q "table.*does not exist\|Database operation failed"; then
    echo "${RED}✗ ERROR: Las tablas de la base de datos NO EXISTEN${NC}"
    echo ""
    echo "Respuesta del servidor:"
    echo "$LOGIN_RESPONSE" | jq '.' || echo "$LOGIN_RESPONSE"
    echo ""
    DB_OK=false
elif echo "$LOGIN_RESPONSE" | grep -q "access_token"; then
    echo "${GREEN}✓ Login exitoso - Base de datos OK${NC}"
    DB_OK=true
else
    echo "${YELLOW}⚠️  Respuesta inesperada del login${NC}"
    echo ""
    echo "Respuesta completa:"
    echo "$LOGIN_RESPONSE" | jq '.' || echo "$LOGIN_RESPONSE"
    echo ""
    DB_OK=false
fi

echo ""

# ───────────────────────────────────────────────────────────────────
# PASO 3: Verificar Railway CLI
# ───────────────────────────────────────────────────────────────────

echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo "${BLUE}PASO 3: Verificando Railway CLI${NC}"
echo "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if command -v railway &> /dev/null; then
    echo "${GREEN}✓ Railway CLI instalado${NC}"
    RAILWAY_CLI_OK=true
    
    # Verificar si está logueado
    if railway whoami &> /dev/null; then
        echo "${GREEN}✓ Railway CLI autenticado${NC}"
        RAILWAY_AUTH_OK=true
    else
        echo "${YELLOW}⚠️  Railway CLI no está autenticado${NC}"
        RAILWAY_AUTH_OK=false
    fi
else
    echo "${YELLOW}⚠️  Railway CLI no está instalado${NC}"
    RAILWAY_CLI_OK=false
    RAILWAY_AUTH_OK=false
fi

echo ""

# ───────────────────────────────────────────────────────────────────
# RESUMEN Y RECOMENDACIONES
# ───────────────────────────────────────────────────────────────────

echo "═══════════════════════════════════════════════════════════════════"
echo "  📊 RESUMEN DEL DIAGNÓSTICO"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

echo "┌─────────────────────────────────────────────────────────────────┐"
echo "│ Componente              │ Estado                               │"
echo "├─────────────────────────────────────────────────────────────────┤"

if [ "$BACKEND_OK" = true ]; then
    echo "│ Backend Railway         │ ${GREEN}✓ OK${NC}                                 │"
else
    echo "│ Backend Railway         │ ${RED}✗ ERROR${NC}                              │"
fi

if [ "$DB_OK" = true ]; then
    echo "│ Base de Datos           │ ${GREEN}✓ OK${NC}                                 │"
else
    echo "│ Base de Datos           │ ${RED}✗ TABLAS NO EXISTEN${NC}                  │"
fi

if [ "$RAILWAY_CLI_OK" = true ]; then
    echo "│ Railway CLI             │ ${GREEN}✓ INSTALADO${NC}                          │"
else
    echo "│ Railway CLI             │ ${YELLOW}⚠ NO INSTALADO${NC}                      │"
fi

if [ "$RAILWAY_AUTH_OK" = true ]; then
    echo "│ Railway Auth            │ ${GREEN}✓ AUTENTICADO${NC}                        │"
else
    echo "│ Railway Auth            │ ${YELLOW}⚠ NO AUTENTICADO${NC}                    │"
fi

echo "└─────────────────────────────────────────────────────────────────┘"
echo ""

# ───────────────────────────────────────────────────────────────────
# ACCIONES RECOMENDADAS
# ───────────────────────────────────────────────────────────────────

echo "═══════════════════════════════════════════════════════════════════"
echo "  🎯 ACCIONES RECOMENDADAS"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

ACTION_NUMBER=1

# Problema #1: Vercel Root Directory
echo "${YELLOW}[$ACTION_NUMBER] VERCEL: Corregir Root Directory${NC}"
echo "    Estado: ${RED}PENDIENTE (no verificable desde aquí)${NC}"
echo ""
echo "    Pasos:"
echo "    1. Ve a https://vercel.com/dashboard"
echo "    2. Selecciona el proyecto"
echo "    3. Settings → General → Root Directory"
echo "    4. Cambia de 'apps/api' a 'frontend/nextjs_space'"
echo "    5. Guarda y haz Redeploy"
echo ""
echo "    ⏱️  Tiempo: 3 minutos"
echo "    📄 Guía: Ver FIX_VERCEL_PASO_A_PASO.txt"
echo ""

ACTION_NUMBER=$((ACTION_NUMBER + 1))

# Problema #2: Database sin migrar
if [ "$DB_OK" = false ]; then
    echo "${RED}[$ACTION_NUMBER] RAILWAY: Ejecutar Migraciones de Base de Datos${NC}"
    echo "    Estado: ${RED}CRÍTICO - Tablas no existen${NC}"
    echo ""
    
    if [ "$RAILWAY_CLI_OK" = false ]; then
        echo "    ${YELLOW}Primero instala Railway CLI:${NC}"
        echo "    bash <(curl -fsSL cli.new/railway)"
        echo ""
    fi
    
    if [ "$RAILWAY_AUTH_OK" = false ]; then
        echo "    ${YELLOW}Luego autentica:${NC}"
        echo "    railway login"
        echo ""
    fi
    
    echo "    ${GREEN}Ejecuta las migraciones:${NC}"
    echo "    cd /home/ubuntu/municipal_transparency_platform"
    echo "    railway link  # Selecciona tu proyecto"
    echo "    railway run npx prisma migrate deploy"
    echo "    railway run npm run seed:prod"
    echo ""
    echo "    ⏱️  Tiempo: 5 minutos"
    echo "    📄 Documentación: Ver RAILWAY_DATABASE_MIGRATION_FIX.md"
    echo ""
    
    ACTION_NUMBER=$((ACTION_NUMBER + 1))
fi

# ───────────────────────────────────────────────────────────────────
# COMANDOS RÁPIDOS
# ───────────────────────────────────────────────────────────────────

echo "═══════════════════════════════════════════════════════════════════"
echo "  ⚡ COMANDOS RÁPIDOS"
echo "═══════════════════════════════════════════════════════════════════"
echo ""

if [ "$RAILWAY_CLI_OK" = false ]; then
    echo "# Instalar Railway CLI"
    echo "bash <(curl -fsSL cli.new/railway)"
    echo ""
fi

if [ "$RAILWAY_AUTH_OK" = false ]; then
    echo "# Autenticar Railway"
    echo "railway login"
    echo ""
fi

if [ "$DB_OK" = false ]; then
    echo "# Ejecutar migraciones"
    echo "cd /home/ubuntu/municipal_transparency_platform"
    echo "railway link"
    echo "railway run npx prisma migrate deploy"
    echo "railway run npm run seed:prod"
    echo ""
fi

echo "# Verificar health después de los fixes"
echo "curl $BACKEND_URL"
echo ""

echo "# Verificar login después de los fixes"
echo "curl -X POST $LOGIN_URL \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"email\":\"superadmin@transparencia.cl\",\"password\":\"demo12345\"}'"
echo ""

# ───────────────────────────────────────────────────────────────────
# DOCUMENTACIÓN
# ───────────────────────────────────────────────────────────────────

echo "═══════════════════════════════════════════════════════════════════"
echo "  📚 DOCUMENTACIÓN COMPLETA"
echo "═══════════════════════════════════════════════════════════════════"
echo ""
echo "• FIX_VERCEL_PASO_A_PASO.txt"
echo "• VERCEL_ROOT_DIRECTORY_FIX.md"
echo "• RAILWAY_DATABASE_MIGRATION_FIX.md"
echo "• PROBLEMAS_MULTIPLES_DETECTED.md (resumen ejecutivo)"
echo ""

echo "═══════════════════════════════════════════════════════════════════"
echo "  ✅ Diagnóstico completado"
echo "═══════════════════════════════════════════════════════════════════"
