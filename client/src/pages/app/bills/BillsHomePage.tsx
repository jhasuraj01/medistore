import { ReactComponent as CartIcon } from '../../../icons/shopping-cart.svg'
import styles from './index.module.scss'

export function BillsHomePage() {
  return (
    <div className={styles.homepage}>
      <h1>Billing History</h1>
      <CartIcon className={styles.icon} />
      <p>Find Customer Bills, Print Bills, Share bills</p>
    </div>
  )
}