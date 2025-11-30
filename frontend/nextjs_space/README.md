
# 🏛️ Plataforma de Transparencia Municipal - Chile

Una plataforma moderna de transparencia y gestión municipal desarrollada con Next.js 14, diseñada específicamente para municipios chilenos. Facilita el acceso público a información municipal y proporciona herramientas administrativas para la gestión transparente de recursos públicos.

## ✨ Características Principales

### 🌐 Portal Ciudadano (Público)
- **Visualización de Presupuestos**: Consulta de presupuestos municipales por año y categoría
- **Seguimiento de Gastos**: Transparencia en la ejecución del gasto público
- **Información de Proyectos**: Estado y avance de proyectos municipales
- **Contratos Públicos**: Acceso a información de contratos y proveedores
- **Búsqueda Avanzada**: Sistema de filtros y búsqueda por múltiples criterios
- **Visualizaciones Interactivas**: Gráficos y dashboards con datos en tiempo real

### 🔐 Portal Administrativo (Privado)
- **Dashboard Ejecutivo**: Métricas y KPIs municipales en tiempo real
- **Gestión de Presupuestos**: CRUD completo con validaciones
- **Registro de Gastos**: Control detallado del gasto municipal
- **Administración de Proyectos**: Seguimiento de proyectos con estados
- **Gestión de Contratos**: Administración de contratos y proveedores
- **Carga de Archivos**: Sistema de subida de documentos con almacenamiento en la nube
- **Autenticación Segura**: Sistema JWT con roles de usuario

### 🎨 Diseño y UX
- **Tema Chileno**: Colores inspirados en la bandera nacional
- **Responsive Design**: Compatible con dispositivos móviles y escritorio
- **Accesibilidad**: Cumple estándares WCAG para accesibilidad web
- **Animaciones Suaves**: Transiciones y efectos con Framer Motion
- **Interfaz Intuitiva**: Diseño centrado en el usuario

## 🛠️ Tecnologías

- **Frontend**: Next.js 14, React 18, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui, Framer Motion
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: JWT personalizado con bcrypt
- **Visualizaciones**: Recharts, Chart.js
- **Almacenamiento**: AWS S3 para archivos
- **Testing**: Jest, Cypress para E2E
- **Deployment**: Optimizado para Vercel/Next.js

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+
- PostgreSQL
- Yarn o npm
- Cuenta AWS (opcional, para almacenamiento)

### Configuración Local

1. **Clonar e instalar dependencias**:
```bash
git clone <repository>
cd municipal_transparency_platform/frontend/nextjs_space
yarn install
```

2. **Configurar variables de entorno**:
```bash
# Crear archivo .env.local
cp .env.example .env.local

# Configurar variables requeridas
DATABASE_URL="postgresql://username:password@localhost:5432/municipal_db"
NEXTAUTH_SECRET="your-secret-key"
AWS_BUCKET_NAME="your-bucket-name" # Opcional
AWS_REGION="us-west-2" # Opcional
```

3. **Configurar base de datos**:
```bash
# Generar cliente Prisma
yarn prisma generate

# Aplicar migraciones
yarn prisma db push

# Poblar con datos de ejemplo
yarn prisma db seed
```

4. **Ejecutar en desarrollo**:
```bash
yarn dev
```

La aplicación estará disponible en `http://localhost:3000`

## 👥 Datos de Prueba

El sistema incluye datos sintéticos realistas de municipios chilenos:

### Usuarios de Prueba
- **Admin Principal**: `john@doe.com` / `johndoe123`
- **Demo Municipal**: `demo@municipio.cl` / `demo123`
- **Admin Santiago**: `admin@santiago.cl` / `santiago123`
- **Funcionario Valparaíso**: `funcionario@valparaiso.cl` / `valpo123`

### Datos Incluidos
- **13 Presupuestos** municipales (Santiago, Valparaíso, Concepción)
- **15 Gastos** categorizados por área
- **8 Proyectos** con diferentes estados
- **12 Contratos** con proveedores reales
- **Categorías**: Educación, Salud, Infraestructura, Seguridad, Cultura, Servicios

## 🗺️ Estructura del Proyecto

```
nextjs_space/
├── app/                        # App Router de Next.js
│   ├── admin/                 # Portal administrativo
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── budgets/          # Gestión de presupuestos
│   │   ├── expenditures/     # Gestión de gastos
│   │   ├── projects/         # Gestión de proyectos
│   │   ├── contracts/        # Gestión de contratos
│   │   └── login/            # Página de login
│   ├── ciudadano/            # Portal ciudadano
│   │   ├── presupuestos/     # Vista pública de presupuestos
│   │   ├── gastos/           # Vista pública de gastos
│   │   ├── proyectos/        # Vista pública de proyectos
│   │   ├── contratos/        # Vista pública de contratos
│   │   └── buscar/           # Búsqueda general
│   ├── api/                  # API Routes
│   │   ├── auth/             # Endpoints de autenticación
│   │   ├── budgets/          # API de presupuestos
│   │   ├── expenditures/     # API de gastos
│   │   ├── projects/         # API de proyectos
│   │   └── contracts/        # API de contratos
│   └── globals.css           # Estilos globales
├── components/               # Componentes reutilizables
│   ├── ui/                   # Componentes base (shadcn/ui)
│   ├── admin-layout.tsx      # Layout administrativo
│   ├── auth-provider.tsx     # Proveedor de autenticación
│   └── charts/               # Componentes de gráficos
├── lib/                      # Utilidades y configuración
│   ├── api.ts               # Cliente API
│   ├── utils.ts             # Funciones utilitarias
│   └── types.ts             # Tipos TypeScript
├── prisma/                   # Configuración de base de datos
│   └── schema.prisma         # Esquema de base de datos
└── scripts/                  # Scripts de utilidad
    └── seed.ts              # Script de datos de prueba
```

