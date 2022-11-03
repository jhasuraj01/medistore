import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/Auth/authSlice'
import { ReactComponent as Ripple } from '../../icons/ripple.svg'
import { useNavigatePersist } from '../../supports/Persistence'
import styles from './index.module.scss'

export function AccountSetupPage() {

  const user = useAppSelector(selectAuth)
  const navigate = useNavigatePersist()
  const [ params ] = useSearchParams()
  const returnAddress = params.get('return') || '/app'

  if(!user.active) {
    navigate({
      pathname: '/auth',
      search: `?return=${returnAddress}`
    })
  }

  return (
    <div className={styles.spinnerContainer}>
      <Ripple />
    </div>
  )
}