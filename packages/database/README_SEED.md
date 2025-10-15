# 🌱 Script de Seed - Plataforma de Transparencia Municipal

## Descripción

Este script de seed genera datos sintéticos realistas para el sistema de transparencia municipal chileno, incluyendo municipalidades, presupuestos, gastos, proveedores, proyectos y usuarios.

## 📊 Datos Generados

### Resumen de Registros

| Entidad | Cantidad | Descripción |
|---------|----------|-------------|
| **Municipalidades** | 3 | Santiago, Valparaíso, Concepción |
| **Años Fiscales** | 4 | 2022, 2023, 2024, 2025 (todos activos) |
| **Proveedores** | 30 | Empresas chilenas con RUT válido |
| **Fuentes de Financiamiento** | 5 | Municipal, FNDR, SUBDERE, PMU, Privado |
| **Presupuestos** | 60 | Distribuidos en 2023-2024 |
| **Gastos** | 80 | Con fechas, proveedores y ubicaciones |
| **Proyectos** | 20 | Estados variados y ubicaciones geográficas |
| **Usuarios** | 4 | Diferentes roles y municipalidades |

### Municipalidades

1. **Municipalidad de Santiago**
   - Región: Región Metropolitana
   - Coordenadas: -70.6693, -33.4489
   
2. **Municipalidad de Valparaíso**
   - Región: Región de Valparaíso
   - Coordenadas: -71.6187, -33.0472
   
3. **Municipalidad de Concepción**
   - Región: Región del Biobío
   - Coordenadas: -73.0444, -36.8201

### Departamentos y Categorías

**Departamentos:**
- Educación
- Salud
- Obras Públicas
- Aseo y Ornato
- Seguridad Ciudadana
- Cultura y Deportes

**Programas:**
- Infraestructura Educativa
- Atención Primaria
- Construcción y Mantención
- Recolección de Residuos
- Prevención Delictual
- Fomento Cultural

**Categorías:**
- Infraestructura
- Equipamiento
- Servicios
- Personal
- Mantención

### Presupuestos y Gastos

**Montos:**
- CLP: 10.000.000 - 500.000.000 (presupuestos), 5.000.000 - 300.000.000 (gastos)
- UF (CLF): 1.000 - 50.000 (presupuestos), 500 - 30.000 (gastos)

**Distribución de Monedas:**
- Presupuestos: ~33% en UF, ~67% en CLP
- Gastos: ~11% en UF, ~89% en CLP

**Ubicaciones Geográficas:**
- ~40% de los gastos tienen coordenadas geográficas
- ~60% de los proyectos tienen coordenadas geográficas

### Proveedores

30 proveedores chilenos realistas con:
- RUT chileno válido (formato 76.XXX.XXX-X)
- Sectores variados: Construcción, Servicios, Tecnología, Educación, Salud, etc.
- Localidades: Santiago, Valparaíso, Concepción

**Ejemplos:**
- Constructora Aconcagua SpA (76.123.456-7)
- Servicios de Aseo Metropolitano (78.345.678-9)
- Tecnología e Innovación S.A. (80.567.890-1)

### Proyectos

20 proyectos con estados variados:
- **idea**: Proyectos en fase de idea (4)
- **evaluating**: En evaluación (4)
- **approved**: Aprobados (5)
- **in_progress**: En progreso (5)
- **done**: Completados (2)

**Ejemplos:**
- Construcción Parque Intercomunal (En progreso)
- Implementación Sistema de Reciclaje (En progreso)
- Modernización Alumbrado Público (Completado)

### Fuentes de Financiamiento

1. **Presupuesto Municipal** (municipal)
   - Recursos propios de la municipalidad

2. **FNDR - Fondo Nacional de Desarrollo Regional** (regional)
   - Financiamiento del Gobierno Regional

3. **SUBDERE** (national)
   - Subsecretaría de Desarrollo Regional y Administrativo

4. **PMU - Programa de Mejoramiento Urbano** (national)
   - Programa del MINVU

5. **Aporte Privado** (private)
   - Financiamiento de empresas privadas

### Usuarios

4 usuarios con diferentes roles:

| Email | Contraseña | Rol | Municipalidad |
|-------|-----------|-----|---------------|
| admin@santiago.cl | demo123 | admin_muni | Santiago |
| editor@santiago.cl | demo123 | editor_muni | Santiago |
| viewer@santiago.cl | demo123 | viewer_muni | Santiago |
| admin@valparaiso.cl | demo123 | admin_muni | Valparaíso |

**Roles:**
- `admin_muni`: Administrador municipal (permisos completos)
- `editor_muni`: Editor municipal (puede modificar datos)
- `viewer_muni`: Visor municipal (solo lectura)