## 🔐 Autenticación y Autorización

### Flujo de Autenticación
1. Usuario ingresa credenciales en `/admin/login`
2. Sistema valida contra base de datos (bcrypt)
3. Se genera JWT token con información del usuario
4. Token se almacena en localStorage
5. Rutas protegidas verifican token válido

### Roles de Usuario
- **admin**: Acceso completo a todas las funcionalidades
- **user**: Acceso limitado según configuración

### Rutas Protegidas
- `/admin/*`: Requiere autenticación
- `/ciudadano/*`: Acceso público
- `/api/admin/*`: Requiere token JWT válido

## 📊 Visualizaciones y Reportes

### Gráficos Disponibles
- **Presupuestos por Año**: Comparación histórica
- **Gastos por Categoría**: Distribución del gasto público
- **Estados de Proyectos**: Seguimiento de avance
- **Contratos por Monto**: Análisis de contrataciones
- **Tendencias Temporales**: Evolución de indicadores

### Métricas Principales
- Presupuesto total municipal
- Porcentaje de ejecución presupuestaria
- Número de proyectos activos
- Contratos vigentes
- Gastos por categoría

## 🌐 API Endpoints

### Públicos (sin autenticación)
```
GET /api/budgets          # Listar presupuestos públicos
GET /api/expenditures     # Listar gastos públicos
GET /api/projects         # Listar proyectos públicos
GET /api/contracts        # Listar contratos públicos
```

### Administrativos (requieren autenticación)
```
POST /api/budgets         # Crear presupuesto
PUT /api/budgets/:id      # Actualizar presupuesto
DELETE /api/budgets/:id   # Eliminar presupuesto
# Similar para expenditures, projects, contracts
```

### Autenticación
```
POST /api/auth/login      # Iniciar sesión
POST /api/signup          # Registro de usuario (admin)
```

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
# Base de datos
DATABASE_URL="postgresql://..."

# Autenticación
NEXTAUTH_SECRET="your-secret-key"

# AWS S3 (opcional)
AWS_BUCKET_NAME="your-bucket"
AWS_REGION="us-west-2"
AWS_ACCESS_KEY_ID="your-key"
AWS_SECRET_ACCESS_KEY="your-secret"

# API externa (si aplica)
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

### Personalización de Tema
El tema se puede personalizar en `tailwind.config.ts`:
```typescript
theme: {
  colors: {
    primary: '#0039A6',     // Azul chileno
    secondary: '#D52B1E',   // Rojo chileno
    accent: '#FFFFFF',      // Blanco
    // ...
  }
}
```

## 📱 Funcionalidades Móviles

- **Navegación Tactil**: Optimizada para dispositivos móviles
- **Gráficos Responsivos**: Adaptan automáticamente al tamaño de pantalla
- **Menús Colapsables**: Navegación eficiente en pantallas pequeñas
- **Carga Optimizada**: Lazy loading para mejor rendimiento

## 🧪 Testing

```bash
# Tests unitarios
yarn test

# Tests de integración
yarn test:integration

# Tests E2E
yarn test:e2e

# Cobertura de código
yarn test:coverage
```

## 📈 Rendimiento

### Optimizaciones Implementadas
- **Code Splitting**: Carga bajo demanda por rutas
- **Image Optimization**: Next.js Image component
- **Static Generation**: Páginas estáticas cuando es posible
- **API Caching**: Cache inteligente de datos públicos
- **Bundle Optimization**: Análisis y optimización de bundles

### Métricas de Rendimiento
- Lighthouse Score: 95+
- First Contentful Paint: <1.5s
- Time to Interactive: <3s
- Bundle Size: Optimizado por ruta

## 🚀 Deployment

### Vercel (Recomendado)
```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker
```bash
# Build imagen
docker build -t municipal-transparency .

# Ejecutar contenedor
docker run -p 3000:3000 municipal-transparency
```

### Manual
```bash
# Build producción
yarn build

# Ejecutar
yarn start
```

## 📚 Recursos Adicionales

### Documentación
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Comunidad
- [GitHub Issues](https://github.com/your-repo/issues)
- [Discord Community](https://discord.gg/your-server)

## 🤝 Contribución

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push al branch (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Estándares de Código
- ESLint + Prettier para formateo
- Conventional Commits
- TypeScript estricto
- Tests requeridos para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Desarrollado por

Plataforma desarrollada para modernizar la transparencia municipal en Chile, promoviendo el gobierno abierto y la participación ciudadana.

---

**Versión**: 2.0.0  
**Última actualización**: Octubre 2024  
**Compatible con**: Node.js 18+, Next.js 14+
