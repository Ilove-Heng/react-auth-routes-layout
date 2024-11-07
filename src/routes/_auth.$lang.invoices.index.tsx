import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/$lang/invoices/')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /_auth/invoices/!'
}
