
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { ArrowLeft, Building2, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const REGIONES_CHILE = [
  'Región de Arica y Parinacota',
  'Región de Tarapacá',
  'Región de Antofagasta',
  'Región de Atacama',
  'Región de Coquimbo',
  'Región de Valparaíso',
  'Región Metropolitana',
  'Región de O\'Higgins',
  'Región del Maule',
  'Región de Ñuble',
  'Región del Biobío',
  'Región de La Araucanía',
  'Región de Los Ríos',
  'Región de Los Lagos',
  'Región de Aysén',
  'Región de Magallanes',
]

export default function NewTenantPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    region: '',
    comuna: '',
    contactEmail: '',
    contactPhone: '',
    plan: 'base',
    demoDataEnabled: false,
    adminEmail: '',
    adminPassword: 'admin123',
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))

    // Auto-generar slug desde el nombre
    if (field === 'name' && !formData.slug) {
      const autoSlug = value
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      
      setFormData(prev => ({ ...prev, slug: autoSlug }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/superadmin/tenants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Error al crear tenant')
      }

      toast.success('Tenant creado exitosamente', {
        description: `${formData.name} ha sido creado con el slug ${formData.slug}`,
        icon: <CheckCircle className="h-4 w-4" />,
      })

      // Preguntar si quiere provisionar datos de demo
      if (formData.demoDataEnabled) {
        const provision = confirm('¿Deseas provisionar datos de demostración ahora?')
        if (provision) {
          await fetch(`/api/superadmin/tenants/${data.id}/provision`, {
            method: 'POST',
          })
          toast.success('Datos de demostración provisionados')
        }
      }

      router.push('/superadmin')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error al crear tenant')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/superadmin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-blue-600" />
                Crear Nuevo Tenant
              </h1>
              <p className="text-gray-600 mt-1">
                Provisiona una nueva municipalidad en el sistema
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Información Básica */}
            <Card>
              <CardHeader>
                <CardTitle>Información Básica</CardTitle>
                <CardDescription>
                  Datos fundamentales de la municipalidad
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre de la Municipalidad *</Label>
                  <Input
                    id="name"
                    placeholder="Ej: Ilustre Municipalidad de Renca"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug (Subdominio) *</Label>
                  <Input
                    id="slug"
                    placeholder="renca"
                    value={formData.slug}
                    onChange={(e) => handleChange('slug', e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Se usará como: <code>{formData.slug || 'slug'}.transparenciaciudadana.com</code>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="region">Región *</Label>
                    <Select value={formData.region} onValueChange={(val) => handleChange('region', val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar región" />
                      </SelectTrigger>
                      <SelectContent>
                        {REGIONES_CHILE.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="comuna">Comuna *</Label>
                    <Input
                      id="comuna"
                      placeholder="Ej: Renca"
                      value={formData.comuna}
                      onChange={(e) => handleChange('comuna', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacto */}
            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="contactEmail">Email de Contacto *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="transparencia@municipalidad.cl"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Teléfono</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+56 2 1234 5678"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Configuración */}
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Tenant</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="plan">Plan</Label>
                  <Select value={formData.plan} onValueChange={(val) => handleChange('plan', val)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">Base (10 usuarios, 10GB)</SelectItem>
                      <SelectItem value="pro">Pro (50 usuarios, 50GB)</SelectItem>
                      <SelectItem value="enterprise">Enterprise (Ilimitado, 200GB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Datos de Demostración</Label>
                    <p className="text-sm text-gray-500">
                      Poblar con datos de ejemplo (proyectos, presupuestos, etc.)
                    </p>
                  </div>
                  <Switch
                    checked={formData.demoDataEnabled}
                    onCheckedChange={(val) => handleChange('demoDataEnabled', val)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Usuario Administrador */}
            <Card>
              <CardHeader>
                <CardTitle>Usuario Administrador Municipal</CardTitle>
                <CardDescription>
                  Crear usuario administrador inicial para el tenant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="adminEmail">Email del Admin</Label>
                  <Input
                    id="adminEmail"
                    type="email"
                    placeholder="admin@municipalidad.cl"
                    value={formData.adminEmail}
                    onChange={(e) => handleChange('adminEmail', e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="adminPassword">Contraseña Inicial</Label>
                  <Input
                    id="adminPassword"
                    type="text"
                    value={formData.adminPassword}
                    onChange={(e) => handleChange('adminPassword', e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    El administrador deberá cambiarla en el primer login
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Acciones */}
            <div className="flex gap-4">
              <Link href="/superadmin" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Tenant'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
