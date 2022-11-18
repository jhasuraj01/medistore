import { useSearchParams } from 'react-router-dom'
import { BillProvider } from '../../components/Bill'
import styles from './index.module.scss'

export function RootBillPage() {
  const [params] = useSearchParams()
  const organizationId = params.get('organizationId')
  const branchId = params.get('branchId')
  const billId = params.get('billId')

  if(organizationId === null || branchId === null || billId === null) {
    return (
      <div className={styles.container}>
        <div className={styles.title}>MediStore Web App</div>
        <div className={styles.subtitle}>Inventory Management, Fast Billing, Transaction History and More...</div>
        <div className={styles.error}><b>Couldn&apos;t find bill.</b></div>
        {organizationId === null && <div className={styles.conclusion}>Not Found: Organization ID</div>}
        {branchId === null && <div className={styles.conclusion}>Not Found: Branch ID</div>}
        {billId === null && <div className={styles.conclusion}>Not Found: Bill ID</div>}
      </div>
    )
  }

  return (
    <BillProvider 
      organizationId={organizationId}
      branchId={branchId}
      billId={billId} />
  )
}