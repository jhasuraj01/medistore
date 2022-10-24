// Import FirebaseAuth and firebase.
import { EmailAuthProvider, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../../firebase'
import StyledFirebaseAuth from './StyledFirebaseAuth'
import styles from './index.module.scss'
import { useSearchParams } from 'react-router-dom'
import { NavLinkPersist } from '../../supports/Persistence'
import * as firebaseui from 'firebaseui'

export function AuthPage() {

  const [ params ] = useSearchParams()

  const uiConfig: firebaseui.auth.Config = {
    signInFlow: 'popup',
    signInSuccessUrl: params.get('return') || '/app',
    signInOptions: [
      {
        provider: EmailAuthProvider.PROVIDER_ID,
        fullLabel: 'Continue with Email',
        requireDisplayName: true,
      },
      {
        provider: GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'Continue with Google',
        requireDisplayName: true
      }
    ],
    siteName: 'MediStore Web App'
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>MediStore Web App</div>
      <div className={styles.subtitle}>Inventory Management, Fast Billing, Transaction History and More...</div>
      <div className={styles.secondaryTitle}><b>Login or Register</b> to continue with MediStore App</div>
      {/* <div className={styles.message}>The requested URL {pathname} was not found on this server.</div> */}
      <StyledFirebaseAuth className={styles.actionButtons} uiConfig={uiConfig} firebaseAuth={auth} />
      {/* <div className={styles.linkLabel}>Already have an Account?</div> */}
      {/* <NavLinkPersist to='/login' className={styles.link}>Login Instead</NavLinkPersist> */}
    </div>
  )
}