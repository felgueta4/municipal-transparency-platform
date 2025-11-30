
export const API_BASE_URL = '/api'

interface ApiRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  token?: string | null
}

export async function apiRequest(endpoint: string, options: ApiRequestOptions = {}) {
  const { method = 'GET', body, token } = options
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  const config: RequestInit = {
    method,
    headers,
    // Disable cache to ensure fresh data from the database
    cache: 'no-store',
  }
  
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body)
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config)
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API Error (${response.status}): ${errorText}`)
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('❌ API request failed:', error)
    console.error(`   Endpoint: ${endpoint}`)
    console.error(`   Method: ${method}`)
    
    // NO fallback to demo data - all data MUST come from the database
    // This ensures the admin portal is the single source of truth
    throw error
  }
}

// Utility functions for common API operations
export const budgetApi = {
  getAll: (token?: string | null) => apiRequest('/budgets', { token }),
  create: (data: any, token?: string | null) => apiRequest('/budgets', { method: 'POST', body: data, token }),
  update: (id: string, data: any, token?: string | null) => apiRequest(`/budgets/${id}`, { method: 'PUT', body: data, token }),
  delete: (id: string, token?: string | null) => apiRequest(`/budgets/${id}`, { method: 'DELETE', token }),
  getById: (id: string, token?: string | null) => apiRequest(`/budgets/${id}`, { token }),
}

export const expenditureApi = {
  getAll: (token?: string | null) => apiRequest('/expenditures', { token }),
  create: (data: any, token?: string | null) => apiRequest('/expenditures', { method: 'POST', body: data, token }),
  update: (id: string, data: any, token?: string | null) => apiRequest(`/expenditures/${id}`, { method: 'PUT', body: data, token }),
  delete: (id: string, token?: string | null) => apiRequest(`/expenditures/${id}`, { method: 'DELETE', token }),
  getById: (id: string, token?: string | null) => apiRequest(`/expenditures/${id}`, { token }),
}

export const projectApi = {
  getAll: (token?: string | null) => apiRequest('/projects', { token }),
  create: (data: any, token?: string | null) => apiRequest('/projects', { method: 'POST', body: data, token }),
  update: (id: string, data: any, token?: string | null) => apiRequest(`/projects/${id}`, { method: 'PUT', body: data, token }),
  delete: (id: string, token?: string | null) => apiRequest(`/projects/${id}`, { method: 'DELETE', token }),
  getById: (id: string, token?: string | null) => apiRequest(`/projects/${id}`, { token }),
}

export const contractApi = {
  getAll: (token?: string | null) => apiRequest('/contracts', { token }),
  create: (data: any, token?: string | null) => apiRequest('/contracts', { method: 'POST', body: data, token }),
  update: (id: string, data: any, token?: string | null) => apiRequest(`/contracts/${id}`, { method: 'PUT', body: data, token }),
  delete: (id: string, token?: string | null) => apiRequest(`/contracts/${id}`, { method: 'DELETE', token }),
  getById: (id: string, token?: string | null) => apiRequest(`/contracts/${id}`, { token }),
}

export const fileUploadApi = {
  upload: (formData: FormData, token?: string | null) => {
    return fetch(`${API_BASE_URL}/file-uploads/upload`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
      },
      body: formData,
    })
  }
}

export const apiConnectorApi = {
  getAll: (token?: string | null) => apiRequest('/api-connectors', { token }),
  create: (data: any, token?: string | null) => apiRequest('/api-connectors', { method: 'POST', body: data, token }),
  update: (id: string, data: any, token?: string | null) => apiRequest(`/api-connectors/${id}`, { method: 'PUT', body: data, token }),
  delete: (id: string, token?: string | null) => apiRequest(`/api-connectors/${id}`, { method: 'DELETE', token }),
  getById: (id: string, token?: string | null) => apiRequest(`/api-connectors/${id}`, { token }),
}

// Version Management API
export const versionApi = {
  // Software Versions
  getAllVersions: (token?: string | null) => apiRequest('/versions', { token }),
  getVersionById: (id: string, token?: string | null) => apiRequest(`/versions/${id}`, { token }),
  getLatestVersion: (token?: string | null) => apiRequest('/versions/latest', { token }),
  createVersion: (data: any, token?: string | null) => apiRequest('/versions', { method: 'POST', body: data, token }),
  updateVersion: (id: string, data: any, token?: string | null) => apiRequest(`/versions/${id}`, { method: 'PATCH', body: data, token }),
  deleteVersion: (id: string, token?: string | null) => apiRequest(`/versions/${id}`, { method: 'DELETE', token }),
  
  // Municipality Versions
  getMunicipalityVersion: (municipalityId: string, token?: string | null) => 
    apiRequest(`/municipalities/${municipalityId}/version`, { token }),
  updateMunicipalityVersion: (municipalityId: string, data: any, token?: string | null) => 
    apiRequest(`/municipalities/${municipalityId}/version`, { method: 'PATCH', body: data, token }),
  getMunicipalityVersionHistory: (municipalityId: string, token?: string | null) => 
    apiRequest(`/municipalities/${municipalityId}/version-history`, { token }),
  
  // Version History
  getAllHistory: (token?: string | null) => apiRequest('/version-history', { token }),
  getHistoryByMunicipality: (municipalityId: string, token?: string | null) => 
    apiRequest(`/version-history/municipality/${municipalityId}`, { token }),
  getHistoryStatistics: (token?: string | null) => apiRequest('/version-history/statistics', { token }),
  
  // Rollback
  validateRollback: (versionId: string, token?: string | null) => 
    apiRequest(`/versions/${versionId}/validate-rollback`, { method: 'POST', token }),
  getPreviousVersion: (municipalityId: string, token?: string | null) => 
    apiRequest(`/municipalities/${municipalityId}/version/previous`, { token }),
  rollbackVersion: (municipalityId: string, data: any, token?: string | null) => 
    apiRequest(`/municipalities/${municipalityId}/version/rollback`, { method: 'POST', body: data, token }),
}

// Notifications API
export const notificationApi = {
  // List all notifications with filters
  getAll: (filters?: any, token?: string | null) => {
    const params = new URLSearchParams()
    if (filters?.type) params.append('type', filters.type)
    if (filters?.isRead !== undefined) params.append('isRead', String(filters.isRead))
    if (filters?.municipalityId) params.append('municipalityId', filters.municipalityId)
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))
    
    const query = params.toString() ? `?${params.toString()}` : ''
    return apiRequest(`/notifications${query}`, { token })
  },
  
  // Get single notification
  getById: (id: string, token?: string | null) => 
    apiRequest(`/notifications/${id}`, { token }),
  
  // Create notification
  create: (data: any, token?: string | null) => 
    apiRequest('/notifications', { method: 'POST', body: data, token }),
  
  // Update notification
  update: (id: string, data: any, token?: string | null) => 
    apiRequest(`/notifications/${id}`, { method: 'PATCH', body: data, token }),
  
  // Delete notification
  delete: (id: string, token?: string | null) => 
    apiRequest(`/notifications/${id}`, { method: 'DELETE', token }),
  
  // Get notifications by municipality
  getByMunicipality: (municipalityId: string, filters?: any, token?: string | null) => {
    const params = new URLSearchParams()
    if (filters?.page) params.append('page', String(filters.page))
    if (filters?.limit) params.append('limit', String(filters.limit))
    
    const query = params.toString() ? `?${params.toString()}` : ''
    return apiRequest(`/notifications/municipality/${municipalityId}${query}`, { token })
  },
  
  // Mark notification as read
  markAsRead: (id: string, token?: string | null) => 
    apiRequest(`/notifications/${id}/read`, { method: 'PATCH', token }),
  
  // Create bulk notifications
  createBulk: (data: any, token?: string | null) => 
    apiRequest('/notifications/bulk', { method: 'POST', body: data, token }),
  
  // Get unread count
  getUnreadCount: (municipalityId?: string, token?: string | null) => {
    const query = municipalityId ? `?municipalityId=${municipalityId}` : ''
    return apiRequest(`/notifications/unread/count${query}`, { token })
  },
}

// Analytics API
export const analyticsApi = {
  // Version adoption statistics
  getVersionAdoption: (token?: string | null) => 
    apiRequest('/analytics/versions/adoption', { token }),
  
  // Version timeline
  getVersionTimeline: (startDate?: string, endDate?: string, token?: string | null) => {
    const params = new URLSearchParams()
    if (startDate) params.append('startDate', startDate)
    if (endDate) params.append('endDate', endDate)
    
    const query = params.toString() ? `?${params.toString()}` : ''
    return apiRequest(`/analytics/versions/timeline${query}`, { token })
  },
  
  // Municipality status
  getMunicipalityStatus: (token?: string | null) => 
    apiRequest('/analytics/municipalities/status', { token }),
  
  // Update frequency
  getUpdateFrequency: (token?: string | null) => 
    apiRequest('/analytics/updates/frequency', { token }),
  
  // Version comparison
  getVersionComparison: (token?: string | null) => 
    apiRequest('/analytics/versions/comparison', { token }),
  
  // Dashboard summary
  getDashboardSummary: (token?: string | null) => 
    apiRequest('/analytics/dashboard/summary', { token }),
}

// Feature Flags API
export const featureFlagApi = {
  // List all feature flags
  getAll: (token?: string | null) => 
    apiRequest('/feature-flags', { token }),
  
  // Get single feature flag
  getById: (id: string, token?: string | null) => 
    apiRequest(`/feature-flags/${id}`, { token }),
  
  // Create feature flag
  create: (data: any, token?: string | null) => 
    apiRequest('/feature-flags', { method: 'POST', body: data, token }),
  
  // Update feature flag
  update: (id: string, data: any, token?: string | null) => 
    apiRequest(`/feature-flags/${id}`, { method: 'PATCH', body: data, token }),
  
  // Delete feature flag
  delete: (id: string, token?: string | null) => 
    apiRequest(`/feature-flags/${id}`, { method: 'DELETE', token }),
  
  // Get municipality features
  getMunicipalityFeatures: (municipalityId: string, token?: string | null) => 
    apiRequest(`/feature-flags/municipalities/${municipalityId}/features`, { token }),
  
  // Update municipality features
  updateMunicipalityFeatures: (municipalityId: string, data: any, token?: string | null) => 
    apiRequest(`/feature-flags/municipalities/${municipalityId}/features`, { method: 'PATCH', body: data, token }),
  
  // Bulk update features
  bulkUpdateFeatures: (data: any, token?: string | null) => 
    apiRequest('/feature-flags/municipalities/features/bulk', { method: 'POST', body: data, token }),
}
