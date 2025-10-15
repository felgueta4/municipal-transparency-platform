# 🚀 Municipal Transparency API - Technical Documentation

Backend NestJS para la Plataforma de Transparencia Municipal. Esta aplicación proporciona una API REST completa para gestionar presupuestos municipales, gastos, proyectos y autenticación de usuarios.

## 📋 Tabla de Contenidos

- [Arquitectura](#-arquitectura)
- [Módulos](#-módulos)
- [Autenticación y Autorización](#-autenticación-y-autorización)
- [DTOs y Validación](#-dtos-y-validación)
- [Guards y Decoradores](#-guards-y-decoradores)
- [Manejo de Errores](#-manejo-de-errores)
- [Logging](#-logging)
- [Agregar Nuevos Endpoints](#-agregar-nuevos-endpoints)
- [Testing](#-testing)
- [Performance y Optimización](#-performance-y-optimización)

## 🏗️ Arquitectura

### Patrón de Arquitectura

El proyecto sigue una arquitectura modular basada en los principios de NestJS:

```
apps/api/src/
├── auth/                 # Autenticación y autorización
├── budget/               # Gestión de presupuestos
├── expenditure/          # Gestión de gastos
├── common/               # Recursos compartidos
│   ├── decorators/       # Custom decorators
│   ├── guards/           # Guards de autorización
│   ├── filters/          # Exception filters
│   └── interceptors/     # Interceptors
├── config/               # Configuración de la app
├── prisma/               # Prisma service
├── main.ts              # Bootstrap
└── app.module.ts        # Root module
```

### Flujo de Request

```
Request → Global Guards → Route Guards → Controller → Service → Prisma → DB
           ↓                 ↓
       JWT Auth         Roles Guard
```

## 📦 Módulos

### Auth Module

**Responsabilidad**: Autenticación JWT, registro, login y refresh tokens.

**Archivos principales:**
- `auth.controller.ts`: Endpoints de autenticación
- `auth.service.ts`: Lógica de negocio
- `strategies/jwt.strategy.ts`: Estrategia JWT principal
- `strategies/jwt-refresh.strategy.ts`: Estrategia para refresh tokens

**Endpoints:**
```typescript
POST   /api/auth/login      // Login
POST   /api/auth/register   // Registro (solo admins)
POST   /api/auth/refresh    // Renovar token
POST   /api/auth/logout     // Logout
GET    /api/auth/profile    // Ver perfil
```

**Ejemplo de uso:**
```typescript
// En auth.service.ts
async login(loginDto: LoginDto): Promise<TokenResponseDto> {
  const user = await this.validateUser(loginDto.email, loginDto.password);
  const tokens = await this.generateTokens(user);
  return { ...tokens, user };
}
```

### Budget Module

**Responsabilidad**: CRUD de presupuestos y agregaciones.

**Endpoints:**
```typescript
GET    /api/budget           // Listar con paginación
GET    /api/budget/:id       // Obtener por ID
POST   /api/budget           // Crear (Admin)
PATCH  /api/budget/:id       // Actualizar (Admin)
DELETE /api/budget/:id       // Eliminar (Admin)
GET    /api/budget/summary   // Resumen agregado
```

**DTOs:**
- `CreateBudgetDto`: Validación para crear presupuesto
- `UpdateBudgetDto`: Validación para actualizar
- `BudgetFilterDto`: Filtros de búsqueda

**Ejemplo de query con filtros:**
```typescript
// GET /api/budget?fiscalYear=2024&category=Educación&page=1&limit=10
@Get()
async findAll(@Query() filters: BudgetFilterDto) {
  return this.budgetService.findAll(filters);
}
```

### Expenditure Module

**Responsabilidad**: Registro y consulta de gastos ejecutados.

**Endpoints:**
```typescript
GET    /api/expenditures         // Listar con filtros avanzados
GET    /api/expenditures/:id     // Obtener por ID
POST   /api/expenditures         // Crear (Editor+)
PATCH  /api/expenditures/:id     // Actualizar (Editor+)
DELETE /api/expenditures/:id     // Eliminar (Admin)
GET    /api/expenditures/stats   // Estadísticas
```

**Filtros disponibles:**
```typescript
interface ExpenditureFilterDto {
  fiscalYear?: number;
  startDate?: Date;
  endDate?: Date;
  category?: string;
  subcategory?: string;
  department?: string;
  minAmount?: number;
  maxAmount?: number;
  supplierId?: number;
  page?: number;
  limit?: number;
}
```

### Prisma Module

**Responsabilidad**: Servicio singleton de Prisma Client.

**Características:**
- Manejo de conexiones
- Soft deletes (si se implementan)
- Logging de queries en desarrollo
- Graceful shutdown

**Ejemplo:**
```typescript
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

## 🔐 Autenticación y Autorización

### Sistema de Roles (RBAC)

Roles disponibles:
- `admin_muni`: Acceso completo (CRUD en todos los recursos)
- `editor_muni`: Crear y editar (no puede eliminar)
- `viewer_muni`: Solo lectura

### JWT Tokens

**Access Token:**
- Expira en 15 minutos
- Usado para autenticar requests
- Contiene: `userId`, `email`, `role`, `municipalityId`

**Refresh Token:**
- Expira en 7 días
- Usado para renovar access tokens
- Almacenado hasheado en DB

### Implementación

**Estrategia JWT:**
```typescript
// jwt.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      municipalityId: payload.municipalityId,
    };
  }
}
```

## 📝 DTOs y Validación

### Estructura de DTOs

Cada módulo tiene su carpeta `dto/` con:
- `create-*.dto.ts`: Para crear recursos
- `update-*.dto.ts`: Para actualizar (usa `PartialType`)
- `*-filter.dto.ts`: Para filtros y queries
- `index.ts`: Exporta todos los DTOs

### Ejemplo: CreateBudgetDto

```typescript
import { IsNotEmpty, IsNumber, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBudgetDto {
  @ApiProperty({ example: 1, description: 'ID del municipio' })
  @IsNumber()
  @IsNotEmpty()
  municipalityId: number;

  @ApiProperty({ example: 2024, description: 'Año fiscal' })
  @IsNumber()
  @Min(2000)
  @IsNotEmpty()
  fiscalYear: number;

  @ApiProperty({ example: 'Educación', description: 'Categoría de presupuesto' })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({ example: 150000000, description: 'Monto planificado en CLP' })
  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  amountPlanned: number;

  @ApiProperty({ 
    example: 'Presupuesto para infraestructura educativa', 
    required: false 
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
```

### Validación Automática

NestJS valida automáticamente los DTOs gracias a `ValidationPipe`:

```typescript
// main.ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,              // Remueve propiedades no declaradas
    forbidNonWhitelisted: true,   // Lanza error si hay propiedades extra
    transform: true,              // Transforma tipos automáticamente
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
);
```

## 🛡️ Guards y Decoradores

### Guards Disponibles

#### 1. JwtAuthGuard

Verifica que el request tenga un JWT válido.

```typescript
// Aplicado globalmente en app.module.ts
providers: [
  {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  },
]
```

#### 2. RolesGuard

Verifica que el usuario tenga el rol requerido.

```typescript
@Controller('budget')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BudgetController {
  @Post()
  @Roles('admin_muni', 'editor_muni')
  async create(@Body() createDto: CreateBudgetDto) {
    // Solo admin_muni y editor_muni pueden acceder
  }
}
```

### Decoradores Personalizados

#### @Public()

Marca un endpoint como público (sin autenticación).

```typescript
@Public()
@Get('health')
getHealth() {
  return { status: 'ok' };
}
```

**Implementación:**
```typescript
// common/decorators/public.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

#### @Roles()

Define qué roles pueden acceder al endpoint.

```typescript
@Roles('admin_muni')
@Delete(':id')
async remove(@Param('id') id: string) {
  // Solo admin_muni
}
```

#### @CurrentUser()

Inyecta el usuario actual en el controlador.

```typescript
@Get('profile')
getProfile(@CurrentUser() user: User) {
  return user;
}
```

**Implementación:**
```typescript
// common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

## 🚨 Manejo de Errores

### Exception Filter

```typescript
// common/filters/http-exception.filter.ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
```

### Errores Comunes

```typescript
// 400 Bad Request
throw new BadRequestException('Invalid input data');

// 401 Unauthorized
throw new UnauthorizedException('Invalid credentials');

// 403 Forbidden
throw new ForbiddenException('Insufficient permissions');

// 404 Not Found
throw new NotFoundException('Budget not found');

// 409 Conflict
throw new ConflictException('Email already exists');

// 500 Internal Server Error
throw new InternalServerErrorException('Database connection failed');
```

## 📊 Logging

### Configuración

Usamos **Pino** para logging estructurado:

```typescript
// main.ts
import { Logger } from 'nestjs-pino';

const app = await NestFactory.create(AppModule, {
  logger: ['error', 'warn', 'log', 'debug', 'verbose'],
});

app.useLogger(app.get(Logger));
```

### Uso en Servicios

```typescript
import { Logger } from '@nestjs/common';

@Injectable()
export class BudgetService {
  private readonly logger = new Logger(BudgetService.name);

  async create(dto: CreateBudgetDto) {
    this.logger.log(`Creating budget for municipality ${dto.municipalityId}`);
    try {
      const result = await this.prisma.budget.create({ data: dto });
      this.logger.log(`Budget created with ID ${result.id}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create budget: ${error.message}`, error.stack);
      throw error;
    }
  }
}
```

## ➕ Agregar Nuevos Endpoints

### Guía Paso a Paso

#### 1. Generar el módulo

```bash
nest g module projects
nest g controller projects
nest g service projects
```

#### 2. Crear DTOs

```typescript
// projects/dto/create-project.dto.ts
export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  municipalityId: number;
}
```

#### 3. Implementar Service

```typescript
// projects/projects.service.ts
@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProjectDto) {
    return this.prisma.project.create({
      data: dto,
      include: {
        municipality: true,
      },
    });
  }

  async findAll(municipalityId: number) {
    return this.prisma.project.findMany({
      where: { municipalityId },
    });
  }
}
```

#### 4. Implementar Controller

```typescript
// projects/projects.controller.ts
@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Post()
  @Roles('admin_muni', 'editor_muni')
  @ApiOperation({ summary: 'Create project' })
  async create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List projects' })
  async findAll(@CurrentUser() user: User) {
    return this.projectsService.findAll(user.municipalityId);
  }
}
```

#### 5. Registrar en App Module

```typescript
// app.module.ts
@Module({
  imports: [
    // ...
    ProjectsModule,
  ],
})
export class AppModule {}
```

## 🧪 Testing

### Unit Tests

```typescript
// budget.service.spec.ts
describe('BudgetService', () => {
  let service: BudgetService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BudgetService,
        {
          provide: PrismaService,
          useValue: {
            budget: {
              create: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<BudgetService>(BudgetService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create budget', async () => {
    const dto = { /* ... */ };
    jest.spyOn(prisma.budget, 'create').mockResolvedValue(dto as any);

    const result = await service.create(dto);
    expect(result).toEqual(dto);
  });
});
```

### E2E Tests

```typescript
// budget.e2e-spec.ts
describe('Budget (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login and get token
    const response = await request(app.getHttpServer())
      .post('/api/auth/login')
      .send({ email: 'test@test.com', password: 'test123' });
    
    token = response.body.access_token;
  });

  it('/api/budget (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/budget')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
```

## ⚡ Performance y Optimización

### Database Queries

**Usar includes solo cuando sea necesario:**
```typescript
// ❌ Malo: incluye todo
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

### Paginación

Siempre paginar en queries grandes:
```typescript
async findAll(filters: BudgetFilterDto) {
  const { page = 1, limit = 20 } = filters;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    this.prisma.budget.findMany({
      skip,
      take: limit,
      where: { /* filters */ },
    }),
    this.prisma.budget.count({
      where: { /* filters */ },
    }),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}
```

### Caching (con Redis - Futuro)

```typescript
async findOne(id: number) {
  const cacheKey = `budget:${id}`;
  
  // Try cache first
  const cached = await this.redis.get(cacheKey);
  if (cached) return JSON.parse(cached);

  // Query DB
  const budget = await this.prisma.budget.findUnique({
    where: { id },
  });

  // Cache result
  await this.redis.setex(cacheKey, 300, JSON.stringify(budget));
  
  return budget;
}
```

## 📚 Referencias

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Passport JWT](http://www.passportjs.org/packages/passport-jwt/)
- [Class Validator](https://github.com/typestack/class-validator)

---

**¿Preguntas?** Consulta el README principal o abre un issue.
