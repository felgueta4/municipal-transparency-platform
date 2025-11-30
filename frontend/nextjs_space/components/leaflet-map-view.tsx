'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

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

interface LeafletMapViewProps {
  projects: MapProject[]
  mapCenter: [number, number]
  categoryColors: Record<string, string>
  formatCurrency: (amount: number) => string
}

export function LeafletMapView({ projects, mapCenter, categoryColors, formatCurrency }: LeafletMapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    const initMap = async () => {
      // Importar Leaflet dinámicamente
      const L = (await import('leaflet')).default

      // Configurar iconos
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      // Crear el mapa
      const map = L.map(mapContainerRef.current!).setView(mapCenter, 14)

      // Agregar tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map)

      mapRef.current = map

      // Agregar marcadores
      projects.forEach((project) => {
        const marker = L.marker([project.latitude, project.longitude]).addTo(map)
        
        const categoryColor = categoryColors[project.category] || 'gray-500'
        const colorClass = categoryColor.replace('bg-', '')
        
        marker.bindPopup(`
          <div style="min-width: 250px; padding: 8px;">
            <h3 style="font-weight: bold; font-size: 1.125rem; margin-bottom: 8px;">${project.name}</h3>
            <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 0.875rem; margin-bottom: 8px; background-color: ${getCategoryBgColor(project.category)}; color: white;">
              ${project.category}
            </span>
            <p style="font-size: 0.875rem; color: #4b5563; margin-bottom: 8px;">${project.description}</p>
            <div style="font-size: 0.875rem;">
              <p style="font-weight: 600; margin-bottom: 4px;">Inversión: ${formatCurrency(project.amount)}</p>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #4b5563;">Avance:</span>
                <div style="flex: 1; background-color: #e5e7eb; border-radius: 9999px; height: 8px;">
                  <div style="background-color: #2563eb; height: 8px; border-radius: 9999px; width: ${project.progress}%;"></div>
                </div>
                <span style="font-weight: 600;">${project.progress}%</span>
              </div>
            </div>
          </div>
        `)
        
        markersRef.current.push(marker)
      })
    }

    initMap()

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      markersRef.current = []
    }
  }, [projects, mapCenter, categoryColors, formatCurrency])

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
}

function getCategoryBgColor(category: string): string {
  const colors: Record<string, string> = {
    Infraestructura: '#3b82f6',
    Cultura: '#a855f7',
    Seguridad: '#f97316',
    Salud: '#22c55e',
    Educación: '#eab308',
    Deporte: '#ef4444',
  }
  return colors[category] || '#6b7280'
}
