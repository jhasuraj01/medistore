// Import FirebaseAuth and firebase.
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase'
import StyledFirebaseAuth from './StyledFirebaseAuth'
import styles from './index.module.scss'
import { useSearchParams } from 'react-router-dom'

export function LoginPage() {

  const [ params ] = useSearchParams()

  // Configure FirebaseUI.
  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: params.get('return') || '/app',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      EmailAuthProvider.PROVIDER_ID,
      GoogleAuthProvider.PROVIDER_ID,
    ],
  }

  return (
    <div className={styles.container}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
    </div>
  )
}