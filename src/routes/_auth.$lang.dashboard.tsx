import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../context/auth-context'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_auth/$lang/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  const { t } = useTranslation()
  const auth = useAuth()

  return (
      <>
        <h1>{t('home.title')}</h1>
      <p>This route's content is only visible to authenticated users.</p>
      <pre>{JSON.stringify(auth.user, null, 2)}</pre>
      </>
  )
}
