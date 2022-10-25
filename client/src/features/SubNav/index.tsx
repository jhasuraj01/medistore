import { NavLinkProps } from 'react-router-dom'
import { NavLinkPersist } from '../../supports/Persistence'
import style from './index.module.scss'


export function SubNavLink(props: NavLinkProps) {
  return (<>
    <NavLinkPersist
      {...props}
      className={({ isActive }) => `${props.className && ''} ${isActive && style.selected}`}>
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
    <div className={style.container}>
      <div className={style.header}>{title}</div>
      <div className={style.subnav}>
        <div className={style.subnavSection}>
          { topNav }
        </div>
        <div className={style.subnavSection}>
          { bottonNav }
        </div>
      </div>
    </div>
  )
}