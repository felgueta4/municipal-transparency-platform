# Database Setup Instructions

## Prerequisites

1. PostgreSQL 14+ with PostGIS extension installed
2. Node.js 18+
3. npm 9+

## Initial Setup Steps

### 1. Configure Database Connection

Edit the `.env` file in this directory with your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/municipal_transparency?schema=public"
```

### 2. Ensure PostgreSQL is Running

Make sure PostgreSQL is running and accessible. You can test the connection:

```bash
psql -h localhost -U postgres -d postgres
```

### 3. Create Database

Create the database if it doesn't exist:

```sql
CREATE DATABASE municipal_transparency;
```

### 4. Install PostGIS Extension

Connect to the database and install PostGIS:

```sql
\c municipal_transparency
CREATE EXTENSION IF NOT EXISTS postgis;
```

### 5. Run Initial Migration

From this directory (`packages/database`), run:

```bash
npx prisma migrate dev --name init
```

This will:
- Create all tables defined in the schema
- Generate the Prisma Client
- Apply the migration to your database

### 6. Verify Setup

Open Prisma Studio to verify the database structure:

```bash
npm run studio
```

## Using Docker (Recommended for Development)

If you prefer using Docker, a `docker-compose.yml` file will be provided in the root of the project that includes PostgreSQL with PostGIS.

To start the database:

```bash
docker-compose up -d postgres
```

Then follow steps 5-6 above.

## Common Issues

### Connection Error
- Verify PostgreSQL is running
- Check credentials in `.env`
- Ensure database exists

### PostGIS Not Found
- Install PostGIS: `sudo apt-get install postgresql-14-postgis-3` (Ubuntu/Debian)
- Enable extension in database: `CREATE EXTENSION postgis;`

### Migration Fails
- Check database permissions
- Ensure schema is empty for initial migration
- Try `npx prisma migrate reset` to start fresh (⚠️ deletes all data)
