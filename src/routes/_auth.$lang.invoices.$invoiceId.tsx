import { createFileRoute, useParams } from '@tanstack/react-router'
import { useUser } from '../hooks/queries/useUsers'

export const Route = createFileRoute('/_auth/$lang/invoices/$invoiceId')({
  loader: async ({ params: { invoiceId } }) => {
    return {
      invoice: invoiceId,
    }
  },
  component: InvoicePage,
})

function InvoicePage() {
  const { invoiceId } = useParams({from: '/_auth/$lang/invoices/$invoiceId'});
  const { data: user } = useUser(Number(invoiceId));

  return (
    <section style={{
      display: 'grid',
      gap: '4px',
    }}>
        <h2>
          <strong>User ID</strong> {user?.id.toString().padStart(2, '0')}
        </h2>
        <pre>{JSON.stringify(user, null, 2)}</pre>
    </section>
  )
}
