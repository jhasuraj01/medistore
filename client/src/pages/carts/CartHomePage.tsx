import { ReactComponent as CartIcon } from '../../icons/shopping-cart.svg'
import styles from './index.module.scss'

export function CartHomePage() {
  return (
    <div className={styles.homepage}>
      <h1>Customer Billing Point</h1>
      <CartIcon className={styles.icon} />
      <p>Create New Cart, Scan Product&apos;s BarCode, Collect Payment, Generate Bill</p>
    </div>
  )
}