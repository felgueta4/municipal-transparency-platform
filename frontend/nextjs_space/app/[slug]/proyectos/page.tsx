
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Briefcase, Calendar, DollarSign, Search, Clock, CheckCircle } from 'lucide-react'
import { projectApi } from '@/lib/api'
import { formatCLP, formatDate, getStatusColor } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function ProyectosPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#FF6363', '#80D8C3']

  useEffect(() => {
    loadProjects()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [projects, searchTerm, statusFilter])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      const data = await projectApi.getAll()
      setProjects(data || [])
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project?.status === statusFilter)
    }

    setFilteredProjects(filtered)
  }

  const getStatuses = () => {
    const statuses = [...new Set(projects.map(project => project?.status).filter(Boolean))]
    return statuses.sort()
  }

  const getStatusData = () => {
    const statusData = projects.reduce((acc: any, project: any) => {
      const status = project?.status || 'Sin estado'
      if (!acc[status]) {
        acc[status] = 0
      }
      acc[status] += 1
      return acc
    }, {})

    return Object.entries(statusData).map(([status, count]: [string, any]) => ({
      name: status,
      value: count
    }))
  }

  const getBudgetRangeData = () => {
    const ranges = [
      { label: '< 50M', min: 0, max: 50000000 },
      { label: '50M - 100M', min: 50000000, max: 100000000 },
      { label: '100M - 500M', min: 100000000, max: 500000000 },
      { label: '> 500M', min: 500000000, max: Infinity }
    ]

    return ranges.map(range => ({
      rango: range.label,
      proyectos: projects.filter(project => 
        project?.budget >= range.min && project?.budget < range.max
      ).length
    }))
  }

  const totalBudget = projects.reduce((sum, project) => sum + (project?.budget || 0), 0)
  const activeProjects = projects.filter(project => 
    project?.status?.toLowerCase() === 'activo' || 
    project?.status?.toLowerCase() === 'en_progreso' ||
    project?.status?.toLowerCase() === 'en progreso'
  ).length
  const completedProjects = projects.filter(project => 
    project?.status?.toLowerCase() === 'completado' ||
    project?.status?.toLowerCase() === 'finalizado'
  ).length

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map(i => (
              <div key={i} className="h-64 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Proyectos Municipales</h1>
        <p className="text-lg text-gray-600">
          Conoce los proyectos municipales en desarrollo y completados
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Proyectos</p>
                <p className="text-2xl font-bold text-blue-600">{projects.length}</p>
              </div>
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proyectos Activos</p>
                <p className="text-2xl font-bold text-green-600">{activeProjects}</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proyectos Completados</p>
                <p className="text-2xl font-bold text-purple-600">{completedProjects}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Inversión Total</p>
                <p className="text-2xl font-bold text-orange-600">{formatCLP(totalBudget)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Proyectos por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getStatusData()}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {getStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {getStatusData().map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proyectos por Rango de Presupuesto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getBudgetRangeData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="rango" 
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <YAxis 
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                />
                <Bar dataKey="proyectos" fill={COLORS[3]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar proyectos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {getStatuses().map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-600 flex items-center">
              Mostrando {filteredProjects.length} de {projects.length} proyectos
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Presupuesto: {formatCLP(project.budget)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Inicio: {formatDate(project.startDate)}
                      </span>
                      {project.endDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Fin: {formatDate(project.endDate)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold text-blue-600">
                      {formatCLP(project.budget)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {project.status}
                    </div>
                    {project.startDate && (
                      <div className="text-xs text-gray-400 mt-1">
                        Desde {formatDate(project.startDate)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Progress indicator */}
                {project.status && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Estado del proyecto</span>
                      <span className="font-medium">{project.status}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-gray-600">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Intenta ajustar los filtros de búsqueda'
                  : 'No hay proyectos públicos disponibles en este momento'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
