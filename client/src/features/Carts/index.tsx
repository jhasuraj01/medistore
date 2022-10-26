import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { NotFoundPage } from '../../pages/404'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItemToCart, removeCart, removeItemFromCart, selectCart, selectNextCart, selectPrevCart, updateCustomerDetails, updateItemQuantity } from './cartsSlice'
import { useNavigatePersist } from '../../supports/Persistence'
import { InputButton, InputButtonPayload } from '../../components/InputButton'
import { TouchInput } from '../../components/TouchInput'

/**
 * Validate Cart ID
 * @todo Update cart ID validation logic
 */
const isValidID = (id: string) => {
  return (new Date(Number(id))).getTime() > 0
}

export function Cart() {
  const { id } = useParams()

  if(!id || !isValidID(id)) {
    return <NotFoundPage />
  }
  
  const dispatch = useAppDispatch()
  const navigate = useNavigatePersist()
  const cart = useAppSelector(selectCart(id))

  if(!cart) {
    return <NotFoundPage />
  }

  const nextCart = useAppSelector(selectNextCart(id))
  const prevCart = useAppSelector(selectPrevCart(id))

  const handleDeleteCart = () => {
    dispatch(removeCart({ id }))
    if(nextCart) navigate('../' + nextCart.id)
    else if(prevCart) navigate('../' + prevCart.id)
    else navigate('../')
  }

  const handleSubmit = ({ value }: InputButtonPayload) => {
    if(value.length)
      dispatch(addItemToCart({ itemID: value, cartID: id}))
  }

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div>Cart ID: <b>{id}</b></div>
        <div className={styles.actionButtons}>
          <InputButton placeholder='Product ID: 1234567' onSubmit={handleSubmit}/>
          <button onClick={handleDeleteCart}>Delete Cart</button>
          {/* <button>Payment</button> */}
          <button onClick={() => {alert('TODO: Bill Generation')}}>Generate Bill</button>
        </div>
      </div>

      <div className={styles.customerDetails}>
        <div>
          Customer Name:&nbsp;
          <TouchInput
            onSubmit={({ value }) => value != 'Enter Name' && dispatch(updateCustomerDetails({ id, name: value }))}
            text={cart.customer.name}
            default='Enter Name' />
        </div>
        <div>
          Email ID:&nbsp;
          <TouchInput
            onSubmit={({ value }) => value != 'Enter Email' && dispatch(updateCustomerDetails({ id, email: value }))}
            text={cart.customer.email}
            default='Enter Email' />
        </div>
        <div>
          Phone Number:&nbsp;
          <TouchInput
            onSubmit={({ value }) => value != 'Enter Email' && dispatch(updateCustomerDetails({ id, phone: value }))}
            text={cart.customer.phone}
            default='Enter Phone' />
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td scope="col">Sr no.</td>
            <td scope="col">Remove Item</td>
            <td scope="col">Product ID</td>
            <td scope="col">Product Name</td>
            <td scope="col" title='Price Per Quantity'>P / Q</td>
            <td scope="col">Discount</td>
            <td scope="col" title='Final Price Per Quantity'>FP / Q</td>
            <td scope="col">Quantity</td>
            <td scope="col">Total</td>
          </tr>
        </thead>
        <tbody>
          {
            cart.items.map((product, index) => {
              return (
                <tr key={product.id}>
                  <td scope="row">{index + 1}</td>
                  <td className={styles.buttonBlock}>
                    <button
                      onClick={() => dispatch(removeItemFromCart({ cartID: id, itemID: product.id }))}
                      title={`Remove ${product.name} from cart`}>Delete</button>
                  </td>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.pricePerQuantity}</td>
                  <td>{product.discount}</td>
                  <td>{product.pricePerQuantity * (100 - product.discount) / 100}</td>
                  <td className={styles.editableBlock}>
                    <TouchInput
                      onSubmit={({ value }) => value != 'Enter Name' && !isNaN(Number(value)) && dispatch(updateItemQuantity({ cartID: id, itemID: product.id, quantity: Number(value) }))}
                      text={product.quantity}
                      default='0' />
                  </td>
                  <td>{product.quantity * product.pricePerQuantity * (100 - product.discount) / 100}</td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8} title='Inclusive of Taxes and Discounts (if any)'>Total Bill Value</td>
            <td>{cart.totalBillValue}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}