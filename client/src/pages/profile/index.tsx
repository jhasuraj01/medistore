import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/Auth/authSlice'
import { auth } from '../../firebase'
import styles from './index.module.scss'

export function ProfilePage() {

  const user = useAppSelector(selectAuth)

  const records: string[][] = [
    ['UID', user.uid || 'Not Available'],
    ['Display Name', user.displayName || 'Not Available'],
    ['Email', user.email || 'Not Available'],
    ['Email Verified', user.emailVerified !== undefined ? user.emailVerified ? 'True' : 'False': 'Not Available'],
    ['Phone Number', user.phoneNumber || 'Not Available'],
    ['Last Signin', user.lastSignInTime ? new Date(user.lastSignInTime).toString() : 'Not Available'],
    ['Resigtered At', user.creationTime ? new Date(user.creationTime).toString() : 'Not Available'],
    ['Provider', user.providers?.join(', ') || 'Not Available'],
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
          : <a className={styles.button} href={`/login?return=${location.pathname}`}>Sign In / Resigter</a>
      }
    </div>

  </div>
}