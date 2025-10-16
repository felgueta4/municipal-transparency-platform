# 🐳 Docker Setup Guide - Fase 1A

## ✅ Archivos Creados

### Infraestructura Docker
1. **`apps/api/Dockerfile`** - Multi-stage build optimizado para producción
2. **`docker-compose.yml`** - Orquestación de servicios (PostgreSQL+PostGIS, Redis, API)
3. **`.dockerignore`** - Optimización de contexto de build

### Configuración
4. **`.env.example`** - Template de variables de entorno con documentación completa

### Automatización
5. **`Makefile`** - 20+ comandos útiles para desarrollo
6. **`scripts/init-db.sh`** - Script de inicialización de PostgreSQL+PostGIS

### Documentación
7. **`README.md`** (raíz) - Guía completa de quick start
8. **`apps/api/README.md`** - Documentación técnica del backend
9. **`packages/database/README.md`** - Schema overview y queries de ejemplo

## 🚀 Quick Start

### Opción 1: Setup Automático (Recomendado)
```bash
make init
```

Este comando hace todo:
- Levanta servicios Docker
- Ejecuta migraciones
- Carga datos de prueba
- Muestra credenciales de acceso

### Opción 2: Setup Manual
```bash
# 1. Configurar variables de entorno
cp .env.example .env

# 2. Levantar servicios
make dev

# 3. Ejecutar migraciones (en otra terminal)
make migrate

# 4. Cargar datos de prueba
make seed
```

## 🔍 Verificación

### Health Check
```bash
curl http://localhost:3001/health
# Expected: {"status":"ok","timestamp":"..."}
```

### Swagger UI
Abre en tu navegador: http://localhost:3001/api/docs

### Credenciales de Prueba
- **Email**: admin@santiago.cl
- **Password**: demo123

### Login Test
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@santiago.cl", "password": "demo123"}'
```

## 📦 Servicios Incluidos

| Servicio | Puerto | Descripción |
|----------|--------|-------------|
| **API** | 3001 | NestJS Backend |
| **PostgreSQL** | 5432 | Base de datos con PostGIS |
| **Redis** | 6379 | Cache y sessions |
| **Swagger** | 3001/api/docs | Documentación interactiva |

## 🎮 Comandos Principales

### Desarrollo
```bash
make dev          # Levantar todo
make down         # Detener
make restart      # Reiniciar
make clean        # Limpiar todo (⚠️ borra DB)
```

### Base de Datos
```bash
make migrate      # Ejecutar migraciones
make seed         # Cargar datos de prueba
make db-reset     # Reset completo
make shell-db     # Abrir psql
make studio       # Prisma Studio UI
```

### Logs y Monitoreo
```bash
make logs         # Ver todos los logs
make logs-api     # Solo API
make logs-db      # Solo PostgreSQL
make status       # Estado de servicios
```

### Utilidades
```bash
make shell-api    # Shell en contenedor API
make build        # Rebuild imágenes
make test         # Tests
make help         # Ver todos los comandos
```

## 🔧 Características Técnicas

### Dockerfile (Multi-stage)
- **Stage 1**: Base dependencies
- **Stage 2**: Install all deps (build)
- **Stage 3**: Build application
- **Stage 4**: Production runtime (optimizado)

**Optimizaciones:**
- Non-root user (security)
- Production deps only en runtime
- Health checks incluidos
- Layer caching optimizado

### Docker Compose
**Características:**
- Health checks para todos los servicios
- Dependency management correcto
- Volumes persistentes
- Network isolation
- Restart policies

**Healthchecks:**
- **PostgreSQL**: `pg_isready` cada 10s
- **Redis**: `redis-cli ping` cada 10s
- **API**: `curl health` cada 30s

### Makefile
**20+ comandos organizados en categorías:**
- 🚀 Desarrollo
- 📊 Base de Datos
- 🔍 Monitoreo
- 🛠️ Utilidades
- 🔧 Configuración

## 📁 Estructura de Archivos

```
municipal_transparency_platform/
├── apps/
│   └── api/
│       ├── Dockerfile          # ✨ Multi-stage build
│       └── README.md           # ✨ Docs técnicas
├── packages/
│   └── database/
│       └── README.md           # ✨ Schema docs
├── scripts/
│   └── init-db.sh             # ✨ PostgreSQL init
├── docker-compose.yml         # ✨ Servicios
├── Makefile                   # ✨ Comandos
├── .dockerignore              # ✨ Build optimization
├── .env.example               # ✨ Config template
└── README.md                  # ✨ Guía principal
```

## 🎯 Próximos Pasos

1. **Desarrollo Local**: Usa `make dev` y empieza a codear
2. **Explorar API**: Abre Swagger en http://localhost:3001/api/docs
3. **Ver Datos**: Usa `make studio` para explorar la DB
4. **Agregar Features**: Lee `apps/api/README.md` para estructura

## 🐛 Troubleshooting

### Problema: Puerto 5432 ya en uso
```bash
# Detener PostgreSQL local
sudo systemctl stop postgresql

# O cambiar el puerto en docker-compose.yml
ports:
  - "5433:5432"  # Usar 5433 en host
```

### Problema: Permisos de Docker
```bash
sudo usermod -aG docker $USER
newgrp docker
```

### Problema: Migraciones no aplican
```bash
make shell-api
npx prisma migrate status
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma
```

## 📊 Datos de Prueba Incluidos

Cuando ejecutas `make seed`:
- ✅ 3 Municipios (Santiago, Valparaíso, Concepción)
- ✅ 3 Años Fiscales (2023, 2024, 2025)
- ✅ 3 Usuarios (admin, editor, viewer)
- ✅ 100+ Presupuestos por municipio
- ✅ 200+ Gastos realistas
- ✅ 20 Proveedores chilenos
- ✅ Proyectos de ejemplo
- ✅ Fuentes de financiamiento

## 🔐 Seguridad

### Variables Sensibles
⚠️ **IMPORTANTE**: Cambiar en producción:
- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `POSTGRES_PASSWORD`
- `REDIS_PASSWORD`

### Generar Secrets
```bash
# JWT Secret
openssl rand -base64 32

# PostgreSQL Password
openssl rand -base64 24
```

## 📚 Referencias

- [README Principal](./README.md)
- [API Technical Docs](./apps/api/README.md)
- [Database Schema Docs](./packages/database/README.md)
- [Docker Documentation](https://docs.docker.com/)
- [NestJS Documentation](https://docs.nestjs.com/)

---

**✅ Fase 1A - Subtask 4: Completado**

Infrastructure Docker completa y documentación lista para desarrollo y producción.
