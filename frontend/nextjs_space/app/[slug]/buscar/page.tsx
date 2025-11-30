
'use client'

import { useParams } from 'next/navigation'

import { AIChat } from '@/components/ai-chat'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, FileText, Briefcase, Users, Sparkles, Bot } from 'lucide-react'
import Link from 'next/link'

export default function SearchPage() {
  const params = useParams()
  const slug = params.slug as string
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Bot className="h-10 w-10 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Búsqueda Inteligente con IA
          </h1>
        </div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2">
          Haz preguntas en lenguaje natural sobre presupuestos, gastos, proyectos y contratos municipales.
        </p>
        <p className="text-sm text-blue-600 font-medium flex items-center justify-center gap-2">
          <Sparkles className="h-4 w-4" />
          Impulsado por Inteligencia Artificial
        </p>
      </div>

      {/* AI Chat Component */}
      <div className="max-w-4xl mx-auto mb-16">
        <AIChat 
          placeholder="Pregunta sobre presupuestos, gastos, proyectos o contratos..."
          title="Asistente de Transparencia Municipal"
          description="Obtén respuestas instantáneas sobre información municipal en lenguaje natural"
        />
      </div>

      {/* Examples Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-6">Ejemplos de Preguntas</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 italic">
                "¿Cuál es el presupuesto total asignado para educación este año?"
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-600">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 italic">
                "Muéstrame los gastos del último trimestre ordenados por monto"
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-600">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 italic">
                "¿Qué proyectos de infraestructura están actualmente en ejecución?"
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-orange-600">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 italic">
                "Lista los contratos vigentes con proveedores de servicios"
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-6">¿Qué puedes consultar?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Presupuestos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Montos por categoría</li>
                <li>• Comparativas anuales</li>
                <li>• Distribución sectorial</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <FileText className="h-12 w-12 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Gastos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Ejecución presupuestaria</li>
                <li>• Gastos por período</li>
                <li>• Análisis de categorías</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Briefcase className="h-12 w-12 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Proyectos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Estado de avance</li>
                <li>• Inversión por proyecto</li>
                <li>• Plazos de ejecución</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-12 w-12 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Contratos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1 text-left">
                <li>• Proveedores activos</li>
                <li>• Montos contratados</li>
                <li>• Vigencia y plazos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Browse Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">O explora directamente por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <Link href={`/${slug}/presupuestos`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
              <CardContent className="p-4">
                <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-sm">Presupuestos</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${slug}/gastos`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
              <CardContent className="p-4">
                <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-sm">Gastos</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${slug}/proyectos`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
              <CardContent className="p-4">
                <Briefcase className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-sm">Proyectos</p>
              </CardContent>
            </Card>
          </Link>

          <Link href={`/${slug}/contratos`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer text-center">
              <CardContent className="p-4">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <p className="font-medium text-sm">Contratos</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
