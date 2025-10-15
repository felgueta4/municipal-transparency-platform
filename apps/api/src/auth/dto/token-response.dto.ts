
import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Access token JWT',
  })
  access_token: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token JWT',
  })
  refresh_token: string;

  @ApiProperty({
    example: 3600,
    description: 'Tiempo de expiración del access token en segundos',
  })
  expires_in: number;

  @ApiProperty({
    example: 'Bearer',
    description: 'Tipo de token',
  })
  token_type: string;
}
