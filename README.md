# Municipal Transparency Platform

Plataforma de transparencia municipal para Chile - Fase 1A

## 📋 Descripción

Sistema de gestión y visualización de presupuestos y gastos municipales para promover la transparencia en la administración pública chilena.

## 🏗️ Arquitectura

Este proyecto está organizado como un monorepo con npm workspaces:

### Apps
- **api**: Backend NestJS con autenticación JWT y módulos de presupuesto/gastos
- **admin**: Dashboard administrativo (placeholder - fase futura)
- **public**: Aplicación web pública (placeholder - fase futura)
- **worker**: Worker para ingesta de datos (placeholder - fase futura)

### Packages
- **database**: Schema de Prisma y migraciones PostgreSQL + PostGIS
- **config**: Configuración compartida
- **ui**: Componentes UI compartidos (placeholder - fase futura)

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+
- npm 9+
- PostgreSQL 14+ con PostGIS
- Docker y Docker Compose (opcional, recomendado)

### Instalación

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Configurar base de datos (ver `packages/database/SETUP.md`):
   ```bash
   cd packages/database
   cp .env.example .env
   # Editar .env con tu configuración de PostgreSQL
   ```

3. Ejecutar migraciones:
   ```bash
   npm run db:migrate
   ```

4. Generar Prisma Client:
   ```bash
   npm run db:generate
   ```

## 📦 Scripts Disponibles

### Nivel Raíz
- `npm run dev` - Ejecutar todos los workspaces en modo desarrollo
- `npm run build` - Construir todos los workspaces
- `npm run lint` - Ejecutar ESLint en todo el proyecto
- `npm run lint:fix` - Ejecutar ESLint y auto-corregir
- `npm run format` - Formatear código con Prettier
- `npm run typecheck` - Verificar tipos de TypeScript
- `npm run db:migrate` - Ejecutar migraciones de base de datos
- `npm run db:studio` - Abrir Prisma Studio
- `npm run db:generate` - Generar Prisma Client
- `npm run db:seed` - Poblar base de datos con datos iniciales

### Database Package
```bash
cd packages/database
npm run migrate      # Ejecutar migraciones
npm run studio       # Abrir Prisma Studio
npm run generate     # Generar Prisma Client
npm run seed         # Poblar base de datos
```

### API App
```bash
cd apps/api
npm run dev          # Modo desarrollo
npm run build        # Construir
npm run start        # Iniciar producción
```

## 🗄️ Modelo de Datos

El schema de base de datos incluye las siguientes entidades:

- **Municipality**: Entidades municipales
- **FiscalYear**: Años fiscales
- **Budget**: Presupuestos planificados
- **Expenditure**: Gastos ejecutados
- **Project**: Proyectos municipales
- **FundingSource**: Fuentes de financiamiento
- **Supplier**: Proveedores y contratistas
- **Dataset**: Configuración de conjuntos de datos
- **IngestionRun**: Logs de ejecución de ingesta
- **User**: Usuarios del sistema
- **QueryAudit**: Auditoría de consultas

## 🌍 Configuración Regional

- **País**: Chile
- **Locale**: es-CL
- **Zona horaria**: America/Santiago
- **Moneda**: CLP (Peso chileno) / UF (Unidad de Fomento - CLF)

## 📝 Fase 1A - Alcance

✅ Estructura de monorepo con npm workspaces
✅ Schema de Prisma con todas las entidades
✅ Configuración de TypeScript, ESLint y Prettier
- Backend NestJS con autenticación JWT (próximo)
- Módulos Budget y Expenditure (próximo)
- Seeds con datos chilenos (próximo)
- Docker Compose con PostgreSQL + PostGIS (próximo)

## 🛠️ Stack Tecnológico

- **Backend**: NestJS, TypeScript
- **Base de datos**: PostgreSQL 14+, PostGIS, Prisma ORM
- **Autenticación**: JWT, Passport
- **Validación**: class-validator, class-transformer
- **Linting**: ESLint, Prettier
- **Testing**: Jest

## 📚 Documentación

- [Database Setup](./packages/database/SETUP.md) - Guía de configuración de base de datos
- [Database Package](./packages/database/README.md) - Documentación del paquete de base de datos

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Por favor, sigue las convenciones de código establecidas:

- Usar TypeScript strict mode
- Seguir las reglas de ESLint y Prettier
- Escribir tests para nuevas funcionalidades
- Documentar cambios en el schema de base de datos

## 📄 Licencia

MIT

## 👥 Equipo

Municipal Transparency Platform Team
