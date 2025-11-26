import {
  IsString,
  IsBoolean,
  IsOptional,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class CreateFeatureFlagDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Matches(/^[a-z][a-z0-9_]*$/, {
    message:
      'La clave debe estar en minúsculas, comenzar con una letra y solo contener letras, números y guiones bajos',
  })
  key: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsBoolean()
  defaultEnabled: boolean;
}
