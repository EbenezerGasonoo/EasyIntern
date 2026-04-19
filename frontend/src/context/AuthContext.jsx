import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../utils/api'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data)
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('demoUser')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    const demoUser = localStorage.getItem('demoUser')
    if (token && (token === 'demo-intern' || token === 'demo-company')) {
      if (demoUser) {
        try {
          const parsed = JSON.parse(demoUser)
          setUser({ ...parsed, isEmailVerified: true })
        } catch (_) {
          setUser(null)
        }
      }
      setLoading(false)
    } else if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [fetchUser])

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('demoUser')
    setUser(null)
  }

  const value = {
    user,
    login,
    logout,
    loading,
    fetchUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
