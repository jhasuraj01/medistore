import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { SubNav, SubNavProps } from '../../features/SubNav'
import { selectSubNavExpanded } from '../../features/SubNav/subNavSlice'
import styles from './index.module.scss'

interface AppSectionLayoutProps {
  navProps: SubNavProps
}

export function AppSectionLayout({ navProps }: AppSectionLayoutProps) {
  const subnavExpanded = useAppSelector(selectSubNavExpanded)

  return (
    <div className={subnavExpanded ? `${styles.layout}` : `${styles.layout} ${styles.subnav_hide}`}>
      <SubNav {...navProps} />
      <Outlet />
    </div>
  )
}