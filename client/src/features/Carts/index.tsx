import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { NotFoundPage } from '../../pages/404'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItemToCart, removeCart, removeItemFromCart, selectCart, selectNextCart, selectPrevCart, updateCustomerDetails, updateItemQuantity } from './cartsSlice'
import { useNavigatePersist } from '../../supports/Persistence'
import { InputButton, InputButtonPayload } from '../../components/InputButton'
import { TouchInput } from '../../components/TouchInput'
import { ReactComponent as MathPlusIcon } from '../../icons/math-plus.svg'
import { ReactComponent as TrashIcon } from '../../icons/trash.svg'
import { ReactComponent as FileDocumentIcon } from '../../icons/file-document.svg'
import { IconButton } from '../../components/IconButton'
import { CartProxy } from './CartProxy'

/**
 * Validate Cart ID
 * @todo Update cart ID validation logic
 */
const isValidID = (id: string) => {
  return (new Date(Number(id))).getTime() > 0
}

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const percent = new Intl.NumberFormat('en-IN', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const number = new Intl.NumberFormat('en-IN')

export function Cart() {
  const { id } = useParams()

  if(!id || !isValidID(id)) {
    return <NotFoundPage />
  }
  
  const dispatch = useAppDispatch()
  const navigate = useNavigatePersist()
  const cartOriginal = useAppSelector(selectCart(id))

  if(!cartOriginal) {
    return <NotFoundPage />
  }
  
  const cart = new CartProxy(cartOriginal)
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
        <InputButton placeholder='item ID: 1234567' onSubmit={handleSubmit}><MathPlusIcon /></InputButton>
        <div className={styles.actionButtons}>
          <IconButton title='Delete Cart' onClick={handleDeleteCart}><TrashIcon /></IconButton>
          <IconButton title='Generate Bill' onClick={() => {alert('TODO: Bill Generation')}}><FileDocumentIcon /></IconButton>
        </div>
      </div>

      <div className={styles.customerDetails}>
        <div>Cart ID: <b>{id}</b></div>
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
            <td scope="col">#</td>
            <td scope="col"></td>
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
            cart.items.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td scope="row">{index + 1}</td>
                  <td className={styles.buttonBlock}>
                    <IconButton
                      onClick={() => dispatch(removeItemFromCart({ cartID: id, itemID: item.id }))}
                      title={`Remove ${item.name} from cart`}><TrashIcon /></IconButton>
                  </td>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{currency.format(item.pricePerQuantity)}</td>
                  <td>{percent.format(item.discount)}</td>
                  <td>{currency.format(item.finalPricePerQuantity)}</td>
                  <td className={styles.editableBlock}>
                    <TouchInput
                      onSubmit={({ value }) => value != 'Enter Name' && !isNaN(Number(value)) && dispatch(updateItemQuantity({ cartID: id, itemID: item.id, quantity: Number(value) }))}
                      text={item.quantity}
                      default='0' />
                  </td>
                  <td>{currency.format(item.totalPrice)}</td>
                </tr>
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8} title='Inclusive of Taxes and Discounts (if any)'>Total Bill Value</td>
            <td>{currency.format(cart.totalBillValue)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}