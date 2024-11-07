export interface AuthUser {
  username: string
  lastLogin: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: AuthUser | null
  login: (username: string) => Promise<AuthUser>
  logout: () => Promise<void>
}