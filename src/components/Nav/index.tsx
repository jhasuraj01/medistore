import style from './index.module.scss'
import { NavLinkPersist } from '../../supports/Persistence'
// import { ReactComponent as PlaceHolderIcon } from '../../icons/placeholder.svg'
import { ReactComponent as Home } from '../../icons/home.svg'
import { ReactComponent as Menu } from '../../icons/menu.svg'
import { ReactComponent as Sales } from '../../icons/sales.svg'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Store } from '../../icons/store.svg'
import { ReactComponent as Logo } from '../../icons/logo.svg'
import navData from '../../data/nav'

export function Nav() {
  return (
    <nav className={style.nav}>
      <div className={style.navSection}>
        <button className={style.navOption}><Menu /></button>
        <NavLinkPersist className={style.navOption} to={`/${navData.home.upperOptions[0].link}`} ><Home /></NavLinkPersist>
        <NavLinkPersist className={style.navOption} to={`/search/${navData.search.upperOptions[0].link}`} ><Search /></NavLinkPersist>
        <NavLinkPersist className={style.navOption} to={`/sales/${navData.sales.upperOptions[0].link}`} ><Sales /></NavLinkPersist>
        <NavLinkPersist className={style.navOption} to={`/store/${navData.store.upperOptions[0].link}`} ><Store /></NavLinkPersist>
      </div>
      <div className={style.navSection}>
        <div className={style.navOption}><Logo /></div>
      </div>
    </nav>
  )
}
