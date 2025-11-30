
'use client'

import { useParams } from 'next/navigation'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Building2, Shield, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        // Obtener el usuario del localStorage para verificar su rol
        const savedUser = localStorage.getItem('auth_user')
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          
          // Redirigir según el rol
          if (userData.role === 'super_admin') {
            router.push('/superadmin')
          } else {
            router.push(`/${slug}/admin/dashboard`)
          }
        } else {
          // Si no hay usuario guardado, redirigir al dashboard por defecto
          router.push(`/${slug}/admin/dashboard`)
        }
      } else {
        setError('Credenciales incorrectas. Verifique su email y contraseña.')
      }
    } catch (err) {
      setError('Error de conexión. Intente nuevamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href={`/${slug}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <Building2 className="h-8 w-8" />
            <span className="text-xl font-bold">Transparencia Municipal</span>
          </Link>
        </div>

        <Card className="shadow-xl">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Administración Municipal</CardTitle>
            <CardDescription>
              Ingrese sus credenciales para acceder al panel administrativo
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@municipio.cl"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-1">Credenciales de Acceso:</p>
                <p className="text-xs text-blue-600">Email: admin@muni.cl</p>
                <p className="text-xs text-blue-600">Contraseña: admin123</p>
              </div>
              <Link 
                href={`/${slug}`} 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                ← Volver al portal público
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          Portal administrativo para funcionarios municipales autorizados
        </div>
      </div>
    </div>
  )
}
