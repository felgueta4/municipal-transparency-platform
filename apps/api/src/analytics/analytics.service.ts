import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface VersionAdoptionItem {
  version: string;
  count: number;
  percentage: number;
}

export interface TimelineItem {
  date: string;
  count: number;
  versions: string[];
}

export interface MunicipalityStatusItem {
  municipalityId: string;
  municipalityName: string;
  currentVersion: string | null;
  latestVersion: string;
  status: 'up_to_date' | 'outdated' | 'no_version';
  daysOutdated: number | null;
}

export interface UpdateFrequencyItem {
  municipalityId: string;
  municipalityName: string;
  totalUpdates: number;
  averageDaysBetweenUpdates: number | null;
  lastUpdateDate: string | null;
}

export interface VersionComparisonItem {
  version: string;
  municipalityCount: number;
  adoptionRate: number;
  firstUsedAt: string | null;
  lastUsedAt: string | null;
}

export interface DashboardSummary {
  totalMunicipalities: number;
  totalVersions: number;
  latestVersion: string | null;
  municipalitiesUpToDate: number;
  municipalitiesOutdated: number;
  municipalitiesNoVersion: number;
  totalVersionUpdates: number;
  averageUpdateFrequency: number | null;
}

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get version adoption statistics
   * Returns how many municipalities are using each version
   */
  async getVersionAdoption(): Promise<VersionAdoptionItem[]> {
    // Get all municipalities with their current version
    const municipalities = await this.prisma.municipality.findMany({
      select: {
        softwareVersion: true,
      },
    });

    const totalMunicipalities = municipalities.length;

    // Count municipalities per version
    const versionCounts = municipalities.reduce((acc, muni) => {
      const version = muni.softwareVersion || 'sin_version';
      acc[version] = (acc[version] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Convert to array and calculate percentages
    const adoption = Object.entries(versionCounts).map(([version, count]) => ({
      version,
      count,
      percentage: totalMunicipalities > 0 ? (count / totalMunicipalities) * 100 : 0,
    }));

    // Sort by count descending
    adoption.sort((a, b) => b.count - a.count);

    return adoption;
  }

  /**
   * Get timeline of version updates over time
   * Aggregates version_history by date
   */
  async getVersionTimeline(
    startDate?: Date,
    endDate?: Date,
  ): Promise<TimelineItem[]> {
    const where: any = {};

    if (startDate || endDate) {
      where.updatedAt = {};
      if (startDate) where.updatedAt.gte = startDate;
      if (endDate) where.updatedAt.lte = endDate;
    }

    const history = await this.prisma.versionHistory.findMany({
      where,
      select: {
        updatedAt: true,
        toVersion: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
    });

    // Group by date (YYYY-MM-DD)
    const timelineMap = history.reduce((acc, item) => {
      const date = item.updatedAt.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { count: 0, versions: new Set<string>() };
      }
      acc[date].count++;
      acc[date].versions.add(item.toVersion);
      return acc;
    }, {} as Record<string, { count: number; versions: Set<string> }>);

    // Convert to array
    const timeline = Object.entries(timelineMap).map(([date, data]) => ({
      date,
      count: data.count,
      versions: Array.from(data.versions),
    }));

    return timeline;
  }

  /**
   * Get municipality version status
   * Compares each municipality's version with latest stable
   */
  async getMunicipalityStatus(): Promise<MunicipalityStatusItem[]> {
    // Get latest stable version
    const latestVersion = await this.prisma.softwareVersion.findFirst({
      where: { status: 'stable' },
      orderBy: { releaseDate: 'desc' },
      select: { version: true, releaseDate: true },
    });

    if (!latestVersion) {
      throw new Error('No se encontró una versión estable');
    }

    // Get all municipalities with their current version
    const municipalities = await this.prisma.municipality.findMany({
      select: {
        id: true,
        name: true,
        softwareVersion: true,
        versionHistory: {
          orderBy: { updatedAt: 'desc' },
          take: 1,
          select: { updatedAt: true },
        },
      },
    });

    // Calculate status for each municipality
    const statuses = municipalities.map((muni) => {
      let status: 'up_to_date' | 'outdated' | 'no_version';
      let daysOutdated: number | null = null;

      if (!muni.softwareVersion) {
        status = 'no_version';
      } else if (muni.softwareVersion === latestVersion.version) {
        status = 'up_to_date';
      } else {
        status = 'outdated';
        // Calculate days since latest version release
        const lastUpdate = muni.versionHistory[0]?.updatedAt || new Date();
        const daysDiff = Math.floor(
          (new Date().getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24),
        );
        daysOutdated = daysDiff;
      }

      return {
        municipalityId: muni.id,
        municipalityName: muni.name,
        currentVersion: muni.softwareVersion,
        latestVersion: latestVersion.version,
        status,
        daysOutdated,
      };
    });

    return statuses;
  }

  /**
   * Get update frequency statistics
   * Calculate average time between updates per municipality
   */
  async getUpdateFrequency(): Promise<UpdateFrequencyItem[]> {
    const municipalities = await this.prisma.municipality.findMany({
      select: {
        id: true,
        name: true,
        versionHistory: {
          orderBy: { updatedAt: 'desc' },
          select: { updatedAt: true },
        },
      },
    });

    const frequencies = municipalities.map((muni) => {
      const historyCount = muni.versionHistory.length;
      let averageDaysBetweenUpdates: number | null = null;
      let lastUpdateDate: string | null = null;

      if (historyCount > 0) {
        lastUpdateDate = muni.versionHistory[0].updatedAt.toISOString();

        if (historyCount > 1) {
          // Calculate intervals between updates
          const intervals: number[] = [];
          for (let i = 0; i < historyCount - 1; i++) {
            const newer = muni.versionHistory[i].updatedAt.getTime();
            const older = muni.versionHistory[i + 1].updatedAt.getTime();
            const daysDiff = (newer - older) / (1000 * 60 * 60 * 24);
            intervals.push(daysDiff);
          }

          // Calculate average
          averageDaysBetweenUpdates =
            intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
        }
      }

      return {
        municipalityId: muni.id,
        municipalityName: muni.name,
        totalUpdates: historyCount,
        averageDaysBetweenUpdates,
        lastUpdateDate,
      };
    });

    return frequencies;
  }

  /**
   * Compare versions
   * Detailed stats per version
   */
  async getVersionComparison(): Promise<VersionComparisonItem[]> {
    // Get all versions
    const versions = await this.prisma.softwareVersion.findMany({
      select: {
        version: true,
      },
      orderBy: {
        releaseDate: 'desc',
      },
    });

    // Get total municipalities
    const totalMunicipalities = await this.prisma.municipality.count();

    // Get version usage and history
    const comparisons = await Promise.all(
      versions.map(async (v) => {
        // Count municipalities using this version
        const municipalityCount = await this.prisma.municipality.count({
          where: { softwareVersion: v.version },
        });

        // Get first and last usage from history
        const firstUsage = await this.prisma.versionHistory.findFirst({
          where: { toVersion: v.version },
          orderBy: { updatedAt: 'asc' },
          select: { updatedAt: true },
        });

        const lastUsage = await this.prisma.versionHistory.findFirst({
          where: { toVersion: v.version },
          orderBy: { updatedAt: 'desc' },
          select: { updatedAt: true },
        });

        return {
          version: v.version,
          municipalityCount,
          adoptionRate:
            totalMunicipalities > 0
              ? (municipalityCount / totalMunicipalities) * 100
              : 0,
          firstUsedAt: firstUsage?.updatedAt.toISOString() || null,
          lastUsedAt: lastUsage?.updatedAt.toISOString() || null,
        };
      }),
    );

    return comparisons;
  }

  /**
   * Get overall dashboard summary
   * Key metrics for dashboard overview
   */
  async getDashboardSummary(): Promise<DashboardSummary> {
    // Get basic counts
    const totalMunicipalities = await this.prisma.municipality.count();
    const totalVersions = await this.prisma.softwareVersion.count();

    // Get latest stable version
    const latestVersion = await this.prisma.softwareVersion.findFirst({
      where: { status: 'stable' },
      orderBy: { releaseDate: 'desc' },
      select: { version: true },
    });

    // Get municipality statuses
    const municipalities = await this.prisma.municipality.findMany({
      select: {
        softwareVersion: true,
      },
    });

    let municipalitiesUpToDate = 0;
    let municipalitiesOutdated = 0;
    let municipalitiesNoVersion = 0;

    municipalities.forEach((muni) => {
      if (!muni.softwareVersion) {
        municipalitiesNoVersion++;
      } else if (muni.softwareVersion === latestVersion?.version) {
        municipalitiesUpToDate++;
      } else {
        municipalitiesOutdated++;
      }
    });

    // Get total version updates
    const totalVersionUpdates = await this.prisma.versionHistory.count();

    // Get average update frequency
    const frequencies = await this.getUpdateFrequency();
    const validFrequencies = frequencies.filter(
      (f) => f.averageDaysBetweenUpdates !== null,
    );
    const averageUpdateFrequency =
      validFrequencies.length > 0
        ? validFrequencies.reduce(
            (sum, f) => sum + (f.averageDaysBetweenUpdates || 0),
            0,
          ) / validFrequencies.length
        : null;

    return {
      totalMunicipalities,
      totalVersions,
      latestVersion: latestVersion?.version || null,
      municipalitiesUpToDate,
      municipalitiesOutdated,
      municipalitiesNoVersion,
      totalVersionUpdates,
      averageUpdateFrequency,
    };
  }
}
