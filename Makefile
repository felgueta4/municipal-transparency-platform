.PHONY: help dev down clean logs migrate seed shell-api shell-db build restart status ps

# ==================================
# MUNICIPAL TRANSPARENCY PLATFORM
# Makefile - Comandos Útiles
# ==================================

# Colors for output
GREEN  := \033[0;32m
YELLOW := \033[0;33m
RED    := \033[0;31m
NC     := \033[0m # No Color

## help: Mostrar este mensaje de ayuda
help:
	@echo ""
	@echo "$(GREEN)═══════════════════════════════════════════════════════════════$(NC)"
	@echo "$(GREEN)  Plataforma de Transparencia Municipal - Comandos Disponibles $(NC)"
	@echo "$(GREEN)═══════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "$(YELLOW)🚀 Desarrollo$(NC)"
	@echo "  $(GREEN)make dev$(NC)         - Levantar servicios en modo desarrollo (build + logs)"
	@echo "  $(GREEN)make down$(NC)        - Detener todos los servicios"
	@echo "  $(GREEN)make restart$(NC)     - Reiniciar servicios sin rebuild"
	@echo "  $(GREEN)make clean$(NC)       - Detener y eliminar volúmenes (⚠️  borra la DB)"
	@echo ""
	@echo "$(YELLOW)📊 Base de Datos$(NC)"
	@echo "  $(GREEN)make migrate$(NC)     - Ejecutar migraciones de Prisma"
	@echo "  $(GREEN)make seed$(NC)        - Cargar datos de prueba (municipios + presupuesto)"
	@echo "  $(GREEN)make db-reset$(NC)    - Reset completo de la DB (migrate reset + seed)"
	@echo "  $(GREEN)make shell-db$(NC)    - Abrir shell de PostgreSQL"
	@echo "  $(GREEN)make studio$(NC)      - Abrir Prisma Studio (UI para explorar DB)"
	@echo ""
	@echo "$(YELLOW)🔍 Monitoreo$(NC)"
	@echo "  $(GREEN)make logs$(NC)        - Ver logs de todos los servicios"
	@echo "  $(GREEN)make logs-api$(NC)    - Ver logs solo del API"
	@echo "  $(GREEN)make logs-db$(NC)     - Ver logs solo de PostgreSQL"
	@echo "  $(GREEN)make status$(NC)      - Ver estado de los servicios"
	@echo "  $(GREEN)make ps$(NC)          - Ver servicios en ejecución"
	@echo ""
	@echo "$(YELLOW)🛠️  Utilidades$(NC)"
	@echo "  $(GREEN)make shell-api$(NC)   - Abrir shell en el contenedor API"
	@echo "  $(GREEN)make build$(NC)       - Reconstruir imágenes Docker"
	@echo "  $(GREEN)make test$(NC)        - Ejecutar tests"
	@echo "  $(GREEN)make lint$(NC)        - Ejecutar linter"
	@echo "  $(GREEN)make format$(NC)      - Formatear código con Prettier"
	@echo ""
	@echo "$(YELLOW)🔧 Configuración$(NC)"
	@echo "  $(GREEN)make init$(NC)        - Inicializar proyecto (copiar .env, install, migrate, seed)"
	@echo "  $(GREEN)make check$(NC)       - Verificar prerequisitos (Docker, Node, etc.)"
	@echo ""
	@echo "$(GREEN)═══════════════════════════════════════════════════════════════$(NC)"
	@echo ""

## dev: Levantar todos los servicios en modo desarrollo
dev:
	@echo "$(GREEN)🚀 Levantando servicios en modo desarrollo...$(NC)"
	docker-compose up --build -d
	@echo "$(YELLOW)⏳ Esperando a que los servicios estén listos...$(NC)"
	@sleep 5
	@echo "$(GREEN)✓ Servicios iniciados!$(NC)"
	@echo "$(YELLOW)📋 Ejecutando logs...$(NC)"
	@echo "$(YELLOW)   Presiona Ctrl+C para salir de los logs (los servicios seguirán ejecutándose)$(NC)"
	@echo ""
	docker-compose logs -f api

## down: Detener todos los servicios
down:
	@echo "$(YELLOW)🛑 Deteniendo servicios...$(NC)"
	docker-compose down
	@echo "$(GREEN)✓ Servicios detenidos$(NC)"

## clean: Detener servicios y eliminar volúmenes (elimina datos de DB)
clean:
	@echo "$(RED)⚠️  ADVERTENCIA: Esto eliminará todos los datos de la base de datos$(NC)"
	@read -p "¿Estás seguro? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(YELLOW)🧹 Limpiando servicios y volúmenes...$(NC)"; \
		docker-compose down -v; \
		echo "$(GREEN)✓ Limpieza completada$(NC)"; \
	else \
		echo "$(YELLOW)Operación cancelada$(NC)"; \
	fi

## logs: Ver logs de todos los servicios
logs:
	docker-compose logs -f

## logs-api: Ver logs solo del API
logs-api:
	docker-compose logs -f api

## logs-db: Ver logs solo de PostgreSQL
logs-db:
	docker-compose logs -f postgres

## migrate: Ejecutar migraciones de Prisma
migrate:
	@echo "$(GREEN)🔄 Ejecutando migraciones de Prisma...$(NC)"
	docker-compose exec api npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma
	@echo "$(GREEN)✓ Migraciones completadas$(NC)"

## seed: Cargar datos de prueba
seed:
	@echo "$(GREEN)🌱 Cargando datos de prueba...$(NC)"
	docker-compose exec api npm run seed --workspace=packages/database
	@echo "$(GREEN)✓ Datos de prueba cargados$(NC)"
	@echo "$(YELLOW)📧 Usuario admin: admin@santiago.cl$(NC)"
	@echo "$(YELLOW)🔑 Contraseña: demo123$(NC)"

## db-reset: Reset completo de la base de datos
db-reset:
	@echo "$(RED)⚠️  ADVERTENCIA: Esto reiniciará completamente la base de datos$(NC)"
	@read -p "¿Continuar? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		echo "$(YELLOW)🔄 Reseteando base de datos...$(NC)"; \
		docker-compose exec api npx prisma migrate reset --force --schema=packages/database/prisma/schema.prisma; \
		$(MAKE) seed; \
		echo "$(GREEN)✓ Reset completado$(NC)"; \
	else \
		echo "$(YELLOW)Operación cancelada$(NC)"; \
	fi

## shell-api: Abrir shell en el contenedor API
shell-api:
	@echo "$(GREEN)🐚 Abriendo shell en contenedor API...$(NC)"
	docker-compose exec api sh

## shell-db: Abrir shell de PostgreSQL
shell-db:
	@echo "$(GREEN)🐚 Abriendo shell de PostgreSQL...$(NC)"
	docker-compose exec postgres psql -U municipal_user -d municipal_transparency

## build: Reconstruir imágenes Docker
build:
	@echo "$(GREEN)🔨 Reconstruyendo imágenes Docker...$(NC)"
	docker-compose build --no-cache
	@echo "$(GREEN)✓ Imágenes reconstruidas$(NC)"

## restart: Reiniciar servicios
restart:
	@echo "$(YELLOW)🔄 Reiniciando servicios...$(NC)"
	docker-compose restart
	@echo "$(GREEN)✓ Servicios reiniciados$(NC)"

## status: Ver estado de los servicios
status:
	@echo "$(GREEN)📊 Estado de los servicios:$(NC)"
	@docker-compose ps

## ps: Alias de status
ps: status

## studio: Abrir Prisma Studio
studio:
	@echo "$(GREEN)🎨 Abriendo Prisma Studio...$(NC)"
	@echo "$(YELLOW)   Accede a: http://localhost:5555$(NC)"
	docker-compose exec api npx prisma studio --schema=packages/database/prisma/schema.prisma

## test: Ejecutar tests
test:
	@echo "$(GREEN)🧪 Ejecutando tests...$(NC)"
	docker-compose exec api npm test

## lint: Ejecutar linter
lint:
	@echo "$(GREEN)🔍 Ejecutando linter...$(NC)"
	docker-compose exec api npm run lint

## format: Formatear código
format:
	@echo "$(GREEN)✨ Formateando código...$(NC)"
	docker-compose exec api npm run format

## init: Inicializar proyecto completo
init: check
	@echo "$(GREEN)🎬 Inicializando proyecto...$(NC)"
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)📝 Copiando .env.example a .env...$(NC)"; \
		cp .env.example .env; \
		echo "$(GREEN)✓ Archivo .env creado$(NC)"; \
	else \
		echo "$(YELLOW)⚠️  .env ya existe, omitiendo...$(NC)"; \
	fi
	@echo "$(YELLOW)🐳 Levantando servicios...$(NC)"
	@$(MAKE) dev &
	@sleep 15
	@echo "$(YELLOW)🔄 Ejecutando migraciones...$(NC)"
	@$(MAKE) migrate
	@echo "$(YELLOW)🌱 Cargando datos de prueba...$(NC)"
	@$(MAKE) seed
	@echo ""
	@echo "$(GREEN)═══════════════════════════════════════════════════════════════$(NC)"
	@echo "$(GREEN)✓ ¡Inicialización completada!$(NC)"
	@echo "$(GREEN)═══════════════════════════════════════════════════════════════$(NC)"
	@echo ""
	@echo "$(YELLOW)🌐 Swagger UI: http://localhost:3001/api/docs$(NC)"
	@echo "$(YELLOW)📧 Usuario: admin@santiago.cl$(NC)"
	@echo "$(YELLOW)🔑 Contraseña: demo123$(NC)"
	@echo ""
	@echo "$(GREEN)Usa 'make logs' para ver los logs o 'make help' para más comandos$(NC)"
	@echo ""

## check: Verificar prerequisitos
check:
	@echo "$(GREEN)🔍 Verificando prerequisitos...$(NC)"
	@command -v docker >/dev/null 2>&1 || { echo "$(RED)❌ Docker no está instalado$(NC)"; exit 1; }
	@echo "$(GREEN)✓ Docker instalado$(NC)"
	@command -v docker-compose >/dev/null 2>&1 || { echo "$(RED)❌ Docker Compose no está instalado$(NC)"; exit 1; }
	@echo "$(GREEN)✓ Docker Compose instalado$(NC)"
	@docker info >/dev/null 2>&1 || { echo "$(RED)❌ Docker daemon no está corriendo$(NC)"; exit 1; }
	@echo "$(GREEN)✓ Docker daemon corriendo$(NC)"
	@echo "$(GREEN)✓ Todos los prerequisitos están OK$(NC)"

# Default target
.DEFAULT_GOAL := help
