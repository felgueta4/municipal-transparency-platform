import { IsArray, IsString, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class FeatureUpdate {
  @IsString()
  featureFlagKey: string;

  @IsBoolean()
  enabled: boolean;
}

export class BulkUpdateFeaturesDto {
  @IsArray()
  @IsString({ each: true })
  municipalityIds: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeatureUpdate)
  features: FeatureUpdate[];
}
