import styles from './index.module.scss'
import { ReactComponent as Ripple } from '../../icons/ripple.svg'

export function LoaderRipple() {
  return (
    <div className={styles.spinnerContainer}>
      <Ripple />
    </div>
  )
}