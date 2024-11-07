import { createFileRoute, Navigate, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ context }) => {
    const { isAuthenticated, isLoading } = context.auth
    if (!isLoading && isAuthenticated) {
      throw redirect({
        to: '/$lang/login',
        params: { lang: 'en' },
      })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const validateLanguage = (lang: string) => {
    const supportedLanguages = ['en', 'km']
    return supportedLanguages.includes(lang) ? lang : 'en'
  }

  const getCurrentLanguageFromPath = () => {
    const pathSegments = location.pathname.split('/')
    return pathSegments[1] || 'en'
  }

  const currentLang = validateLanguage(getCurrentLanguageFromPath())

  return (
    <Navigate
      to={`/${currentLang}/dashboard`}
      params={{ lang: currentLang }}
    />
  )
}

