export type Expense = {
  id: string
  amount: number
  category: string
  description: string
  date: Date
}

export type ExpenseFormData = Omit<Expense, 'id' | 'date'> & {
  date: string
}

export const EXPENSE_CATEGORIES = [
  'Food',
  'Transportation',
  'Housing',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Education',
  'Other'
] as const

export type DateRange = {
  from: Date | undefined
  to: Date | undefined
}

// Version Management Types
export type SoftwareVersionStatus = 'draft' | 'stable' | 'deprecated'

export interface SoftwareVersion {
  id: string
  version: string
  name: string
  description: string | null
  changelog: string | null
  releaseDate: string
  status: SoftwareVersionStatus
  createdAt: string
  updatedAt: string
  _count?: {
    municipalities: number
  }
}

export interface VersionHistory {
  id: string
  municipalityId: string
  fromVersion: string | null
  toVersion: string
  updatedBy: string
  notes: string | null
  updatedAt: string
  municipality?: {
    id: string
    name: string
    slug: string
  }
  user?: {
    id: string
    fullName: string
    email: string
  }
  softwareVersion?: SoftwareVersion
}

export interface MunicipalityWithVersion {
  id: string
  slug: string
  name: string
  region: string
  comuna: string
  status: string
  plan: string
  softwareVersion: string | null
  updatedAt: string
  version?: SoftwareVersion
}

export interface CreateVersionDto {
  version: string
  name: string
  description?: string
  changelog?: string
  releaseDate: string
  status: SoftwareVersionStatus
}

export interface UpdateVersionDto {
  name?: string
  description?: string
  changelog?: string
  releaseDate?: string
  status?: SoftwareVersionStatus
}

export interface UpdateMunicipalityVersionDto {
  toVersion: string
  notes?: string
}

// ========================================
// PHASE 2: Notifications, Rollback, Analytics, Feature Flags Types
// ========================================

// Notifications Types
export type NotificationType = 'info' | 'warning' | 'success' | 'error' | 'update' | 'version_release'

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  municipalityId: string | null
  createdBy: string
  isRead: boolean
  readAt: string | null
  metadata: any | null
  createdAt: string
  updatedAt: string
  municipality?: {
    id: string
    name: string
    slug: string
  }
  creator?: {
    id: string
    fullName: string
    email: string
  }
}

export interface CreateNotificationDto {
  title: string
  message: string
  type: NotificationType
  municipalityId?: string
  metadata?: any
}

export interface UpdateNotificationDto {
  title?: string
  message?: string
  type?: NotificationType
  municipalityId?: string
  isRead?: boolean
  metadata?: any
}

export interface NotificationFilterDto {
  type?: NotificationType
  isRead?: boolean
  municipalityId?: string
  page?: number
  limit?: number
}

export interface BulkNotificationDto {
  title: string
  message: string
  type: NotificationType
  municipalityIds: string[]
  metadata?: any
}

export interface NotificationResponse {
  data: Notification[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Rollback Types
export interface RollbackValidation {
  canRollback: boolean
  previousVersion: string | null
  currentVersion: string
  message: string
  risks?: string[]
}

export interface PreviousVersionInfo {
  version: string
  name: string
  description: string | null
  releaseDate: string
}

export interface RollbackRequest {
  notes?: string
}

// Analytics Types
export interface VersionAdoptionItem {
  version: string
  count: number
  percentage: number
}

export interface TimelineItem {
  date: string
  count: number
}

export interface MunicipalityStatusItem {
  id: string
  name: string
  slug: string
  currentVersion: string | null
  latestVersion: string
  status: 'updated' | 'outdated' | 'unassigned'
  daysBehind?: number
}

export interface UpdateFrequencyItem {
  municipalityId: string
  municipalityName: string
  totalUpdates: number
  averageDaysBetweenUpdates: number | null
  lastUpdateDate: string | null
}

export interface VersionComparisonItem {
  version: string
  municipalities: number
  adoptionRate: number
}

export interface DashboardSummary {
  totalMunicipalities: number
  totalVersions: number
  latestVersion: string | null
  outdatedCount: number
  updatedCount: number
  recentUpdates: number
}

// Feature Flags Types
export interface FeatureFlag {
  id: string
  key: string
  name: string
  description: string | null
  defaultEnabled: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateFeatureFlagDto {
  key: string
  name: string
  description?: string
  defaultEnabled: boolean
}

export interface UpdateFeatureFlagDto {
  name?: string
  description?: string
  defaultEnabled?: boolean
}

export interface MunicipalityFeature {
  id: string
  municipalityId: string
  featureFlagId: string
  enabled: boolean
  updatedBy: string
  updatedAt: string
  featureFlag?: FeatureFlag
  municipality?: {
    id: string
    name: string
    slug: string
  }
}

export interface MunicipalityFeatureResponse {
  featureFlagKey: string
  featureFlagName: string
  description: string | null
  enabled: boolean
  source: 'override' | 'default'
}

export interface UpdateMunicipalityFeaturesDto {
  featureFlagKey: string
  enabled: boolean
}

export interface FeatureUpdate {
  key: string
  enabled: boolean
}

export interface BulkUpdateFeaturesDto {
  municipalityIds: string[]
  features: FeatureUpdate[]
}