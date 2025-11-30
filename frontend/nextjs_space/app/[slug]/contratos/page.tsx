
'use client'

import { useParams } from 'next/navigation'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Users, Calendar, DollarSign, Search, FileText, Building } from 'lucide-react'
import { contractApi } from '@/lib/api'
import { formatCLP, formatDate } from '@/lib/utils'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function ContratosPage() {
  const [contracts, setContracts] = useState<any[]>([])
  const [filteredContracts, setFilteredContracts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const COLORS = ['#60B5FF', '#FF9149', '#FF9898', '#FF90BB', '#FF6363', '#80D8C3']

  useEffect(() => {
    loadContracts()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [contracts, searchTerm])

  const loadContracts = async () => {
    try {
      setIsLoading(true)
      const data = await contractApi.getAll()
      setContracts(data || [])
    } catch (error) {
      console.error('Error loading contracts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = contracts

    if (searchTerm) {
      filtered = filtered.filter(contract =>
        contract?.contractNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract?.supplier?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contract?.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredContracts(filtered)
  }

  const getSupplierData = () => {
    const supplierData = contracts.reduce((acc: any, contract: any) => {
      const supplier = contract?.supplier || 'Sin proveedor'
      if (!acc[supplier]) {
        acc[supplier] = {
          count: 0,
          amount: 0
        }
      }
      acc[supplier].count += 1
      acc[supplier].amount += contract?.amount || 0
      return acc
    }, {})

    return Object.entries(supplierData)
      .map(([supplier, data]: [string, any]) => ({
        proveedor: supplier,
        contratos: data.count,
        monto: data.amount
      }))
      .sort((a, b) => b.monto - a.monto)
      .slice(0, 10)
  }

  const getAmountRangeData = () => {
    const ranges = [
      { label: '< 10M', min: 0, max: 10000000 },
      { label: '10M - 50M', min: 10000000, max: 50000000 },
      { label: '50M - 100M', min: 50000000, max: 100000000 },
      { label: '> 100M', min: 100000000, max: Infinity }
    ]

    return ranges.map(range => ({
      rango: range.label,
      contratos: contracts.filter(contract => 
        contract?.amount >= range.min && contract?.amount < range.max
      ).length
    }))
  }

  const getMonthlyData = () => {
    const monthlyData = contracts.reduce((acc: any, contract: any) => {
      const date = new Date(contract?.startDate || contract?.createdAt)
      const monthYear = date.toLocaleDateString('es-CL', { month: 'short', year: 'numeric' })
      if (!acc[monthYear]) {
        acc[monthYear] = {
          count: 0,
          amount: 0
        }
      }
      acc[monthYear].count += 1
      acc[monthYear].amount += contract?.amount || 0
      return acc
    }, {})

    return Object.entries(monthlyData)
      .slice(-6)
      .map(([month, data]: [string, any]) => ({
        mes: month,
        contratos: data.count,
        monto: data.amount
      }))
  }

  const totalAmount = contracts.reduce((sum, contract) => sum + (contract?.amount || 0), 0)
  const totalSuppliers = new Set(contracts.map(contract => contract?.supplier).filter(Boolean)).size
  const activeContracts = contracts.filter(contract => {
    const endDate = new Date(contract?.endDate)
    const now = new Date()
    return endDate > now
  }).length

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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contratos Municipales</h1>
        <p className="text-lg text-gray-600">
          Información sobre contratos y proveedores del municipio
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contratos</p>
                <p className="text-2xl font-bold text-blue-600">{contracts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contratos Activos</p>
                <p className="text-2xl font-bold text-green-600">{activeContracts}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proveedores</p>
                <p className="text-2xl font-bold text-purple-600">{totalSuppliers}</p>
              </div>
              <Building className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-orange-600">{formatCLP(totalAmount)}</p>
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
            <CardTitle>Top 10 Proveedores por Monto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getSupplierData()} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="proveedor" 
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  height={60}
                  angle={-45}
                />
                <YAxis 
                  tickLine={false}
                  tick={{ fontSize: 10 }}
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(0)}M`}
                />
                <Bar dataKey="monto" fill={COLORS[0]} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contratos por Rango de Monto</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getAmountRangeData()}
                  dataKey="contratos"
                  nameKey="rango"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {getAmountRangeData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {getAmountRangeData().map((entry, index) => (
                <div key={entry.rango} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span>{entry.rango}</span>
                  </div>
                  <span className="font-medium">{entry.contratos}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por número, proveedor o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="text-sm text-gray-600 flex items-center">
              Mostrando {filteredContracts.length} de {contracts.length} contratos
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contracts List */}
      <div className="space-y-4">
        {filteredContracts.length > 0 ? (
          filteredContracts.map((contract) => {
            const isActive = new Date(contract?.endDate) > new Date()
            
            return (
              <Card key={contract.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{contract.contractNumber}</h3>
                        <Badge variant={isActive ? "default" : "secondary"}>
                          {isActive ? "Activo" : "Finalizado"}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-2">{contract.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700 font-medium">
                          {contract.supplier}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Inicio: {formatDate(contract.startDate)}
                        </span>
                        {contract.endDate && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Fin: {formatDate(contract.endDate)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">
                        {formatCLP(contract.amount)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {contract.supplier}
                      </div>
                      {contract.startDate && (
                        <div className="text-xs text-gray-400 mt-1">
                          Desde {formatDate(contract.startDate)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Contract details */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Número de contrato</span>
                      <span className="font-mono">{contract.contractNumber}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No se encontraron contratos
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Intenta ajustar los términos de búsqueda'
                  : 'No hay contratos públicos disponibles en este momento'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
