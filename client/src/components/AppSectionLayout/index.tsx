import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectSubNavExpanded } from '../../features/SubNav/subNavSlice'
import { Page } from '../Page'
import styles from './index.module.scss'

interface AppSectionLayoutProps {
  subnav: React.ReactNode
}

export function AppSectionLayout({ subnav }: AppSectionLayoutProps) {
  const subnavExpanded = useAppSelector(selectSubNavExpanded)
  return (
    <div className={subnavExpanded ? `${styles.layout}` : `${styles.layout} ${styles.subnav_hide}`}>
      {subnav}
      <Page>
        <Outlet />
      </Page>
    </div>
  )
}