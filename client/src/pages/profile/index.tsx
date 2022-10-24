import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/Auth/authSlice'
import { auth } from '../../firebase'
import { NavLinkPersist } from '../../supports/Persistence'
import styles from './index.module.scss'

export function ProfilePage() {

  const user = useAppSelector(selectAuth)

  // const message = user.active ? 'Loading...' : 'Not Available'
  function message(value: string | number | boolean | null | undefined): string {
    if(value === null || user.active === false) return 'Not Available'
    if(value === undefined) return 'Loading...'
    if(typeof value === 'boolean') return value ? 'True' : 'False'
    if(typeof value === 'number') return String(value)
    return value
  }

  const records: string[][] = [
    ['UID', message(user.uid)],
    ['Display Name', message(user.displayName)],
    ['Email', message(user.email)],
    ['Email Verified', message(user.emailVerified)],
    ['Phone Number', message(user.phoneNumber)],
    ['Last Signin', user.lastSignInTime ? new Date(user.lastSignInTime).toString() : message(user.lastSignInTime)],
    ['Resigtered At', user.creationTime ? new Date(user.creationTime).toString() : message(user.creationTime)],
    ['Provider', user.providers ? user.providers.join(', ') : message(user.providers)],
  ]

  const handleSignOut = async () => {
    await auth.signOut()
  }

  return <div className={styles.container}>
    <h2>My Profile</h2>
    {
      records.map(([key, value]) => {
        return <div className={styles.records} key={key}>
          <div>{key}</div>
          <div>{value}</div>
        </div>
      })
    }

    <div className={styles.buttons}>
      {
        user.active
          ? <button className={styles.button} onClick={handleSignOut}>Sign Out</button>
          : <NavLinkPersist className={styles.button} to={`/auth?return=${location.pathname}`}>Sign In / Resigter</NavLinkPersist>
      }
    </div>

  </div>
}