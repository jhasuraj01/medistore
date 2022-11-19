import styles from './index.module.scss'
import { NavLinkPersist } from '../../../supports/Persistence'
import { useLocation } from 'react-router-dom'

export interface PendingOrganizationSetupProps {
  header?: string
  message?: string
}
export function PendingOrganizationSetup(props: PendingOrganizationSetupProps) {

  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.title}>MediStore Web App</div>
      <div className={styles.subtitle}>Inventory Management, Fast Billing, Transaction History and More...</div>
      { props.header &&
        <div className={styles.header}>{props.header}</div>
      }
      { props.message &&
        <div className={styles.message}>{props.message}</div>
      }
      <div className={styles.error}><b>Organization Setup is Pending!</b> Please setup your organization to use this feature.</div>
      <NavLinkPersist to={`/setup?return=${pathname}`} className={styles.link}>Go to Organization Setup</NavLinkPersist>
    </div>
  )
}