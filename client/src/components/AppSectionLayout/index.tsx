import { Outlet } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { SubNav, SubNavLink, SubNavSection } from '../../features/SubNav'
import { selectSubNavExpanded } from '../../features/SubNav/subNavSlice'
import styles from './index.module.scss'

interface AppSectionLayoutProps {
  navProps?: {
    title: string,
    upperOptions: {
      name: string
      link: string
    }[],
    lowerOptions: {
      name: string
      link: string
    }[],
  }
  subnav?: React.ReactNode
}

export function AppSectionLayout({ navProps, subnav }: AppSectionLayoutProps) {
  const subnavExpanded = useAppSelector(selectSubNavExpanded)

  if(subnav)
    return (
      <div className={subnavExpanded ? `${styles.layout}` : `${styles.layout} ${styles.subnav_hide}`}>
        {subnav}
        <Outlet />
      </div>
    )

  if(navProps)
    return (
      <div className={subnavExpanded ? `${styles.layout}` : `${styles.layout} ${styles.subnav_hide}`}>
        <SubNav title={navProps.title}>
          <SubNavSection>
            {
              navProps.upperOptions.map(option => (
                <SubNavLink to={option.link} key={option.name}> {option.name} </SubNavLink>
              ))
            }
          </SubNavSection>
          <SubNavSection>
            {
              navProps.lowerOptions.map(option => (
                <SubNavLink to={option.link} key={option.name}> {option.name} </SubNavLink>
              ))
            }
          </SubNavSection>
        </SubNav>
        <Outlet />
      </div>
    )

  return (
    <Outlet />
  )
}