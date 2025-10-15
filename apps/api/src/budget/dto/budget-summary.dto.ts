
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export enum GroupBy {
  CATEGORY = 'category',
  DEPARTMENT = 'department',
}

export class BudgetSummaryDto {
  @ApiProperty({
    example: 2024,
    description: 'Año fiscal',
  })
  @IsInt()
  @Type(() => Number)
  year: number;

  @ApiProperty({
    example: 'category',
    enum: GroupBy,
    description: 'Agrupar por',
    required: false,
    default: 'category',
  })
  @IsOptional()
  @IsEnum(GroupBy)
  groupBy?: GroupBy = GroupBy.CATEGORY;
}
