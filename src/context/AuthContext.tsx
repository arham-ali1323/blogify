import React, { createContext, useContext, useState, useEffect } from 'react'
import { User } from '../types'

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => void
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('blogify-user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('blogify-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('blogify-user')
    }
  }, [user])

  const login = (email: string, password: string) => {
    // Simple demo login - in production, use proper authentication
    if (email && password) {
      const isAdmin = email === 'admin@blogify.com'
      setUser({
        id: '1',
        name: isAdmin ? 'Admin User' : 'Regular User',
        email,
        isAdmin,
      })
    }
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAdmin: user?.isAdmin || false }}
    >
      {children}
    </AuthContext.Provider>
  )
}

