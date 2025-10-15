# 🗄️ Database Package - Prisma Schema & Migrations

Package centralizado de base de datos para la Plataforma de Transparencia Municipal. Contiene el schema de Prisma, migraciones, seeds y scripts de utilidad.

## 📋 Tabla de Contenidos

- [Schema Overview](#-schema-overview)
- [Modelos de Datos](#-modelos-de-datos)
- [Relaciones](#-relaciones)
- [Índices](#-índices)
- [Migraciones](#-migraciones)
- [Seeds](#-seeds)
- [Queries de Ejemplo](#-queries-de-ejemplo)
- [Best Practices](#-best-practices)

## 🗂️ Schema Overview

El schema está organizado en 5 grupos funcionales:

### 1. Core Configuration (Configuración)
- `Municipality`: Municipios
- `FiscalYear`: Años fiscales

### 2. Budget & Expenditure (Presupuesto y Gastos)
- `Budget`: Presupuestos planificados
- `Expenditure`: Gastos ejecutados

### 3. Projects (Proyectos)
- `Project`: Proyectos municipales
- `FundingSource`: Fuentes de financiamiento

### 4. Suppliers (Proveedores)
- `Supplier`: Proveedores y contratistas

### 5. Data Ingestion (Ingesta de Datos)
- `Dataset`: Datasets a ingerir
- `IngestionRun`: Historial de ingestas

### 6. Users & Audit (Usuarios y Auditoría)
- `User`: Usuarios del sistema
- `QueryAudit`: Auditoría de consultas

## 📊 Modelos de Datos

### Municipality

Representa un municipio/comuna chilena.

```prisma
model Municipality {
  id        String   @id @default(cuid())
  name      String
  country   String   @default("Chile")
  region    String
  locale    String   @default("es-CL")
  timezone  String   @default("America/Santiago")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Campos:**
- `name`: Nombre del municipio (ej: "Santiago", "Valparaíso")
- `region`: Región administrativa (ej: "Metropolitana", "Valparaíso")
- `locale`: Configuración de idioma
- `timezone`: Zona horaria

**Relaciones:**
- Tiene muchos: `Budget`, `Expenditure`, `Project`, `User`

---

### FiscalYear

Año fiscal para organizar presupuestos y gastos.

```prisma
model FiscalYear {
  id       String    @id @default(cuid())
  year     Int       @unique
  status   String    @default("active")
  lockedAt DateTime?
}
```

**Estados:**
- `active`: Año fiscal actual, abierto para modificaciones
- `locked`: Cerrado, solo lectura

**Relaciones:**
- Tiene muchos: `Budget`, `Expenditure`

---

### Budget

Presupuesto planificado por departamento y categoría.

```prisma
model Budget {
  id             String   @id @default(cuid())
  municipalityId String
  fiscalYearId   String
  department     String
  program        String
  category       String
  subcategory    String
  amountPlanned  Decimal  @db.Decimal(18, 2)
  currency       String   @default("CLP")
  notes          String?  @db.Text
}
```

**Ejemplos de Categorías:**
- Educación
- Salud
- Infraestructura
- Espacios Públicos
- Seguridad
- Aseo y Residuos

**Índices:**
```prisma
@@index([municipalityId, fiscalYearId, category, department])
@@index([category])
```

---

### Expenditure

Gasto ejecutado con detalle de proveedor y ubicación.

```prisma
model Expenditure {
  id             String   @id @default(cuid())
  municipalityId String
  fiscalYearId   String
  date           DateTime
  department     String
  program        String
  category       String
  subcategory    String
  concept        String
  amountActual   Decimal  @db.Decimal(18, 2)
  currency       String   @default("CLP")
  supplierId     String?
  procurementRef String?
  location       String?  @db.Text // GeoJSON o POINT(lon lat)
}
```

**Campos Especiales:**
- `location`: Puede almacenar coordenadas geográficas para mapas
- `procurementRef`: Referencia a licitación/compra
- `concept`: Descripción detallada del gasto

**Índices:**
```prisma
@@index([municipalityId, fiscalYearId, date, category, supplierId])
@@index([date])
@@index([category])
@@index([supplierId])
```

---

### Project

Proyecto municipal con presupuesto y ubicación.

```prisma
model Project {
  id              String    @id @default(cuid())
  municipalityId  String
  title           String
  description     String    @db.Text
  status          String
  startDate       DateTime?
  endDate         DateTime?
  department      String
  category        String
  requestedBudget Decimal?  @db.Decimal(18, 2)
  approvedBudget  Decimal?  @db.Decimal(18, 2)
  fundingSourceId String?
  location        String?   @db.Text
}
```

**Estados Posibles:**
- `idea`: Idea inicial
- `evaluating`: En evaluación
- `approved`: Aprobado
- `in_progress`: En ejecución
- `done`: Completado
- `cancelled`: Cancelado

---

### Supplier

Proveedor o contratista.

```prisma
model Supplier {
  id        String   @id @default(cuid())
  name      String
  taxId     String?  @unique
  sector    String?
  locality  String?
}
```

**Sectores Comunes:**
- Construcción
- Servicios
- Tecnología
- Consultoría
- Suministros

---

### User

Usuario del sistema con roles.

```prisma
model User {
  id             String    @id @default(cuid())
  email          String    @unique
  passwordHash   String
  role           String
  municipalityId String?
  lastLoginAt    DateTime?
}
```

**Roles:**
- `admin_muni`: Administrador municipal (acceso completo)
- `editor_muni`: Editor (crear/editar, no eliminar)
- `viewer_muni`: Solo lectura

---

## 🔗 Relaciones

### Diagrama de Relaciones Principales

```
Municipality
├── 1:N → Budget
├── 1:N → Expenditure
├── 1:N → Project
└── 1:N → User

FiscalYear
├── 1:N → Budget
└── 1:N → Expenditure

Supplier
└── 1:N → Expenditure

FundingSource
└── 1:N → Project

Dataset
└── 1:N → IngestionRun
```

### Cascadas de Eliminación

- **Municipality**: Al eliminar un municipio, se eliminan en cascada:
  - Todos sus presupuestos
  - Todos sus gastos
  - Todos sus proyectos
  
- **FiscalYear**: Al eliminar un año fiscal, se eliminan:
  - Todos los presupuestos de ese año
  - Todos los gastos de ese año

- **SetNull**: Al eliminar un proveedor o fuente de financiamiento:
  - Las referencias se establecen en NULL (no se eliminan los registros relacionados)

## 📑 Índices

Los índices optimizan las consultas más comunes:

### Budget
```prisma
@@index([municipalityId, fiscalYearId, category, department])
@@index([category])
```

**Optimiza:**
- Filtrar por municipio + año
- Agrupar por categoría
- Filtrar por departamento

### Expenditure
```prisma
@@index([municipalityId, fiscalYearId, date, category, supplierId])
@@index([date])
@@index([category])
@@index([supplierId])
```

**Optimiza:**
- Rangos de fechas
- Filtros por proveedor
- Agregaciones por categoría

## 🔄 Migraciones

### Crear una Nueva Migración

```bash
# Desarrollo (con confirmación interactiva)
npm run migrate --workspace=packages/database

# Producción (sin confirmación)
npm run migrate:deploy --workspace=packages/database

# Reset completo (⚠️ ELIMINA TODOS LOS DATOS)
npm run migrate:reset --workspace=packages/database
```

### Comandos Make

```bash
make migrate      # Ejecutar migraciones en Docker
make db-reset     # Reset + seed
```

### Workflow de Migraciones

1. **Modificar `schema.prisma`**
   ```prisma
   model Budget {
     // ... campos existentes
     isPublic Boolean @default(true) // Nueva columna
   }
   ```

2. **Generar migración**
   ```bash
   cd packages/database
   npx prisma migrate dev --name add_is_public_to_budget
   ```

3. **Revisar SQL generado**
   ```sql
   -- Archivo en: prisma/migrations/XXXXXX_add_is_public_to_budget/migration.sql
   ALTER TABLE "budgets" ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT true;
   ```

4. **Aplicar en producción**
   ```bash
   npx prisma migrate deploy
   ```

### Rollback de Migraciones

Prisma no soporta rollback automático. Para revertir:

1. Crear una migración inversa manualmente
2. O usar `migrate reset` (elimina todo)

**Ejemplo de migración inversa:**
```sql
-- down_add_is_public.sql
ALTER TABLE "budgets" DROP COLUMN "isPublic";
```

## 🌱 Seeds

Los seeds cargan datos de prueba para desarrollo.

### Ejecutar Seeds

```bash
# Localmente
npm run seed --workspace=packages/database

# En Docker
make seed
```

### Datos Incluidos en el Seed

- **3 Municipios**: Santiago, Valparaíso, Concepción
- **3 Años Fiscales**: 2023, 2024, 2025
- **Usuarios de Prueba**:
  - `admin@santiago.cl` / `demo123` (admin_muni)
  - `editor@santiago.cl` / `demo123` (editor_muni)
  - `viewer@santiago.cl` / `demo123` (viewer_muni)
- **100+ Presupuestos** por municipio y año
- **200+ Gastos** realistas
- **20 Proveedores** chilenos
- **Proyectos** de ejemplo
- **Fuentes de Financiamiento** (Municipal, FNDR, PMU, etc.)

### Modificar Seeds

Editar: `packages/database/prisma/seed.ts`

```typescript
// Ejemplo: Agregar un nuevo municipio
const antofagasta = await prisma.municipality.create({
  data: {
    name: 'Antofagasta',
    region: 'Antofagasta',
    country: 'Chile',
    locale: 'es-CL',
    timezone: 'America/Santiago',
  },
});
```

## 📝 Queries de Ejemplo

### 1. Total Presupuestado por Categoría en 2024

```typescript
const totals = await prisma.budget.groupBy({
  by: ['category'],
  where: {
    municipalityId: 'santiago_id',
    fiscalYear: {
      year: 2024,
    },
  },
  _sum: {
    amountPlanned: true,
  },
  orderBy: {
    _sum: {
      amountPlanned: 'desc',
    },
  },
});

// Resultado:
// [
//   { category: 'Educación', _sum: { amountPlanned: 5000000000 } },
//   { category: 'Salud', _sum: { amountPlanned: 3000000000 } },
//   ...
// ]
```

### 2. Top 10 Proveedores por Monto Gastado

```typescript
const topSuppliers = await prisma.expenditure.groupBy({
  by: ['supplierId'],
  where: {
    municipalityId: 'santiago_id',
    fiscalYear: {
      year: 2024,
    },
  },
  _sum: {
    amountActual: true,
  },
  orderBy: {
    _sum: {
      amountActual: 'desc',
    },
  },
  take: 10,
});

// Obtener nombres de proveedores
const supplierIds = topSuppliers.map(s => s.supplierId);
const suppliers = await prisma.supplier.findMany({
  where: {
    id: { in: supplierIds },
  },
});
```

### 3. Gastos por Mes en 2024

```typescript
const monthlySpending = await prisma.$queryRaw`
  SELECT 
    DATE_TRUNC('month', date) as month,
    SUM(amount_actual) as total
  FROM expenditures
  WHERE 
    municipality_id = ${municipalityId}
    AND EXTRACT(YEAR FROM date) = 2024
  GROUP BY DATE_TRUNC('month', date)
  ORDER BY month
`;
```

### 4. Presupuesto vs Ejecución por Categoría

```typescript
const comparison = await prisma.$queryRaw`
  SELECT 
    b.category,
    SUM(b.amount_planned) as planned,
    COALESCE(SUM(e.amount_actual), 0) as executed,
    ROUND(
      (COALESCE(SUM(e.amount_actual), 0) / NULLIF(SUM(b.amount_planned), 0) * 100),
      2
    ) as execution_rate
  FROM budgets b
  LEFT JOIN expenditures e ON 
    e.municipality_id = b.municipality_id
    AND e.fiscal_year_id = b.fiscal_year_id
    AND e.category = b.category
  WHERE 
    b.municipality_id = ${municipalityId}
    AND b.fiscal_year_id = ${fiscalYearId}
  GROUP BY b.category
  ORDER BY planned DESC
`;
```

### 5. Buscar Gastos con Filtros Complejos

```typescript
const expenditures = await prisma.expenditure.findMany({
  where: {
    municipalityId,
    fiscalYear: {
      year: 2024,
    },
    date: {
      gte: new Date('2024-01-01'),
      lte: new Date('2024-12-31'),
    },
    category: {
      in: ['Educación', 'Salud'],
    },
    amountActual: {
      gte: 1000000, // Mayor a 1 millón
    },
    supplier: {
      sector: 'Construcción',
    },
  },
  include: {
    supplier: {
      select: {
        name: true,
        taxId: true,
      },
    },
    fiscalYear: {
      select: {
        year: true,
      },
    },
  },
  orderBy: {
    date: 'desc',
  },
  take: 100,
});
```

### 6. Proyectos con Presupuesto y Fuente

```typescript
const projects = await prisma.project.findMany({
  where: {
    municipalityId,
    status: {
      in: ['approved', 'in_progress'],
    },
  },
  include: {
    fundingSource: true,
    municipality: {
      select: {
        name: true,
        region: true,
      },
    },
  },
  orderBy: {
    approvedBudget: 'desc',
  },
});
```

## 🎯 Best Practices

### 1. Usar Transacciones para Operaciones Múltiples

```typescript
await prisma.$transaction(async (tx) => {
  // Crear presupuesto
  const budget = await tx.budget.create({
    data: budgetData,
  });

  // Crear gastos asociados
  await tx.expenditure.createMany({
    data: expendituresData,
  });
});
```

### 2. Validar Antes de Eliminar

```typescript
// Verificar si hay gastos antes de eliminar presupuesto
const hasExpenditures = await prisma.expenditure.count({
  where: {
    municipalityId,
    fiscalYearId,
    category: budget.category,
  },
});

if (hasExpenditures > 0) {
  throw new Error('Cannot delete budget with associated expenditures');
}
```

### 3. Usar Select para Optimizar Queries

```typescript
// ❌ Malo: trae todo
const budgets = await prisma.budget.findMany({
  include: {
    municipality: true,
    fiscalYear: true,
  },
});

// ✅ Bueno: solo lo necesario
const budgets = await prisma.budget.findMany({
  select: {
    id: true,
    category: true,
    amountPlanned: true,
    municipality: {
      select: { name: true },
    },
  },
});
```

### 4. Manejar Decimales Correctamente

```typescript
import { Decimal } from '@prisma/client/runtime';

// Crear con Decimal
const budget = await prisma.budget.create({
  data: {
    amountPlanned: new Decimal('1500000.50'),
    // ...
  },
});

// Convertir a número para cálculos
const total = budgets.reduce(
  (sum, b) => sum + b.amountPlanned.toNumber(),
  0
);
```

### 5. Paginar Resultados Grandes

```typescript
async function getPaginatedBudgets(page: number, limit: number) {
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.budget.findMany({
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.budget.count(),
  ]);

  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
```

## 🔧 Troubleshooting

### Problema: "Prisma Client no generado"

```bash
# Solución
npx prisma generate --schema=packages/database/prisma/schema.prisma
```

### Problema: "No se pueden aplicar migraciones"

```bash
# Ver estado
npx prisma migrate status

# Resolver migraciones pendientes
npx prisma migrate resolve --applied "MIGRATION_NAME"
```

### Problema: "Error de conexión a la base de datos"

```bash
# Verificar DATABASE_URL en .env
echo $DATABASE_URL

# Probar conexión
npx prisma db execute --stdin <<< "SELECT 1;"
```

## 📚 Referencias

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/docs/)

---

**¿Dudas?** Consulta el README principal o abre un issue.
