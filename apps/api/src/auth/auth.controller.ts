
import { Controller, Post, Get, Body, UseGuards, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, TokenResponseDto, RefreshTokenDto } from './dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login con email y password' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  async login(@Body() loginDto: LoginDto): Promise<TokenResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin_muni')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar nuevo usuario (solo admin)' })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado exitosamente',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'No autorizado - Solo admin puede crear usuarios',
  })
  @ApiResponse({
    status: 409,
    description: 'Usuario ya existe',
  })
  async register(
    @Body() registerDto: RegisterDto,
    @CurrentUser('userId') userId: string,
  ): Promise<TokenResponseDto> {
    return this.authService.register(registerDto, userId);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refrescar access token usando refresh token' })
  @ApiResponse({
    status: 200,
    description: 'Token refrescado exitosamente',
    type: TokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Refresh token inválido',
  })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<TokenResponseDto> {
    return this.authService.refresh(refreshTokenDto.refresh_token);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({
    status: 200,
    description: 'Sesión cerrada exitosamente',
  })
  async logout(@CurrentUser('userId') userId: string): Promise<{ message: string }> {
    return this.authService.logout(userId);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener información del usuario actual' })
  @ApiResponse({
    status: 200,
    description: 'Información del usuario actual',
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  async getCurrentUser(@CurrentUser('userId') userId: string) {
    return this.authService.getUserById(userId);
  }
}
