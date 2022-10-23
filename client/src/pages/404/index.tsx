import styles from './index.module.scss'
import { useLocation } from 'react-router-dom'

export function NotFoundPage() {

  const { pathname } = useLocation()

  return (
    <div className={styles.container}>
      <div className={styles.title}>MediStore Web App</div>
      <div className={styles.subtitle}>Inventory Management, Fast Billing, Transaction History and More...</div>
      <div className={styles.error}><b>404.</b> That&apos;s an error.</div>
      <div className={styles.message}>The requested URL {pathname} was not found on this server.</div>
      <div className={styles.conclusion}>That&apos;s all we know.</div>
      <a href='/' className={styles.link}>Go to Home</a>
    </div>
  )
}