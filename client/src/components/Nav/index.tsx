import styles from './index.module.scss'
import { NavLinkPersist } from '../../supports/Persistence'
// import { ReactComponent as PlaceHolderIcon } from '../../icons/placeholder.svg'
import { ReactComponent as Home } from '../../icons/home.svg'
import { ReactComponent as Menu } from '../../icons/menu.svg'
import { ReactComponent as Sales } from '../../icons/sales.svg'
import { ReactComponent as Search } from '../../icons/search.svg'
import { ReactComponent as Store } from '../../icons/store.svg'
import { ReactComponent as Logo } from '../../icons/logo.svg'
import { ReactComponent as ProfileIcon } from '../../icons/profile.svg'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { toggleExpansion } from '../../features/SubNav/subNavSlice'
import { selectAuth } from '../../features/Auth/authSlice'

export function Nav() {
  const dispatch = useAppDispatch()
  const { displayName, photoURL } = useAppSelector(selectAuth)

  const handleMenuClick = () => {
    dispatch(toggleExpansion())
  }

  return (
    <nav className={styles.nav}>
      <div className={styles.navSection}>
        <button className={styles.navOption} onClick={handleMenuClick}><Menu /></button>
        <NavLinkPersist
          className={({ isActive }) => isActive ? `${styles.navOption} ${styles.selected}` : `${styles.navOption}`}
          to='home'
          title='Home'
        ><Home /></NavLinkPersist>

        <NavLinkPersist
          className={({ isActive }) => isActive ? `${styles.navOption} ${styles.selected}` : `${styles.navOption}`}
          to='search'
          title='Search'
        ><Search /></NavLinkPersist>

        <NavLinkPersist
          className={({ isActive }) => isActive ? `${styles.navOption} ${styles.selected}` : `${styles.navOption}`}
          to='sales'
          title='Sales'
        ><Sales /></NavLinkPersist>

        <NavLinkPersist
          className={({ isActive }) => isActive ? `${styles.navOption} ${styles.selected}` : `${styles.navOption}`}
          to='store'
          title='Store'
        ><Store /></NavLinkPersist>

      </div>
      <div className={styles.navSection}>
        <NavLinkPersist
          className={({ isActive }) => isActive ? `${styles.navOption} ${styles.selected}` : `${styles.navOption}`}
          to='my'
          title='My Account'>
          {
            photoURL && displayName
              ? <img src={photoURL} referrerPolicy='no-referrer' alt='' className={styles.photo} title={displayName} />
              : <ProfileIcon/>
          }
        </NavLinkPersist>
        <div className={styles.navOption}><Logo /></div>
      </div>
    </nav>
  )
}
