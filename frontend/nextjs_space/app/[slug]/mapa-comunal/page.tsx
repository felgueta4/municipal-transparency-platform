
'use client'

import { useParams } from 'next/navigation'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2, ArrowLeft } from 'lucide-react'

// Cargar el componente del mapa solo en el cliente para evitar errores de SSR con Leaflet
const MunicipalMap = dynamic(
  () => import('@/components/municipal-map').then((mod) => mod.MunicipalMap),
  { 
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-lg shadow-sm border p-8 h-[600px] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Cargando mapa interactivo...</p>
        </div>
      </div>
    )
  }
)

export default function MapaComunalPage() {
  const params = useParams()
  const slug = params.slug as string
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Transparencia Municipal</span>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mapa Comunal Interactivo
          </h1>
          <p className="text-lg text-gray-600">
            Explora los proyectos municipales en desarrollo, sus ubicaciones, avances y montos de inversión.
            Todos los datos son públicos y actualizados regularmente por el equipo municipal.
          </p>
        </div>

        <MunicipalMap />

        {/* Información adicional */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-bold text-lg mb-2 text-blue-600">¿Cómo usar el mapa?</h3>
            <p className="text-sm text-gray-600">
              Haz clic en los marcadores del mapa para ver los detalles de cada proyecto. 
              Puedes filtrar por categoría o buscar proyectos específicos.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-bold text-lg mb-2 text-green-600">Datos actualizados</h3>
            <p className="text-sm text-gray-600">
              La información se actualiza periódicamente desde el sistema interno del municipio.
              Los datos incluyen avances reales de cada proyecto.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h3 className="font-bold text-lg mb-2 text-purple-600">Transparencia total</h3>
            <p className="text-sm text-gray-600">
              Todos los proyectos con inversión pública están disponibles para consulta ciudadana.
              La transparencia es nuestro compromiso.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Building2 className="h-6 w-6" />
              <span className="font-semibold">Transparencia Municipal</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="hover:text-blue-300">
                Inicio
              </Link>
              <Link href={`/${slug}/buscar`} className="hover:text-blue-300">
                Búsqueda
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
