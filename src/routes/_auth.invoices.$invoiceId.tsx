import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/invoices/$invoiceId')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/invoices/$invoiceId!'
}
