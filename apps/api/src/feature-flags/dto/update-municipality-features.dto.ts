import { IsString, IsBoolean } from 'class-validator';

export class UpdateMunicipalityFeaturesDto {
  @IsString()
  featureFlagKey: string;

  @IsBoolean()
  enabled: boolean;
}
