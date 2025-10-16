
import { PartialType } from '@nestjs/swagger';
import { CreateConnectorConfigDto } from './create-connector-config.dto';

export class UpdateConnectorConfigDto extends PartialType(
  CreateConnectorConfigDto,
) {}
