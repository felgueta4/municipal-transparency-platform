#!/bin/bash
# ==================================
# PostgreSQL + PostGIS Initialization
# ==================================

set -e

# Enable PostGIS extension
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    -- Enable PostGIS extension
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE EXTENSION IF NOT EXISTS postgis_topology;
    
    -- Enable pg_trgm for text search
    CREATE EXTENSION IF NOT EXISTS pg_trgm;
    
    -- Enable uuid-ossp for UUID generation
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    
    -- Show installed extensions
    SELECT extname, extversion FROM pg_extension;
EOSQL

echo "PostgreSQL + PostGIS initialized successfully!"
