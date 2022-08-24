import { NavLinkPersist } from '../../supports/Persistence'
import style from './nav.module.scss'

export function Nav() {

  const className = ({ isActive }: { isActive: boolean }) => {
    return `${isActive ? style.active : ''} ${style.link}`
  }

  return (
    <nav>
      <NavLinkPersist className={className} to='/'>Home</NavLinkPersist>
      <NavLinkPersist className={className} to='/page1'>Page 1</NavLinkPersist>
      <NavLinkPersist className={className} to='/page2'>Page 2</NavLinkPersist>
      <NavLinkPersist className={className} to='/page3'>Page 3</NavLinkPersist>
    </nav>
  )
}
