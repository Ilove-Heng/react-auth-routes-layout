import { useEffect, type ReactNode } from 'react'
import {  useRouter } from '@tanstack/react-router'
import { useAuth } from '../context/auth-context'

interface ProtectedRouteProps {
  children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.navigate({
        to: '/login',
        search: {
          redirect: window.location.pathname,
        },
      })
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}