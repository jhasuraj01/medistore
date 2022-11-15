import { useParams } from 'react-router-dom'
import { Page } from '../../../../components/AppSectionLayout'

export interface BillPageProps {
  organizationId: string
}

export function BillPage({ organizationId }: BillPageProps) {
  const { branchId, billId } = useParams()
  console.log({ branchId, billId })

  return (
    <Page>
      <div>organizationId: {organizationId}</div>
      <div>branchId: {branchId}</div>
      <div>billId: {billId}</div>
    </Page>
  )
}