'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Building2, Search, Home, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CitizenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const params = useParams()
  const slug = params?.slug as string
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { href: `/${slug}`, label: 'Inicio', icon: Home },
    { href: `/${slug}/presupuestos`, label: 'Presupuestos' },
    { href: `/${slug}/gastos`, label: 'Gastos' },
    { href: `/${slug}/proyectos`, label: 'Proyectos' },
    { href: `/${slug}/contratos`, label: 'Contratos' },
    { href: `/${slug}/consultas`, label: 'Consultas IA' },
    { href: `/${slug}/participacion`, label: 'Participación' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href={`/${slug}`} className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Transparencia Municipal</span>
              <span className="text-lg font-bold text-gray-900 sm:hidden">Transparencia</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium"
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              ))}
              <Link href={`/${slug}/buscar`}>
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </Link>
            </nav>

            {/* Mobile menu buttons */}
            <div className="md:hidden flex items-center gap-2">
              <Link href={`/${slug}/buscar`}>
                <Button variant="ghost" size="sm">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors"
                >
                  {link.icon && <link.icon className="h-5 w-5" />}
                  {link.label}
                </Link>
              ))}
              <Link
                href={`/${slug}/admin/login`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition-colors border-t mt-2 pt-4"
              >
                Administración
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        {children}
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
              <Link href={`/${slug}/buscar`} className="hover:text-blue-300">
                Búsqueda
              </Link>
              <Link href={`/${slug}/admin/login`} className="hover:text-blue-300">
                Administración
              </Link>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
            Portal de acceso público a información municipal
          </div>
        </div>
      </footer>
    </div>
  )
}
