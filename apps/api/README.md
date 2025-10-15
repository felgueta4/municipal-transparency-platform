
# Municipal Transparency Platform - API

Backend NestJS para la plataforma de transparencia municipal chilena.

## 🚀 Características

- **Autenticación JWT** con refresh tokens
- **RBAC** (Role-Based Access Control) con roles: `admin_muni`, `editor_muni`, `viewer_muni`
- **API REST** documentada con Swagger/OpenAPI
- **Validación** automática de DTOs con class-validator
- **Seguridad** con Helmet, CORS y rate limiting
- **Logging** estructurado con Pino
- **Prisma ORM** para gestión de base de datos PostgreSQL
- **Manejo de errores** global y consistente

## 📋 Requisitos

- Node.js >= 18.x
- PostgreSQL >= 14.x con PostGIS
- npm >= 9.x

## 🔧 Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Generar cliente Prisma
cd ../../packages/database
npm run generate

# Ejecutar migraciones
npm run migrate

# (Opcional) Seed de datos de ejemplo
npm run seed
```

## 🏃‍♂️ Ejecución

```bash
# Modo desarrollo con hot-reload
npm run dev

# Modo producción
npm run build
npm run start:prod

# Ver logs
npm run logs
```

## 📚 Documentación API

Una vez iniciado el servidor, la documentación Swagger está disponible en:

```
http://localhost:3001/api/docs
```

## 🔑 Autenticación

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@municipal.cl",
  "password": "SecurePassword123!"
}
```

### Uso del token

```bash
GET /api/budget
Authorization: Bearer <access_token>
```

### Refresh token

```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refresh_token": "<refresh_token>"
}
```

## 🛡️ Roles y Permisos

| Rol | Permisos |
|-----|----------|
| `admin_muni` | Acceso completo: crear usuarios, CRUD presupuestos/gastos |
| `editor_muni` | Crear y editar presupuestos/gastos |
| `viewer_muni` | Solo lectura |

## 🗄️ Endpoints Principales

### Auth

- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Registrar usuario (solo admin)
- `POST /api/auth/refresh` - Refrescar token
- `POST /api/auth/logout` - Logout

### Budget

- `GET /api/budget` - Listar presupuestos (con filtros y paginación)
- `POST /api/budget` - Crear presupuesto (admin/editor)
- `GET /api/budget/summary` - Resumen agrupado
- `GET /api/budget/:id` - Obtener presupuesto
- `PATCH /api/budget/:id` - Actualizar presupuesto (admin/editor)
- `DELETE /api/budget/:id` - Eliminar presupuesto (solo admin)

### Expenditures

- `GET /api/expenditures` - Listar gastos (con filtros y paginación)
- `POST /api/expenditures` - Crear gasto (admin/editor)
- `GET /api/expenditures/:id` - Obtener gasto
- `PATCH /api/expenditures/:id` - Actualizar gasto (admin/editor)
- `DELETE /api/expenditures/:id` - Eliminar gasto (admin/editor)

## 🔍 Filtros y Búsqueda

### Budget

```bash
GET /api/budget?page=1&limit=10&year=2024&category=Espacios Públicos&department=Obras Públicas
```

### Expenditures

```bash
GET /api/expenditures?page=1&limit=10&from=2024-01-01&to=2024-12-31&category=Plazas&supplierId=xyz
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests en modo watch
npm run test:watch
```

## 🌐 Configuración Regional (Chile)

- **Zona horaria**: America/Santiago
- **Locale**: es-CL
- **Moneda**: CLP (Pesos chilenos) / UF
- **Formato de fechas**: ISO 8601

## 🔐 Seguridad

- Passwords hasheados con bcrypt (10 rounds)
- JWT con expiración: access 1h, refresh 7d
- Rate limiting: 10 req/min por IP (configurable)
- CORS configurable por environment
- Helmet para security headers
- Validación y sanitización de inputs

## 📦 Estructura del Proyecto

```
src/
├── auth/                 # Módulo de autenticación
│   ├── dto/             # DTOs
│   ├── strategies/      # JWT strategies
│   ├── auth.service.ts
│   ├── auth.controller.ts
│   └── auth.module.ts
├── budget/              # Módulo de presupuestos
├── expenditure/         # Módulo de gastos
├── prisma/              # Módulo Prisma
├── common/              # Utilidades compartidas
│   ├── decorators/      # Decoradores personalizados
│   ├── filters/         # Exception filters
│   └── guards/          # Guards (Auth, Roles)
├── config/              # Configuración
├── app.module.ts        # Módulo raíz
└── main.ts             # Bootstrap
```

## 🚀 Deployment

### Docker

```bash
docker build -t municipal-api .
docker run -p 3001:3001 --env-file .env municipal-api
```

### Variables de Entorno Requeridas

Ver `.env.example` para la lista completa.

## 📝 Logs

Los logs se generan con Pino:

- Desarrollo: pretty-printed, colorizado
- Producción: JSON estructurado

## 🤝 Contribuir

1. Fork el proyecto
2. Crear feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

MIT

## 👥 Contacto

Municipal Transparency Platform Team
```
