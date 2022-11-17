import { NavLinkPersist } from '../../../supports/Persistence'
import styles from './index.module.scss'

export function AccountSetupMenu() {
  const optionClassName = ({ isActive }: { isActive: boolean, isPending: boolean }) => `${styles.option} ${isActive && styles.active}`

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.title}>MediStore Web App</div>
        <div className={styles.subtitle}>Inventory Management, Fast Billing, Transaction History and More...</div>
        <div className={styles.secondaryTitle}>Set up your account to unlock all features</div>
      </div>
      <div className={styles.options}>
        <NavLinkPersist className={optionClassName} to='create'>Create Organization</NavLinkPersist>
        <NavLinkPersist className={optionClassName} to='join'>Join Organization</NavLinkPersist>
        <NavLinkPersist className={optionClassName} to='invitations'>Organization Invitations</NavLinkPersist>
      </div>
    </div>
  )
}