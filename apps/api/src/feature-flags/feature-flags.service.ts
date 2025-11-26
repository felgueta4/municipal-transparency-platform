import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFeatureFlagDto } from './dto/create-feature-flag.dto';
import { UpdateFeatureFlagDto } from './dto/update-feature-flag.dto';
import { UpdateMunicipalityFeaturesDto } from './dto/update-municipality-features.dto';
import { BulkUpdateFeaturesDto } from './dto/bulk-update-features.dto';

@Injectable()
export class FeatureFlagsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get all feature flags
   */
  async findAll() {
    return this.prisma.featureFlag.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        municipalityFeatures: {
          include: {
            municipality: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
  }

  /**
   * Get a single feature flag by ID
   */
  async findOne(id: string) {
    const featureFlag = await this.prisma.featureFlag.findUnique({
      where: { id },
      include: {
        municipalityFeatures: {
          include: {
            municipality: {
              select: { id: true, name: true },
            },
            user: {
              select: { id: true, email: true },
            },
          },
        },
      },
    });

    if (!featureFlag) {
      throw new NotFoundException(
        `No se encontró la feature flag con ID ${id}`,
      );
    }

    return featureFlag;
  }

  /**
   * Create a new feature flag
   */
  async create(createDto: CreateFeatureFlagDto) {
    // Check if key already exists
    const existing = await this.prisma.featureFlag.findUnique({
      where: { key: createDto.key },
    });

    if (existing) {
      throw new ConflictException(
        `Ya existe una feature flag con la clave "${createDto.key}"`,
      );
    }

    return this.prisma.featureFlag.create({
      data: createDto,
    });
  }

  /**
   * Update an existing feature flag
   */
  async update(id: string, updateDto: UpdateFeatureFlagDto) {
    // Check if feature flag exists
    await this.findOne(id);

    return this.prisma.featureFlag.update({
      where: { id },
      data: updateDto,
    });
  }

  /**
   * Delete a feature flag
   */
  async remove(id: string) {
    // Check if feature flag exists
    await this.findOne(id);

    return this.prisma.featureFlag.delete({
      where: { id },
    });
  }

  /**
   * Get features for a specific municipality
   * Returns all feature flags with their enabled status for the municipality
   * If no municipality_features record exists, use default_enabled value
   */
  async getMunicipalityFeatures(municipalityId: string) {
    // Verify municipality exists
    const municipality = await this.prisma.municipality.findUnique({
      where: { id: municipalityId },
    });

    if (!municipality) {
      throw new NotFoundException(
        `No se encontró la municipalidad con ID ${municipalityId}`,
      );
    }

    // Get all feature flags
    const allFlags = await this.prisma.featureFlag.findMany({
      orderBy: { key: 'asc' },
    });

    // Get municipality-specific overrides
    const overrides = await this.prisma.municipalityFeature.findMany({
      where: { municipalityId },
      include: {
        featureFlag: true,
        user: {
          select: { id: true, email: true },
        },
      },
    });

    // Create a map of overrides
    const overrideMap = new Map(
      overrides.map((o) => [o.featureFlagId, o]),
    );

    // Combine flags with overrides
    const features = allFlags.map((flag) => {
      const override = overrideMap.get(flag.id);
      return {
        id: flag.id,
        key: flag.key,
        name: flag.name,
        description: flag.description,
        defaultEnabled: flag.defaultEnabled,
        enabled: override ? override.enabled : flag.defaultEnabled,
        isOverride: !!override,
        updatedBy: override?.user
          ? { id: override.user.id, email: override.user.email }
          : null,
        updatedAt: override?.updatedAt || null,
      };
    });

    return {
      municipalityId,
      municipalityName: municipality.name,
      features,
    };
  }

  /**
   * Update features for a specific municipality
   */
  async updateMunicipalityFeatures(
    municipalityId: string,
    updateDto: UpdateMunicipalityFeaturesDto,
    userId: string,
  ) {
    // Verify municipality exists
    const municipality = await this.prisma.municipality.findUnique({
      where: { id: municipalityId },
    });

    if (!municipality) {
      throw new NotFoundException(
        `No se encontró la municipalidad con ID ${municipalityId}`,
      );
    }

    // Verify feature flag exists
    const featureFlag = await this.prisma.featureFlag.findUnique({
      where: { key: updateDto.featureFlagKey },
    });

    if (!featureFlag) {
      throw new NotFoundException(
        `No se encontró la feature flag con clave "${updateDto.featureFlagKey}"`,
      );
    }

    // Upsert municipality feature
    const result = await this.prisma.municipalityFeature.upsert({
      where: {
        municipalityId_featureFlagId: {
          municipalityId,
          featureFlagId: featureFlag.id,
        },
      },
      update: {
        enabled: updateDto.enabled,
        updatedBy: userId,
        updatedAt: new Date(),
      },
      create: {
        municipalityId,
        featureFlagId: featureFlag.id,
        enabled: updateDto.enabled,
        updatedBy: userId,
      },
      include: {
        featureFlag: true,
        municipality: {
          select: { id: true, name: true },
        },
      },
    });

    return result;
  }

  /**
   * Bulk update features for multiple municipalities
   */
  async bulkUpdateFeatures(bulkDto: BulkUpdateFeaturesDto, userId: string) {
    // Verify all municipalities exist
    const municipalities = await this.prisma.municipality.findMany({
      where: { id: { in: bulkDto.municipalityIds } },
      select: { id: true, name: true },
    });

    if (municipalities.length !== bulkDto.municipalityIds.length) {
      const foundIds = municipalities.map((m) => m.id);
      const missingIds = bulkDto.municipalityIds.filter(
        (id) => !foundIds.includes(id),
      );
      throw new BadRequestException(
        `No se encontraron las siguientes municipalidades: ${missingIds.join(', ')}`,
      );
    }

    // Verify all feature flags exist
    const featureKeys = bulkDto.features.map((f) => f.featureFlagKey);
    const featureFlags = await this.prisma.featureFlag.findMany({
      where: { key: { in: featureKeys } },
    });

    if (featureFlags.length !== featureKeys.length) {
      const foundKeys = featureFlags.map((f) => f.key);
      const missingKeys = featureKeys.filter((key) => !foundKeys.includes(key));
      throw new BadRequestException(
        `No se encontraron las siguientes feature flags: ${missingKeys.join(', ')}`,
      );
    }

    // Create a map of feature flag keys to IDs
    const flagMap = new Map(featureFlags.map((f) => [f.key, f.id]));

    // Perform bulk upsert
    const operations = [];
    for (const municipalityId of bulkDto.municipalityIds) {
      for (const feature of bulkDto.features) {
        const featureFlagId = flagMap.get(feature.featureFlagKey);
        operations.push(
          this.prisma.municipalityFeature.upsert({
            where: {
              municipalityId_featureFlagId: {
                municipalityId,
                featureFlagId,
              },
            },
            update: {
              enabled: feature.enabled,
              updatedBy: userId,
              updatedAt: new Date(),
            },
            create: {
              municipalityId,
              featureFlagId,
              enabled: feature.enabled,
              updatedBy: userId,
            },
          }),
        );
      }
    }

    // Execute all operations in a transaction
    const results = await this.prisma.$transaction(operations);

    return {
      success: true,
      updatedCount: results.length,
      municipalitiesCount: bulkDto.municipalityIds.length,
      featuresCount: bulkDto.features.length,
      message: `Se actualizaron ${results.length} configuraciones de features para ${bulkDto.municipalityIds.length} municipalidades`,
    };
  }
}
