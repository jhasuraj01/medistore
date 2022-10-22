import { auth } from '../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import styles from './index.module.scss'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/Auth/authSlice'

export function ProfilePage() {

  const authState = useAppSelector(selectAuth)

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      console.log('Login Successful!', token)
    } catch (error) {
      console.log('Login Failed!')
    }
  }

  const handleSignOut = async () => {
    await auth.signOut()
  }

  return <div className={styles.container}>
    {authState.active && <div>User: {authState.displayName || 'Loading...'} is Logged in via: {authState.email || 'Loading...'}</div>}
    <button onClick={handleLoginWithGoogle}>Login With Google</button>
    <button>Signup With Google</button>
    <button onClick={handleSignOut}>Sign Out</button>
  </div>
}