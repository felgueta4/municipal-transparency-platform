
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  fullName: string
  role?: string
  municipalityId?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        const { access_token, user: userData } = data

        // Ensure role is included in user data
        const userWithRole = {
          ...userData,
          role: userData.role || 'funcionario'
        }

        localStorage.setItem('auth_token', access_token)
        localStorage.setItem('auth_user', JSON.stringify(userWithRole))
        
        setToken(access_token)
        setUser(userWithRole)
        
        return true
      }
      return false
    } catch (error) {
      console.error('Error durante login:', error)
      // For demo purposes, allow login with demo credentials when backend is not available
      if (email === 'demo@municipio.cl' && password === 'demo123') {
        const demoUser = {
          id: 'demo-user',
          email: 'demo@municipio.cl',
          fullName: 'Usuario Demo',
          role: 'funcionario'
        }
        const demoToken = 'demo-token'
        
        localStorage.setItem('auth_token', demoToken)
        localStorage.setItem('auth_user', JSON.stringify(demoUser))
        
        setToken(demoToken)
        setUser(demoUser)
        
        return true
      }
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    setToken(null)
    setUser(null)
    // Redirigir a la página principal, el middleware manejará la redirección correcta
    router.push('/')
  }

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
