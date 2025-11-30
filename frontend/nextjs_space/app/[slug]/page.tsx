
'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { KPICard } from '@/components/kpi-card'
import { AdvancedChart } from '@/components/advanced-chart'
import { 
  TrendingUp, 
  FileText, 
  Briefcase, 
  Users,
  DollarSign,
  ArrowRight,
  Download,
  Search,
  MessageSquare
} from 'lucide-react'
import { formatCLP, formatNumber } from '@/lib/utils'

interface Stats {
  totalBudget: number
  totalExpenditures: number
  activeProjects: number
  totalContracts: number
}

export default function CiudadanoHomePage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [stats, setStats] = useState<Stats>({
    totalBudget: 0,
    totalExpenditures: 0,
    activeProjects: 0,
    totalContracts: 0
  })
  const [budgetData, setBudgetData] = useState<any[]>([])
  const [expenditureData, setExpenditureData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadPublicData()
  }, [])

  const loadPublicData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch from API routes - all data comes from the database (admin portal is source of truth)
      const [budgetsRes, expendituresRes, projectsRes, contractsRes] = await Promise.all([
        fetch('/api/budgets', { cache: 'no-store' }),
        fetch('/api/expenditures', { cache: 'no-store' }),
        fetch('/api/projects', { cache: 'no-store' }),
        fetch('/api/contracts', { cache: 'no-store' })
      ])

      if (!budgetsRes.ok || !expendituresRes.ok || !projectsRes.ok || !contractsRes.ok) {
        console.error('Error fetching data from database')
        throw new Error('No se pudo conectar con la base de datos')
      }

      const budgets = await budgetsRes.json()
      const expenditures = await expendituresRes.json()
      const projects = await projectsRes.json()
      const contracts = await contractsRes.json()

      // Calcular estadísticas
      const totalBudget = budgets?.reduce((sum: number, b: any) => sum + (b?.totalAmount || b?.amountPlanned || 0), 0) || 0
      const totalExpenditures = expenditures?.reduce((sum: number, e: any) => sum + (e?.amount || e?.amountActual || 0), 0) || 0
      const activeProjects = projects?.filter((p: any) => 
        p?.status?.toLowerCase() === 'activo' || 
        p?.status?.toLowerCase() === 'en_progreso'
      )?.length || 0

      setStats({
        totalBudget,
        totalExpenditures,
        activeProjects,
        totalContracts: contracts?.length || 0
      })

      // Preparar datos para gráficos
      // Gráfico de presupuestos por año
      const budgetByYear: { [key: string]: number } = {}
      budgets?.forEach((budget: any) => {
        const year = budget?.year || budget?.fiscalYearId || '2024'
        budgetByYear[year] = (budgetByYear[year] || 0) + (budget?.totalAmount || budget?.amountPlanned || 0)
      })
      
      const budgetChartData = Object.entries(budgetByYear).map(([year, amount]) => ({
        name: year,
        value: amount,
        formattedValue: formatCLP(amount)
      })).sort((a, b) => a.name.localeCompare(b.name))
      
      setBudgetData(budgetChartData)

      // Gráfico de gastos por categoría
      const expenditureByCategory: { [key: string]: number } = {}
      expenditures?.forEach((exp: any) => {
        const category = exp?.category || 'Sin categoría'
        expenditureByCategory[category] = (expenditureByCategory[category] || 0) + (exp?.amount || exp?.amountActual || 0)
      })
      
      const expenditureChartData = Object.entries(expenditureByCategory)
        .map(([category, amount]) => ({
          name: category,
          value: amount,
          formattedValue: formatCLP(amount)
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 6) // Top 6 categorías
      
      setExpenditureData(expenditureChartData)

    } catch (error) {
      console.error('Error loading public data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Portal de Transparencia Municipal
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Accede a la información financiera de tu municipalidad en tiempo real
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${slug}/consultas`}>
                <Button size="lg" variant="secondary" className="gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Consulta con IA
                </Button>
              </Link>
              <Link href={`/${slug}/buscar`}>
                <Button size="lg" variant="outline" className="gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30">
                  <Search className="h-5 w-5" />
                  Buscar Información
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard
            title="Presupuesto Total"
            value={isLoading ? '...' : formatCLP(stats.totalBudget)}
            subtitle="Presupuesto municipal actual"
            icon={DollarSign}
            color="blue"
            onClick={() => window.location.href = `/${slug}/presupuestos`}
          />
          
          <KPICard
            title="Gastos Ejecutados"
            value={isLoading ? '...' : formatCLP(stats.totalExpenditures)}
            subtitle="Total de gastos registrados"
            icon={FileText}
            color="green"
            onClick={() => window.location.href = `/${slug}/gastos`}
          />
          
          <KPICard
            title="Proyectos Activos"
            value={isLoading ? '...' : formatNumber(stats.activeProjects)}
            subtitle="Proyectos en ejecución"
            icon={Briefcase}
            color="purple"
            onClick={() => window.location.href = `/${slug}/proyectos`}
          />
          
          <KPICard
            title="Contratos Vigentes"
            value={isLoading ? '...' : formatNumber(stats.totalContracts)}
            subtitle="Contratos registrados"
            icon={Users}
            color="orange"
            onClick={() => window.location.href = `/${slug}/contratos`}
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdvancedChart
            title="Presupuesto por Año"
            data={budgetData}
            type="bar"
            dataKey="value"
            xAxisKey="name"
            height={350}
          />
          
          <AdvancedChart
            title="Gastos por Categoría"
            data={expenditureData}
            type="pie"
            dataKey="value"
            height={350}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Explora la Información
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            title="Presupuestos"
            description="Consulta cómo se distribuyen los recursos públicos de tu municipio por área y programa"
            icon={TrendingUp}
            href={`/${slug}/presupuestos`}
            color="bg-blue-500"
          />
          
          <FeatureCard
            title="Gastos"
            description="Revisa el detalle de los gastos ejecutados por tu municipio de forma transparente"
            icon={FileText}
            href={`/${slug}/gastos`}
            color="bg-green-500"
          />
          
          <FeatureCard
            title="Proyectos"
            description="Conoce las obras e iniciativas en ejecución, su avance y presupuesto asignado"
            icon={Briefcase}
            href={`/${slug}/proyectos`}
            color="bg-purple-500"
          />
          
          <FeatureCard
            title="Contratos"
            description="Accede al registro de empresas y personas que prestan servicios al municipio"
            icon={Users}
            href={`/${slug}/contratos`}
            color="bg-orange-500"
          />
          
          <FeatureCard
            title="Consultas IA"
            description="Pregunta en lenguaje natural sobre cualquier dato"
            icon={MessageSquare}
            href={`/${slug}/consultas`}
            color="bg-indigo-500"
          />
          
          <FeatureCard
            title="Participación"
            description="Envía tus comentarios y sugerencias"
            icon={Users}
            href={`/${slug}/participacion`}
            color="bg-pink-500"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Tienes alguna pregunta?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Usa nuestro asistente con IA para obtener respuestas instantáneas
          </p>
          <Link href={`/${slug}/consultas`}>
            <Button size="lg" variant="secondary" className="gap-2">
              Consultar Ahora
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  href, 
  color 
}: { 
  title: string
  description: string
  icon: any
  href: string
  color: string
}) {
  return (
    <Link href={href}>
      <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 hover:border-blue-300">
        <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <div className="flex items-center text-blue-600 font-medium group-hover:gap-2 transition-all">
          Ver más
          <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

