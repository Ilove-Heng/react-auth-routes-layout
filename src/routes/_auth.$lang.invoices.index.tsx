import { createFileRoute } from '@tanstack/react-router'
import { useUsers } from '../hooks/queries/useUsers';

export const Route = createFileRoute('/_auth/$lang/invoices/')({
  component: InvoicesPage,
})

function InvoicesPage() {
  // const { data: users, isLoading, error, refetch, isRefetching } = useUsers();


  return (
    <div>
      <div>Select an invoice to view it!</div>
      {/* <pre>{JSON.stringify(users, null, 2)}</pre> */}
    </div>
  )
}
