# 🏛️ Plataforma de Transparencia Municipal - Fase 1A: Backend Core

[![License: MIT](https://i.ytimg.com/vi/4cgpu9L2AE8/maxresdefault.jpg)
[![Node.js](https://i.ytimg.com/vi/4cgpu9L2AE8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCzedb-c7IZSg8ZCib1APCJvLdWqw)
[![NestJS](https://user-images.githubusercontent.com/66284362/159115513-3ae48dd6-3d9c-416f-83d4-db48de23fac8.png)
[![PostgreSQL](https://i.ytimg.com/vi/fRILXeWTJYY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCbT5OBCCSNhQQCGy_MVXavGbyOZw)

Sistema de transparencia presupuestaria para municipios chilenos. Permite a las municipalidades gestionar y publicar información de presupuesto, gastos, proyectos y proveedores de forma transparente y accesible para la ciudadanía.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Características - Fase 1A](#-características---fase-1a)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos](#-requisitos)
- [Quick Start](#-quick-start)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Endpoints Principales](#-endpoints-principales)
- [Comandos Útiles](#-comandos-útiles)
- [Desarrollo](#-desarrollo)
- [Testing](#-testing)
- [Próximos Pasos](#-próximos-pasos)
- [Licencia](#-licencia)

## 🎯 Descripción

Esta plataforma tiene como objetivo democratizar el acceso a la información presupuestaria y de gastos municipales en Chile. La **Fase 1A** implementa el núcleo del backend con:

- **Gestión de Presupuesto**: Control de presupuestos planificados por departamento, programa y categoría
- **Registro de Gastos**: Seguimiento detallado de gastos ejecutados con información de proveedores
- **Autenticación Segura**: Sistema de autenticación JWT con roles (admin, editor, viewer)
- **Datos de Prueba**: Dataset realista con municipios chilenos y datos de ejemplo

## ✨ Características - Fase 1A

### ✅ Implementado

- 🔐 **Autenticación JWT** con refresh tokens
- 👥 **Sistema de Roles** (RBAC): admin_muni, editor_muni, viewer_muni
- 💰 **Módulo de Presupuesto** con CRUD completo y agregaciones
- 💸 **Módulo de Gastos** con filtros avanzados y búsqueda
- 🏢 **Multi-tenancy** por municipio
- 📊 **Swagger/OpenAPI** documentación interactiva
- 🐳 **Docker** infraestructura lista para producción
- 🌱 **Seeds** con datos chilenos realistas (Santiago, Valparaíso, Concepción)
- 📝 **Logging estructurado** con Pino
- 🛡️ **Seguridad**: Helmet, rate limiting, validación de inputs
- 🗄️ **Base de Datos**: PostgreSQL con PostGIS para soporte geoespacial

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-----------|
| **Backend** | NestJS 10 + TypeScript |
| **Base de Datos** | PostgreSQL 15 + PostGIS |
| **ORM** | Prisma 5 |
| **Cache** | Redis 7 |
| **Autenticación** | JWT (Passport) |
| **Validación** | class-validator + Joi |
| **Logging** | Pino |
| **Documentación** | Swagger/OpenAPI 3 |
| **Containerización** | Docker + Docker Compose |
| **Testing** | Jest (pendiente implementar) |

## 📦 Requisitos

### Esenciales

- **Docker** >= 20.10
- **Docker Compose** >= 2.0

### Opcionales (para desarrollo local sin Docker)

- **Node.js** >= 18.0
- **npm** >= 9.0
- **PostgreSQL** >= 15 (con PostGIS)
- **Redis** >= 7.0

### Verificar Requisitos

```bash
make check
```

## 🚀 Quick Start

Sigue estos pasos para tener el proyecto funcionando en menos de 5 minutos:

### 1️⃣ Clonar el Repositorio

```bash
git clone <repository-url>
cd municipal_transparency_platform
```

### 2️⃣ Configurar Variables de Entorno

```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar si necesitas cambiar algo (opcional para desarrollo)
# nano .env
```

### 3️⃣ Inicializar Proyecto (Automático)

```bash
# Este comando hace todo: levantar servicios, migrar DB y cargar datos
make init
```

O manualmente paso a paso:

```bash
# Levantar servicios (Postgres, Redis, API)
make dev

# Esperar a que Postgres esté healthy (~10 segundos)

# Ejecutar migraciones
make migrate

# Cargar datos de prueba
make seed
```

### 4️⃣ Verificar que Todo Funciona

✅ **API Health Check**
```bash
curl http://localhost:3001/health
# Expected: {"status":"ok","timestamp":"..."}
```

✅ **Swagger UI**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)

### 5️⃣ Probar Autenticación

**Credenciales de Prueba:**
- 📧 **Email**: `admin@santiago.cl`
- 🔑 **Password**: `demo123`

**Login via cURL:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@santiago.cl",
    "password": "demo123"
  }'
```

**Respuesta esperada:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@santiago.cl",
    "role": "admin_muni",
    "municipality": {
      "id": 1,
      "name": "Santiago"
    }
  }
}
```

**Probar endpoint protegido:**
```bash
# Guardar el token
TOKEN="tu_access_token_aqui"

# Consultar presupuestos
curl http://localhost:3001/api/budget \
  -H "Authorization: Bearer $TOKEN"
```

### 6️⃣ Explorar con Swagger

1. Abrir [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
2. Hacer clic en el botón **"Authorize"** (candado verde)
3. Usar el endpoint `/api/auth/login` para obtener el token
4. Copiar el `access_token` de la respuesta
5. Pegar en el campo de autorización
6. Explorar todos los endpoints

## 📁 Estructura del Proyecto

```
municipal_transparency_platform/
├── apps/
│   ├── api/                      # NestJS Backend
│   │   ├── src/
│   │   │   ├── auth/            # Módulo de autenticación
│   │   │   │   ├── strategies/  # JWT strategies
│   │   │   │   ├── dto/         # Data Transfer Objects
│   │   │   │   └── guards/      # Auth guards
│   │   │   ├── budget/          # Módulo de presupuesto
│   │   │   │   ├── dto/
│   │   │   │   └── budget.controller.ts
│   │   │   ├── expenditure/     # Módulo de gastos
│   │   │   │   ├── dto/
│   │   │   │   └── expenditure.controller.ts
│   │   │   ├── common/          # Recursos compartidos
│   │   │   │   ├── decorators/  # Custom decorators
│   │   │   │   ├── guards/      # Guards (roles, JWT)
│   │   │   │   ├── filters/     # Exception filters
│   │   │   │   └── interceptors/
│   │   │   ├── config/          # Configuración
│   │   │   ├── prisma/          # Prisma service
│   │   │   ├── main.ts          # Entry point
│   │   │   └── app.module.ts    # Root module
│   │   ├── Dockerfile           # Multi-stage build
│   │   └── README.md            # Documentación técnica
│   └── worker/                   # ETL workers (Fase 1B)
│
├── packages/
│   ├── database/                 # Prisma schema y migrations
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   ├── migrations/      # Migration history
│   │   │   └── seed.ts          # Seed data
│   │   └── README.md
│   └── config/                   # Configuración compartida
│
├── scripts/
│   └── init-db.sh               # PostgreSQL initialization
│
├── docker-compose.yml           # Orquestación de servicios
├── Dockerfile                   # (en apps/api/)
├── Makefile                     # Comandos útiles
├── .env.example                 # Variables de entorno template
├── .dockerignore
└── README.md                    # Este archivo
```

## 🔌 Endpoints Principales

### Autenticación

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/login` | Login de usuario | ❌ |
| `POST` | `/api/auth/register` | Registro (solo admins) | ✅ |
| `POST` | `/api/auth/refresh` | Renovar access token | ❌ |
| `POST` | `/api/auth/logout` | Cerrar sesión | ✅ |

### Presupuesto

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/budget` | Listar presupuestos | ✅ |
| `GET` | `/api/budget/:id` | Obtener presupuesto | ✅ |
| `POST` | `/api/budget` | Crear presupuesto | ✅ Admin |
| `PATCH` | `/api/budget/:id` | Actualizar presupuesto | ✅ Admin |
| `DELETE` | `/api/budget/:id` | Eliminar presupuesto | ✅ Admin |
| `GET` | `/api/budget/summary` | Resumen agregado | ✅ |

### Gastos (Expenditures)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/expenditures` | Listar gastos (con filtros) | ✅ |
| `GET` | `/api/expenditures/:id` | Obtener gasto | ✅ |
| `POST` | `/api/expenditures` | Registrar gasto | ✅ Editor+ |
| `PATCH` | `/api/expenditures/:id` | Actualizar gasto | ✅ Editor+ |
| `DELETE` | `/api/expenditures/:id` | Eliminar gasto | ✅ Admin |
| `GET` | `/api/expenditures/stats` | Estadísticas de gastos | ✅ |

### Health & Monitoring

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| `GET` | `/health` | Health check | ❌ |
| `GET` | `/api/docs` | Swagger UI | ❌ |

## 🎮 Comandos Útiles

### Desarrollo

```bash
make dev          # Levantar servicios en desarrollo
make down         # Detener servicios
make restart      # Reiniciar sin rebuild
make clean        # ⚠️ Detener y borrar volúmenes (elimina DB)
```

### Base de Datos

```bash
make migrate      # Ejecutar migraciones
make seed         # Cargar datos de prueba
make db-reset     # Reset completo (migrate + seed)
make shell-db     # Abrir psql
make studio       # Abrir Prisma Studio (UI)
```

### Logs y Monitoreo

```bash
make logs         # Ver todos los logs
make logs-api     # Solo logs del API
make logs-db      # Solo logs de PostgreSQL
make status       # Ver estado de servicios
```

### Utilidades

```bash
make shell-api    # Shell dentro del contenedor API
make build        # Reconstruir imágenes
make test         # Ejecutar tests
make lint         # Linter
make format       # Formatear código
make help         # Ver todos los comandos
```

## 💻 Desarrollo

### Desarrollo Local (sin Docker)

```bash
# Instalar dependencias
npm install

# Generar Prisma Client
npm run db:generate

# Ejecutar migraciones
npm run db:migrate

# Cargar datos de prueba
npm run db:seed

# Levantar API en modo desarrollo
npm run dev --workspace=apps/api
```

### Hot Reload

El API se recarga automáticamente al cambiar archivos en desarrollo.

### Prisma Studio

Para explorar y editar datos visualmente:

```bash
make studio
# o
npm run db:studio
```

Abre [http://localhost:5555](http://localhost:5555)

## 🧪 Testing

```bash
# Ejecutar todos los tests
make test

# Tests con cobertura
npm run test:cov --workspace=apps/api

# Tests E2E
npm run test:e2e --workspace=apps/api
```

## 🗺️ Próximos Pasos

### Fase 1B: Portal Admin (Próximamente)

- [ ] Frontend Next.js para administración
- [ ] Carga de CSV/XLSX con validación
- [ ] Dashboards con métricas
- [ ] Gestión de Proyectos y Proveedores

### Fase 1C: Conectores (Próximamente)

- [ ] Worker ETL con BullMQ
- [ ] Conector HTTP genérico
- [ ] Conector CKAN
- [ ] Scheduler para actualizaciones automáticas

### Fase 2: Portal Ciudadano (Futuro)

- [ ] Frontend público sin login
- [ ] Visualizaciones interactivas
- [ ] Búsqueda en lenguaje natural (NL→BI)
- [ ] Filtros y descarga de datos

## 📄 Documentación Adicional

- [API Technical Documentation](./apps/api/README.md)
- [Database Schema & Migrations](./packages/database/README.md)
- [Full Specification](./docs/specification.md)

## 🤝 Contribuir

Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y proceso de pull requests.

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

---

**🇨🇱 Construido con ❤️ para municipios chilenos**

¿Preguntas? Abre un issue o contacta al equipo.