## 🚀 Uso

### Requisitos Previos

1. PostgreSQL instalado y ejecutándose
2. Base de datos creada
3. Variables de entorno configuradas en `.env`

### Ejecutar el Seed

```bash
cd packages/database
npm run seed
```

### Limpiar y Re-sembrar

El script automáticamente limpia todos los datos existentes antes de insertar nuevos registros. Es seguro ejecutarlo múltiples veces.

## 🔧 Configuración

### Variables de Entorno

El script usa la variable `DATABASE_URL` del archivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/municipal_transparency?schema=public"
```

### Script en package.json

```json
{
  "scripts": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

## 📝 Estructura del Script

1. **Limpieza**: Elimina todos los datos existentes
2. **Municipalidades**: Crea 3 municipalidades chilenas
3. **Años Fiscales**: Crea 4 años fiscales (2022-2025)
4. **Proveedores**: Crea 30 proveedores variados
5. **Fuentes de Financiamiento**: Crea 5 fuentes
6. **Presupuestos**: Crea 60 presupuestos distribuidos
7. **Gastos**: Crea 80 gastos con detalles realistas
8. **Proyectos**: Crea 20 proyectos en diferentes estados
9. **Usuarios**: Crea 4 usuarios con roles variados

## 🔐 Seguridad

- Las contraseñas están hasheadas usando bcrypt (rounds: 10)
- Contraseña por defecto para todos los usuarios: `demo123`
- **IMPORTANTE**: Cambiar las contraseñas en producción

## 📍 Coordenadas Geográficas

Las ubicaciones usan el formato WKT (Well-Known Text):

```
POINT(longitud latitud)
```

**Coordenadas reales de Chile:**
- Santiago: `POINT(-70.6693 -33.4489)`
- Valparaíso: `POINT(-71.6187 -33.0472)`
- Concepción: `POINT(-73.0444 -36.8201)`

## 🧪 Verificación

### Consultas de Verificación

```sql
-- Ver resumen de datos
SELECT 
  'Municipalidades' as tabla, COUNT(*) as total FROM municipalities
UNION ALL
  SELECT 'Presupuestos', COUNT(*) FROM budgets
UNION ALL
  SELECT 'Gastos', COUNT(*) FROM expenditures
UNION ALL
  SELECT 'Proyectos', COUNT(*) FROM projects;

-- Ver municipalidades
SELECT name, region FROM municipalities;

-- Ver distribución de monedas
SELECT currency, COUNT(*) as cantidad 
FROM budgets 
GROUP BY currency;

-- Ver gastos con ubicación
SELECT concept, location 
FROM expenditures 
WHERE location IS NOT NULL 
LIMIT 5;

-- Ver usuarios
SELECT email, role FROM users;
```

## 📚 Conceptos de Gastos

El script incluye más de 80 conceptos realistas de gastos municipales chilenos:

- Construcción de infraestructura (plazas, multicanchas, etc.)
- Recolección de residuos por sector y mes
- Mantención de alumbrado público
- Equipamiento (deportivo, médico, escolar)
- Becas estudiantiles
- Pavimentación de calles
- Servicios de aseo
- Eventos culturales
- Sistemas de seguridad

## 🎯 Casos de Uso

Este seed es ideal para:

- Desarrollo y testing local
- Demos y presentaciones
- Pruebas de integración
- Capacitación de usuarios
- Validación de consultas y reportes

## 🔄 Actualización

Para modificar o extender los datos:

1. Editar `prisma/seed.ts`
2. Ajustar las constantes o agregar nuevos datos
3. Ejecutar `npm run seed`

## ⚠️ Notas Importantes

- Los RUT de proveedores son sintéticos pero tienen formato válido
- Las fechas están distribuidas entre 2023-2024
- Los montos son realistas para contexto municipal chileno
- Las coordenadas son reales de las ciudades chilenas
- Los nombres y conceptos siguen nomenclatura municipal chilena

## 🆘 Solución de Problemas

### Error: Can't reach database server

```bash
# Iniciar PostgreSQL
sudo service postgresql start

# Verificar estado
sudo service postgresql status
```

### Error: Database does not exist

```bash
# Crear base de datos
sudo -u postgres psql -c "CREATE DATABASE municipal_transparency;"
```

### Error: Password authentication failed

```bash
# Configurar contraseña de postgres
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'postgres';"
```

### Error: Schema not in sync

```bash
# Aplicar schema
npx prisma db push
```

## 📖 Referencias

- [Prisma Seeding Guide](https://www.prisma.io/docs/guides/database/seed-database)
- [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [PostgreSQL Geography](https://postgis.net/docs/using_postgis_dbmanagement.html)
