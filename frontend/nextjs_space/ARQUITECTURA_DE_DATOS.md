# 🏛️ Arquitectura de Datos - Portal de Transparencia Municipal

## 📋 Principio Fundamental: Single Source of Truth

El **Portal de Administración** (`/admin`) es la **única fuente oficial de información** en el sistema Lumen. Todo dato visible en el portal público proviene exclusivamente de la base de datos PostgreSQL gestionada a través del portal administrativo.

---

## 🔄 Flujo de Datos

```
┌─────────────────────────────────────────────────────────────┐
│                    PORTAL DE ADMINISTRACIÓN                  │
│                     (/admin - Autenticado)                   │
│                                                              │
│  ✏️  Crear  │  ✏️  Editar  │  🗑️  Eliminar  │  👁️  Visualizar │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │   Base de Datos         │
        │   PostgreSQL + Prisma   │
        │                         │
        │  • budgets              │
        │  • expenditures         │
        │  • projects             │
        │  • contracts            │
        │  • municipal_map_projects│
        │  • file_uploads         │
        └────────────┬────────────┘
                     │
                     ▼
        ┌────────────────────────┐
        │    API Routes           │
        │    /api/*               │
        │                         │
        │  force-dynamic          │
        │  no-cache               │
        └────────────┬────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                      PORTAL PÚBLICO                          │
│                  (/ciudadano - Sin autenticación)            │
│                                                              │
│        👁️  Solo Lectura  │  📊  Visualización  │  🔍  Consultas │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Garantías del Sistema

### 1. **Consistencia Total**
- ✓ Todos los datos provienen de la misma base de datos PostgreSQL
- ✓ No existen datos locales, duplicados ni estáticos en el portal público
- ✓ No hay fallback a datos de demostración

### 2. **Sincronización en Tiempo Real**
- ✓ Todos los API routes usan `export const dynamic = "force-dynamic"`
- ✓ Las peticiones del frontend usan `cache: 'no-store'`
- ✓ Los cambios en el admin se reflejan inmediatamente en el portal público

### 3. **Sin Caché Intermedio**
- ✓ No se cachean datos en el cliente
- ✓ Cada consulta obtiene datos frescos de la base de datos
- ✓ Sin almacenamiento local ni IndexedDB

---

## 📂 Estructura de Datos

### Modelos de Base de Datos (Prisma Schema)

#### Budget (Presupuestos)
```typescript
{
  id: string
  fiscalYearId: string
  department: string
  program: string
  category: string
  subcategory: string
  amountPlanned: number
  currency: string
  notes?: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Expenditure (Gastos)
```typescript
{
  id: string
  fiscalYearId: string
  date: DateTime
  department: string
  program: string
  category: string
  subcategory: string
  concept: string
  amountActual: number
  currency: string
  supplierId?: string
  procurementRef?: string
  location?: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Project (Proyectos)
```typescript
{
  id: string
  title: string
  description: string
  status: string
  startDate?: DateTime
  endDate?: DateTime
  department: string
  category: string
  requestedBudget?: number
  approvedBudget?: number
  fundingSourceId?: string
  location?: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### Contract (Contratos)
```typescript
{
  id: string
  supplierId: string
  title: string
  description: string
  amount: number
  currency: string
  startDate: DateTime
  endDate?: DateTime
  status: string
  contractNumber?: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

#### MunicipalMapProject (Proyectos en Mapa)
```typescript
{
  id: string
  name: string
  description: string
  category: string
  latitude: number
  longitude: number
  progress: number // 0-100
  amount: number
  isActive: boolean // Visibilidad pública
  comuna: string
  createdAt: DateTime
  updatedAt: DateTime
}
```

---

## 🔌 API Endpoints

Todos los endpoints están en `/app/api/` y siguen el patrón:

### Endpoints Públicos (Sin autenticación)
- `GET /api/budgets` - Listar todos los presupuestos
- `GET /api/expenditures` - Listar todos los gastos
- `GET /api/projects` - Listar todos los proyectos
- `GET /api/contracts` - Listar todos los contratos
- `GET /api/map-projects?public=true` - Listar proyectos del mapa visibles públicamente

### Endpoints Administrativos (Requieren autenticación)
- `POST /api/budgets` - Crear presupuesto
- `PUT /api/budgets/[id]` - Actualizar presupuesto
- `DELETE /api/budgets/[id]` - Eliminar presupuesto

_(Similar para expenditures, projects, contracts, map-projects)_

---

## 🛡️ Reglas de Negocio

### En el Portal de Administración (/admin):
1. **Crear**: Los administradores pueden crear nuevos registros
2. **Editar**: Los administradores pueden modificar registros existentes
3. **Eliminar**: Los administradores pueden eliminar registros
4. **Visibilidad**: Los administradores controlan qué se muestra públicamente (campo `isActive`, `isPublic`)

### En el Portal Público (/ciudadano):
1. **Solo Lectura**: Los ciudadanos solo pueden visualizar datos
2. **Datos Reales**: Siempre se muestran datos de la base de datos, nunca datos de demostración
3. **Error Handling**: Si no hay conexión con la base de datos, se muestra un mensaje de error claro

---

## 🔧 Implementación Técnica

### 1. API Client (`/lib/api.ts`)
```typescript
export async function apiRequest(endpoint: string, options: ApiRequestOptions = {}) {
  const config: RequestInit = {
    method,
    headers,
    cache: 'no-store', // ⚠️ CRÍTICO: Sin caché
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    
    if (!response.ok) {
      throw new Error(`API Error (${response.status})`)
    }
    
    return await response.json()
  } catch (error) {
    // ⚠️ CRÍTICO: NO hay fallback a datos de demostración
    throw error
  }
}
```

### 2. API Routes (Ejemplo: `/api/budgets/route.ts`)
```typescript
export const dynamic = "force-dynamic" // ⚠️ CRÍTICO: Sin caché del servidor

async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(budgets)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener presupuestos' }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
```

### 3. Frontend Components
```typescript
const loadPublicData = async () => {
  const budgetsRes = await fetch('/api/budgets', { cache: 'no-store' })
  
  if (!budgetsRes.ok) {
    throw new Error('No se pudo conectar con la base de datos')
  }
  
  const budgets = await budgetsRes.json()
  // ... usar datos reales
}
```

---

## 🚨 Puntos Críticos a Mantener

### ❌ NUNCA hacer:
1. ❌ Crear datos de demostración en el frontend
2. ❌ Usar `cache: 'force-cache'` en las peticiones
3. ❌ Implementar fallback a datos estáticos
4. ❌ Almacenar datos en localStorage o IndexedDB
5. ❌ Crear copias de datos fuera de la base de datos

### ✅ SIEMPRE hacer:
1. ✅ Usar `cache: 'no-store'` en todas las peticiones
2. ✅ Implementar manejo de errores claro
3. ✅ Validar que las respuestas de la API sean exitosas
4. ✅ Mostrar mensajes informativos cuando no hay datos
5. ✅ Mantener `export const dynamic = "force-dynamic"` en los API routes

---

## 🧪 Pruebas de Consistencia

Para verificar que la arquitectura se mantiene:

### Test 1: Crear dato en Admin
1. Ir a `/admin/budgets`
2. Crear un nuevo presupuesto
3. Verificar que aparece inmediatamente en `/ciudadano`

### Test 2: Editar dato en Admin
1. Editar un presupuesto existente en `/admin/budgets`
2. Refrescar `/ciudadano`
3. Verificar que se muestra el dato actualizado

### Test 3: Eliminar dato en Admin
1. Eliminar un presupuesto en `/admin/budgets`
2. Refrescar `/ciudadano`
3. Verificar que ya no aparece

### Test 4: Sin conexión a base de datos
1. Detener la base de datos
2. Intentar acceder a `/ciudadano`
3. Verificar que se muestra un mensaje de error (no datos de demostración)

---

## 📊 Monitoreo

### Logs importantes:
- ✅ `API request successful` - Petición exitosa
- ❌ `API request failed` - Error en petición (se debe investigar)
- ⚠️ `Error fetching data from database` - Base de datos no disponible

### Métricas clave:
- Tiempo de respuesta de API routes
- Tasa de éxito de peticiones a la base de datos
- Frecuencia de errores de conexión

---

## 🔗 Enlaces Relacionados

- **Documentación de Prisma**: Schema y migraciones
- **API Routes**: `/app/api/*/route.ts`
- **Componentes Admin**: `/app/admin/*/page.tsx`
- **Componentes Públicos**: `/app/ciudadano/*/page.tsx`

---

## 📝 Notas Finales

Este documento debe actualizarse cada vez que se:
- Agregue un nuevo modelo a la base de datos
- Cree un nuevo API endpoint
- Modifique el flujo de datos

**Última actualización**: 2025-10-20

**Responsable**: Sistema Lumen - Plataforma de Transparencia Municipal
