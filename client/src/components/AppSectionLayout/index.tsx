import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectSubNavExpanded } from '../../features/SubNav/subNavSlice'
import styles from './index.module.scss'


export interface PageProps {
  children?: React.ReactNode | React.ReactNode[]
  className?: string
}
export function Page({ children, className }: PageProps) {
  return (
    <div className={`${styles.page} ${className || ' '}`}>
      { children }
    </div>
  )
}

export interface AppSectionLayoutProps {
  subnav: React.ReactNode
}

export function AppSectionLayout({ subnav }: AppSectionLayoutProps) {
  const subnavExpanded = useAppSelector(selectSubNavExpanded)
  return (
    <div className={subnavExpanded ? `${styles.layout}` : `${styles.layout} ${styles.subnav_hide}`}>
      {subnav}
      <Outlet />
    </div>
  )
}