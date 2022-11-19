import { ReactComponent as CartIcon } from '../../../icons/shopping-cart.svg'
import styles from './index.module.scss'

export function BranchesHomePage() {
  return (
    <div className={styles.homepage}>
      <h1>Stock Management Point</h1>
      <CartIcon className={styles.icon} />
      <p>Add New Products, Update Existing Products, View Available Stocks</p>
    </div>
  )
}