import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { AuthUser, AuthContextType } from './auth-context.type'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const STORAGE_KEY = 'tanstack.auth.user'

function isValidAuthUser(data: unknown): data is AuthUser {
  return (
    !!data &&
    typeof data === 'object' &&
    'username' in data &&
    'lastLogin' in data &&
    typeof (data as AuthUser).username === 'string' &&
    typeof (data as AuthUser).lastLogin === 'string'
  )
}

function getStoredUser(): AuthUser | null {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY)
    if (!storedData) return null

    const parsedData = JSON.parse(storedData)
    return isValidAuthUser(parsedData) ? parsedData : null
  } catch (error) {
    console.error('Error retrieving stored user:', error)
    return null
  }
}

function setStoredUser(user: AuthUser | null): void {
  try {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  } catch (error) {
    console.error('Error storing user:', error)
  }
}

interface AuthProviderProps {
  children: React.ReactNode
  onAuthStateChange?: (isAuthenticated: boolean) => void
}

export function AuthProvider({ children, onAuthStateChange }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)
  const [isLoading, setIsLoading] = useState(true)
  const isAuthenticated = !!user

  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 250))
      setStoredUser(null)
      setUser(null)
      onAuthStateChange?.(false)
    } catch (error) {
      console.error('Error during logout:', error)
      throw new Error('Logout failed')
    } finally {
      setIsLoading(false)
    }
  }, [onAuthStateChange])

  const login = useCallback(async (username: string): Promise<AuthUser> => {
    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newUser: AuthUser = {
        username,
        lastLogin: new Date().toISOString(),
      }
      
      setStoredUser(newUser)
      setUser(newUser)
      onAuthStateChange?.(true)
      
      return newUser
    } catch (error) {
      console.error('Error during login:', error)
      throw new Error('Login failed')
    } finally {
      setIsLoading(false)
    }
  }, [onAuthStateChange])

  useEffect(() => {
    try {
      const storedUser = getStoredUser()
      setUser(storedUser)
    } catch (error) {
      console.error('Error initializing auth state:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}