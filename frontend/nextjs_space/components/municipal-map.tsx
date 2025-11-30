
'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Loader2, MapPin, Search, Filter } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Cargar el componente del mapa solo en el cliente
const LeafletMapView = dynamic(
  () => import('./leaflet-map-view').then((mod) => mod.LeafletMapView),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] rounded-lg overflow-hidden border bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
    )
  }
)

interface MapProject {
  id: string
  name: string
  description: string
  category: string
  latitude: number
  longitude: number
  progress: number
  amount: number
  comuna: string
  isActive: boolean
}

const categoryColors: Record<string, string> = {
  Infraestructura: 'bg-blue-500',
  Cultura: 'bg-purple-500',
  Seguridad: 'bg-orange-500',
  Salud: 'bg-green-500',
  Educación: 'bg-yellow-500',
  Deporte: 'bg-red-500',
}

export function MunicipalMap() {
  const [projects, setProjects] = useState<MapProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<MapProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedComuna, setSelectedComuna] = useState('Renca')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted) {
      fetchProjects()
    }
  }, [selectedComuna, isMounted])

  useEffect(() => {
    filterProjects()
  }, [projects, selectedCategory, searchTerm])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/map-projects?comuna=${selectedComuna}&public=true`)
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
        setFilteredProjects(data)
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProjects(filtered)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const categories = ['all', ...Array.from(new Set(projects.map(p => p.category)))]

  // Centro del mapa para Renca, Chile
  const mapCenter: [number, number] = [-33.4028, -70.7345]

  if (!isMounted || isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            Mapa Comunal - {selectedComuna}
          </CardTitle>
          <CardDescription>
            Explora los proyectos municipales georreferenciados en tu comuna
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filtros */}
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
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.filter(cat => cat !== 'all').map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={fetchProjects} variant="outline">
              Actualizar Mapa
            </Button>
          </div>

          {/* Mapa */}
          <div className="h-[500px] rounded-lg overflow-hidden border">
            <LeafletMapView 
              projects={filteredProjects}
              mapCenter={mapCenter}
              categoryColors={categoryColors}
              formatCurrency={formatCurrency}
            />
          </div>

          {/* Leyenda */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-semibold mr-2">Leyenda:</span>
            {Object.entries(categoryColors).map(([category, color]) => (
              <Badge key={category} className={color}>
                {category}
              </Badge>
            ))}
          </div>

          {/* Resumen */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{filteredProjects.length}</p>
              <p className="text-sm text-gray-600">Proyectos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {Math.round(filteredProjects.reduce((acc, p) => acc + p.progress, 0) / filteredProjects.length || 0)}%
              </p>
              <p className="text-sm text-gray-600">Avance Promedio</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {formatCurrency(filteredProjects.reduce((acc, p) => acc + p.amount, 0))}
              </p>
              <p className="text-sm text-gray-600">Inversión Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">{categories.length - 1}</p>
              <p className="text-sm text-gray-600">Categorías</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
