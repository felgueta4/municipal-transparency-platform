'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2 } from 'lucide-react'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // El middleware ya redirige "/" a "/superadmin"
    // Esta página solo se muestra si algo falla en el middleware
    router.replace('/superadmin')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-pulse" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transparencia Municipal</h1>
        <p className="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  )
}
