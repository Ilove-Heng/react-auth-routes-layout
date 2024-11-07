import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useUsers } from '../hooks/queries/useUsers';

export const Route = createFileRoute('/_auth/$lang/invoices')({
  component: InvoicesRoute,
})

function InvoicesRoute() {
    const styles = {
        container: {
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '1rem',
          minHeight: '500px',
        },
        sidebar: {
          padding: '1rem',
          borderRight: '1px solid #ddd',
        },
        invoiceList: {
          listStyle: 'none',
          padding: 0,
          margin: 0,
        },
        invoiceItem: {
          marginBottom: '0.5rem',
        },
        invoiceLink: {
          color: '#0066cc',
          textDecoration: 'none',
          '&:hover': {
            opacity: 0.75,
          },
          '&.active': {
            fontWeight: 'bold',
            textDecoration: 'underline',
          },
        },
        invoiceId: {
          fontFamily: 'monospace',
          width: '2rem',
          display: 'inline-block',
        },
      };


    const { data: users } = useUsers();

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
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <p>Choose an invoice from the list below.</p>
        <ol style={styles.invoiceList}>
          {users?.map((user) => (
            <li key={user.id} style={styles.invoiceItem}>
              <Link
                to={`/$lang/invoices/$invoiceId`}
                params={{ invoiceId: user.id.toString(), lang: currentLang }}
                style={styles.invoiceLink}
                activeProps={{ style: { ...styles.invoiceLink, ...{ fontWeight: 'bold', textDecoration: 'underline' } } }}
              >
                <span style={styles.invoiceId}>
                  #{user.id.toString().padStart(2, '0')}
                </span>{' '}
                - {user.name.slice(0, 16)}
              </Link>
            </li>
          ))}
        </ol>
      </div>
      <div style={{ padding: '1rem' }}>
        <Outlet />
      </div>
    </div>
  )
}
