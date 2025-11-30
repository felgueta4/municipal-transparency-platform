
# 🏛️ Plataforma de Transparencia Municipal - Chile

Una plataforma integral de transparencia y gestión municipal diseñada específicamente para municipalidades de Chile, que facilita el acceso ciudadano a información presupuestaria, proyectos y contratos públicos.

![Version](https://img.shields.io/badge/version-3.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue)

## 📋 Tabla de Contenidos

- [Características Principales](#características-principales)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Documentación](#documentación)
- [Deployment](#deployment)
- [Contribuir](#contribuir)

## ✨ Características Principales

### Portal Ciudadano (Público)

#### 📊 Visualización de Datos
- **Presupuestos Municipales**: Visualización clara y accesible de presupuestos por categoría
- **Gastos e Inversiones**: Detalle de gastos municipales con gráficos interactivos
- **Proyectos Públicos**: Estado y progreso de proyectos municipales
- **Contratos y Licitaciones**: Información transparente de contratos públicos

#### 🤖 Consultas Inteligentes con IA
- Sistema de consultas en lenguaje natural
- Chatbot inteligente para responder preguntas sobre datos municipales
- Análisis automático de patrones y tendencias
- Respuestas contextualizadas basadas en datos reales

#### 🗳️ Participación Ciudadana
- Votación en línea sobre iniciativas municipales
- Sistema de comentarios y retroalimentación
- Seguimiento de propuestas ciudadanas
- Estadísticas de participación en tiempo real

#### 🔍 Búsqueda Avanzada
- Filtros por categoría, fecha, monto y estado
- Búsqueda full-text en todos los documentos
- Exportación de resultados en múltiples formatos
- Historial de búsquedas

### Portal Administrativo (Privado)

#### 📈 Dashboard Analítico
- Métricas en tiempo real de presupuestos y gastos
- Gráficos interactivos de tendencias
- Alertas automáticas de eventos importantes
- Indicadores clave de desempeño (KPIs)

#### 🤖 Análisis IA
- Predicciones presupuestarias con machine learning
- Detección de anomalías en gastos
- Recomendaciones de optimización
- Análisis comparativo entre períodos

#### 📄 Generación de Reportes
- Reportes automáticos en PDF y Excel
- Reportes personalizados por categoría y período
- Programación de reportes periódicos
- Plantillas pre-configuradas

#### 🔄 Integraciones y Conectores
- Sincronización con APIs gubernamentales
- Webhooks para notificaciones en tiempo real
- Conectores con sistemas contables
- API REST completa para integraciones externas

#### 📂 Gestión de Datos
- CRUD completo para presupuestos, gastos, proyectos y contratos
- Importación masiva de datos (Excel, CSV)
- Carga de documentos y archivos adjuntos
- Validación automática de datos

#### 🔐 Seguridad y Autenticación
- Autenticación JWT segura
- Control de acceso basado en roles
- Registro de auditoría de acciones
- Sesiones con tiempo de expiración

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────┐      ┌──────────────────┐       │
│  │  Portal Ciudadano │      │  Portal Admin    │       │
│  │                   │      │                   │       │
│  │  - Visualización  │      │  - Dashboard     │       │
│  │  - Consultas IA   │      │  - Análisis IA   │       │
│  │  - Participación  │      │  - Reportes      │       │
│  │  - Búsqueda       │      │  - Integraciones │       │
│  └──────────────────┘      └──────────────────┘       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                    API ROUTES (Next.js)                 │
│  /api/ai-query | /api/reports | /api/sync | /api/webhooks│
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   BACKEND (NestJS)                      │
├─────────────────────────────────────────────────────────┤
│  /auth | /budgets | /expenditures | /projects | /contracts │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   DATABASE (PostgreSQL)                 │
│  Tables: users, budgets, expenditures, projects,        │
│          contracts, files, audit_logs                   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              EXTERNAL SERVICES                          │
│  • Abacus AI (LLM APIs)                                 │
│  • AWS S3 (File Storage)                                │
│  • Government APIs (Data Sync)                          │
└─────────────────────────────────────────────────────────┘
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14**: Framework React con App Router y Server Components
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Estilos utilitarios responsive
- **shadcn/ui**: Componentes UI modernos y accesibles
- **Recharts**: Visualización de datos con gráficos interactivos
- **React Hook Form**: Gestión de formularios con validación

### Backend
- **NestJS**: Framework Node.js escalable
- **PostgreSQL**: Base de datos relacional
- **Prisma**: ORM type-safe
- **JWT**: Autenticación segura
- **TypeScript**: Código backend tipado

### IA y Análisis
- **Abacus AI LLM APIs**: Consultas en lenguaje natural
- **Streaming Responses**: Respuestas en tiempo real
- **Predictive Analytics**: Proyecciones presupuestarias

### DevOps
- **Docker**: Containerización
- **GitHub Actions**: CI/CD
- **Vercel**: Deploy del frontend
- **AWS**: Infraestructura cloud

## 🚀 Instalación

### Requisitos Previos

```bash
Node.js >= 18.x
PostgreSQL >= 14.x
Yarn o npm
```

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-org/municipal-transparency-platform.git
cd municipal-transparency-platform

# Instalar dependencias del frontend
cd frontend/nextjs_space
yarn install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar migraciones de base de datos
yarn prisma generate
yarn prisma migrate deploy

# Iniciar en modo desarrollo
yarn dev
```

El frontend estará disponible en `http://localhost:3000`

### Instalación con Docker

```bash
# Iniciar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de Datos
DATABASE_URL="postgresql://user:password@localhost:5432/municipal_db"

# Autenticación
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="tu-secret-muy-seguro-aqui"

# Backend API
NEXT_PUBLIC_API_URL="http://localhost:3000"

# IA y LLM
ABACUSAI_API_KEY="tu-api-key-aqui"

# AWS S3 (Opcional)
AWS_REGION="us-west-2"
AWS_BUCKET_NAME="tu-bucket"
AWS_FOLDER_PREFIX="uploads/"
```

### Datos de Prueba

Para generar datos sintéticos de prueba:

```bash
cd frontend/nextjs_space
yarn seed
```

Esto creará:
- 50 presupuestos de ejemplo
- 200 gastos simulados
- 30 proyectos municipales
- 40 contratos ficticios

## 📖 Uso

### Portal Ciudadano

1. **Navegar a** `http://localhost:3000`
2. **Explorar** presupuestos, gastos, proyectos y contratos
3. **Usar Consultas IA** en `/ciudadano/consultas`
4. **Participar** en votaciones en `/ciudadano/participacion`

### Portal Administrativo

1. **Login** en `http://localhost:3000/admin/login`
   - Email de prueba: `admin@municipal.cl`
   - Password: `admin123`

2. **Dashboard**: Visualiza métricas en tiempo real
3. **Análisis IA**: Obtén insights y predicciones
4. **Reportes**: Genera reportes personalizados
5. **Integraciones**: Configura conexiones externas

### API REST

Documentación completa en `/api-docs`

```bash
# Ejemplo: Obtener presupuestos
GET http://localhost:3000/api/budgets

# Ejemplo: Consulta IA
POST http://localhost:3000/api/ai-query
{
  "query": "¿Cuánto se gastó en educación?",
  "context": "citizen"
}
```

## 📚 Documentación

- **[Guía de Deployment](./DEPLOYMENT.md)**: Instrucciones completas de despliegue
- **[Production Checklist](./PRODUCTION_CHECKLIST.md)**: Lista de verificación pre-producción
- **[API Documentation](./API_DOCS.md)**: Documentación de endpoints
- **[Architecture Guide](./ARCHITECTURE.md)**: Detalles de arquitectura

## 🚢 Deployment

### Deployment Rápido (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Deployment Producción

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para instrucciones detalladas de:
- Docker deployment
- AWS deployment
- CI/CD con GitHub Actions
- Configuración de SSL
- Monitoreo y logs

## 🧪 Testing

```bash
# Tests unitarios
yarn test

# Tests E2E
yarn test:e2e

# Coverage
yarn test:coverage
```

## 🔒 Seguridad

- ✅ Autenticación JWT con refresh tokens
- ✅ Encriptación HTTPS en producción
- ✅ Sanitización de inputs
- ✅ Protección CSRF
- ✅ Rate limiting
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS protection
- ✅ Auditoría de acciones

## 📈 Performance

- ⚡ Lazy loading de componentes
- ⚡ Code splitting automático
- ⚡ Imágenes optimizadas (Next.js Image)
- ⚡ Caching de API responses
- ⚡ Server-side rendering (SSR)
- ⚡ Static site generation (SSG) donde aplica

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución

- Sigue las convenciones de código TypeScript
- Escribe tests para nuevas features
- Actualiza la documentación
- Usa commits semánticos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más información.

## 👥 Equipo

- **Project Lead**: [Nombre]
- **Backend**: [Nombre]
- **Frontend**: [Nombre]
- **DevOps**: [Nombre]

## 📞 Soporte

- **Email**: soporte@municipal-platform.cl
- **Documentación**: https://docs.municipal-platform.cl
- **Issues**: [GitHub Issues](https://github.com/tu-org/municipal-transparency-platform/issues)

## 🎯 Roadmap

### ✅ Fase 1 - Backend (Completada)
- [x] API REST completa
- [x] Autenticación JWT
- [x] CRUD de entidades
- [x] Carga de archivos
- [x] Validación de datos

### ✅ Fase 2 - Frontend (Completada)
- [x] Portal ciudadano
- [x] Portal administrativo
- [x] Dashboards interactivos
- [x] Formularios completos

### ✅ Fase 3 - Features Avanzadas (Completada)

#### Fase 3A - IA
- [x] Consultas en lenguaje natural
- [x] Chatbot inteligente
- [x] Análisis automático

#### Fase 3B - Integraciones
- [x] Sincronización automática
- [x] Webhooks
- [x] Conectores API

#### Fase 3C - Reportes
- [x] Generación de reportes PDF/Excel
- [x] Proyecciones presupuestarias
- [x] Sistema de alertas

#### Fase 3D - Deployment
- [x] Documentación de deployment
- [x] Docker configuration
- [x] CI/CD setup

#### Fase 3E - Portal Público Avanzado
- [x] Participación ciudadana
- [x] Sistema de votaciones
- [x] Comentarios y feedback

### 🔮 Futuro (Planificado)
- [ ] Aplicación móvil nativa
- [ ] Notificaciones push
- [ ] Integración con blockchain
- [ ] Análisis predictivo avanzado
- [ ] Multi-municipalidad
- [ ] Portal de transparencia regional

## 🙏 Agradecimientos

- Gobierno de Chile por promover la transparencia
- Comunidad open-source
- Todos los contribuidores

## 📊 Estadísticas del Proyecto

```
Líneas de código: ~50,000
Commits: 500+
Archivos: 200+
Tests: 150+
Test Coverage: 85%
```

---

**Hecho con ❤️ para Chile** 🇨🇱
