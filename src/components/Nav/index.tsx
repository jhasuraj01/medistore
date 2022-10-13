import style from './index.module.scss'
import { NavLinkPersist } from '../../supports/Persistence'
// import { ReactComponent as PlaceHolderIcon } from '../../icons/placeholder.svg'
import { ReactComponent as Home } from '../../icons/home.svg'
import { ReactComponent as Menu } from '../../icons/menu.svg'
import { ReactComponent as Sales } from '../../icons/sales.svg'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Store } from '../../icons/store.svg'
import { ReactComponent as Logo } from '../../icons/logo.svg'

export function Nav() {
  return (
    <nav className={style.nav}>
      <div className={style.navSection}>
        <button className={style.navOption}><Menu /></button>
        <NavLinkPersist
          className={({ isActive }) => isActive ? `${style.navOption} ${style.selected}` : `${style.navOption}`}
          to='/home'
        ><Home /></NavLinkPersist>

        <NavLinkPersist
          className={({ isActive }) => isActive ? `${style.navOption} ${style.selected}` : `${style.navOption}`}
          to='/search'
        ><Search /></NavLinkPersist>

        <NavLinkPersist
          className={({ isActive }) => isActive ? `${style.navOption} ${style.selected}` : `${style.navOption}`}
          to='/sales'
        ><Sales /></NavLinkPersist>

        <NavLinkPersist
          className={({ isActive }) => isActive ? `${style.navOption} ${style.selected}` : `${style.navOption}`}
          to='/store'
        ><Store /></NavLinkPersist>

      </div>
      <div className={style.navSection}>
        <div className={style.navOption}><Logo /></div>
      </div>
    </nav>
  )
}
