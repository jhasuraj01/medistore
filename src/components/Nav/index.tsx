import style from './index.module.scss'
import { NavLinkPersist } from '../../supports/Persistence'
import { ReactComponent as PlaceHolderIcon } from '../../icons/placeholder.svg'

export function Nav() {
  return (
    <nav className={style.nav}>
      <div className={style.navSection}>
        <button className={style.navOption}><PlaceHolderIcon /></button>
        <NavLinkPersist className={style.navOption} to='/'><PlaceHolderIcon /></NavLinkPersist>
        <NavLinkPersist className={style.navOption} to='/search'><PlaceHolderIcon /></NavLinkPersist>
        <NavLinkPersist className={style.navOption} to='/sales'><PlaceHolderIcon /></NavLinkPersist>
        <NavLinkPersist className={style.navOption} to='/store'><PlaceHolderIcon /></NavLinkPersist>
      </div>
      <div className={style.navSection}>
        <div className={style.navOption}><PlaceHolderIcon /></div>
      </div>
    </nav>
  )
}
