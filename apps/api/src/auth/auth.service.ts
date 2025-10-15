
import { Injectable, UnauthorizedException, ConflictException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto, TokenResponseDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Login - Autentica usuario y devuelve tokens JWT
   */
  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Generate tokens
    return this.generateTokens(user.id, user.email, user.role, user.municipalityId);
  }

  /**
   * Register - Registra un nuevo usuario (solo admin puede crear usuarios)
   */
  async register(registerDto: RegisterDto, adminUserId: string): Promise<TokenResponseDto> {
    const { email, password, role, municipalityId } = registerDto;

    // Verify admin user
    const adminUser = await this.prisma.user.findUnique({
      where: { id: adminUserId },
    });

    if (!adminUser || adminUser.role !== 'admin_muni') {
      throw new ForbiddenException('Only admin users can create new users');
    }

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
        role,
        municipalityId,
      },
    });

    // Generate tokens
    return this.generateTokens(user.id, user.email, user.role, user.municipalityId);
  }

  /**
   * Refresh - Genera nuevo access token usando refresh token
   */
  async refresh(refreshToken: string): Promise<TokenResponseDto> {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.generateTokens(user.id, user.email, user.role, user.municipalityId);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  /**
   * Logout - Invalida tokens (implementación básica)
   * En producción, considerar usar Redis para blacklist de tokens
   */
  async logout(_userId: string): Promise<{ message: string }> {
    // En una implementación real, aquí se invalidarían los tokens
    // usando Redis o una blacklist en la base de datos
    // _userId es el parámetro para futura implementación
    return { message: 'Logged out successfully' };
  }

  /**
   * Genera access y refresh tokens
   */
  private async generateTokens(
    userId: string,
    email: string,
    role: string,
    municipalityId?: string,
  ): Promise<TokenResponseDto> {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
      municipalityId,
    };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN', '1h'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN', '7d'),
      }),
    ]);

    return {
      access_token,
      refresh_token,
      expires_in: 3600, // 1 hour in seconds
      token_type: 'Bearer',
    };
  }
}
