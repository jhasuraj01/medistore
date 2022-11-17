import { useParams } from 'react-router-dom'
import { Page } from '../../../../components/AppSectionLayout'
import { BillProvider } from '../../../../components/Bill'
import styles from './index.module.scss'

export interface BillPageProps {
  organizationId: string
}

export function BillPage({ organizationId }: BillPageProps) {
  const { branchId, billId } = useParams()

  if(branchId === undefined || billId === undefined)
    throw new Error('Required BranchID and BillID to Fetch Bill Data')

  return (
    <Page className={styles.container}>
      <BillProvider
        organizationId={organizationId}
        branchId={branchId}
        billId={billId} />
    </Page>
  )
}