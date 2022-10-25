import { NavLinkProps } from 'react-router-dom'
import { NavLinkPersist } from '../../supports/Persistence'
import styles from './index.module.scss'


export function SubNavLink(props: NavLinkProps) {
  const className = `${props.className} ${styles.subnavOption}`
  return (<>
    <NavLinkPersist
      {...props}
      className={({ isActive }) => `${className} ${isActive && styles.selected}`}>
      { props.children }
    </NavLinkPersist>
  </>)
}

export interface SubNavSectionProps {
  children: React.ReactNode
}

export function SubNavSection({ children }: SubNavSectionProps) {
  return (
    <>
      { children }
    </>
  )
}

export interface SubNavProps {
  title: string,
  children: React.ReactNode[]
}

export function SubNav({ title, children }: SubNavProps) {
  const [topNav, bottonNav] = children
  return (
    <div className={styles.container}>
      <div className={styles.header}>{title}</div>
      <div className={styles.subnav}>
        <div className={styles.subnavSection}>
          { topNav }
        </div>
        <div className={styles.subnavSection}>
          { bottonNav }
        </div>
      </div>
    </div>
  )
}