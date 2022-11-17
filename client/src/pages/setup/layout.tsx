import { Outlet } from 'react-router-dom'
import { AccountSetupMenu } from './AccountSetupMenu'
import styles from './index.module.scss'

export interface OrganizationSetupLayoutProps {
  onSkip: () => void
}
export function OrganizationSetupLayout({ onSkip }: OrganizationSetupLayoutProps) {
  return (
    <div>
      <AccountSetupMenu />
      <Outlet />
      <button onClick={onSkip} className={styles.skipButton}>Skip Account Setup</button>
    </div>
  )
}