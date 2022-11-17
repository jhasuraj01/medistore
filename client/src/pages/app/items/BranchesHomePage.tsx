import { ReactComponent as CartIcon } from '../../../icons/shopping-cart.svg'
import styles from './index.module.scss'

export function BranchesHomePage() {
  return (
    <div className={styles.homepage}>
      <h1>Branch Management Point</h1>
      <CartIcon className={styles.icon} />
      <p>Create New Branch, Add Products, Collect Payment, Generate Bill</p>
    </div>
  )
}