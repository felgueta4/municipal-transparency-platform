# @municipal-platform/database

Database package for the Municipal Transparency Platform.

## Setup

1. Copy `.env.example` to `.env` and configure your database URL:
   ```bash
   cp .env.example .env
   ```

2. Run migrations:
   ```bash
   npm run migrate
   ```

3. Generate Prisma Client:
   ```bash
   npm run generate
   ```

## Scripts

- `npm run migrate` - Run database migrations in development
- `npm run migrate:deploy` - Deploy migrations to production
- `npm run migrate:reset` - Reset database and run all migrations
- `npm run studio` - Open Prisma Studio
- `npm run generate` - Generate Prisma Client
- `npm run seed` - Seed database with initial data
- `npm run format` - Format Prisma schema

## Database Schema

The database includes the following entities:

- **Municipality**: Municipal entities
- **FiscalYear**: Fiscal year configuration
- **Budget**: Planned budget by category
- **Expenditure**: Actual expenses
- **Project**: Municipal projects
- **FundingSource**: Funding sources
- **Supplier**: Suppliers and contractors
- **Dataset**: Data ingestion configuration
- **IngestionRun**: Data ingestion execution logs
- **User**: System users
- **QueryAudit**: Query audit logs

## Location Data

Location fields are stored as strings with the following formats:
- WKT format: `POINT(lon lat)`
- JSON format: `{"type": "Point", "coordinates": [lon, lat]}`

For PostGIS queries, use Prisma's raw query functionality.
