import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { NotFoundPage } from '../../pages/404'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addItemToCart, CartInterface, CartItemInterface, removeCart, removeItemFromCart, selectCart, selectNextCart, selectPrevCart, updateCart, updateCustomerDetails, updateItem } from './cartsSlice'
import { useNavigatePersist } from '../../supports/Persistence'
import { InputButton, InputButtonPayload } from '../../components/InputButton'
import { TouchInput } from '../../components/TouchInput'
import { ReactComponent as MathPlusIcon } from '../../icons/math-plus.svg'
import { ReactComponent as TrashIcon } from '../../icons/trash.svg'
import { ReactComponent as FileDocumentIcon } from '../../icons/file-document.svg'
import { ReactComponent as FileAddIcon } from '../../icons/file-add.svg'
import { IconButton, IconLink } from '../../components/IconButton'
import { Table, TableBody, TableFooter, TableHead } from '../../components/Table'
import { FetchResult, gql, useMutation, useQuery } from '@apollo/client'
import { Branch, CreateBillMutation, CreateBillMutationVariables, GetItemQuery, GetItemQueryVariables } from '../../gql/graphql'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { GraphQLError } from 'graphql'

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

interface CartRowProps {
  cartId: string,
  id: string,
  index: number,
  quantity: number,
  onDelete: () => void,
  onUpdate: (value: number) => void,
}

const GET_ITEM = gql`
  query GetItem($organizationId: ID!, $branchId: ID!, $id: ID!) {
    item(organizationId: $organizationId, branchId: $branchId, id: $id) {
      organizationId
      branchId
      id
      brandName
      companyName
      quantity
      costPerUnit
      pricePerUnit
      discount
      manufactureAt
      expireAt
    }
  }
`

const CREATE_BILL = gql`
  mutation CreateBill($organizationId: ID!, $branchId: ID!, $customerEmail: StringNonEmpty!, $customerPhone: StringNonEmpty!, $customerName: StringNonEmpty!, $items: [itemInput!]!) {
    createBill(organizationId: $organizationId, branchId: $branchId, customerEmail: $customerEmail, customerPhone: $customerPhone, customerName: $customerName, items: $items) {
      id
    }
  }
`

const cartTotal = (cart: CartInterface): number => {
  let ans = 0
  cart.items.forEach(item => {
    ans += itemTotal(item)
  })
  return ans
}

const itemTotal = ({ quantity, pricePerUnit, discount }: CartItemInterface): number => {
  return pricePerUnit * quantity * (1 - discount)
}

function CartRow({cartId, id, index, quantity, onDelete, onUpdate }: CartRowProps) {

  const { loading, error, data } = useQuery<GetItemQuery, GetItemQueryVariables>(GET_ITEM, {
    variables: {
      organizationId: '6KJwVogFJITXND5LNFlx',
      branchId: 'FZb6FsGUWVmvxuFkT7zm',
      id: id,
    }
  })
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    if(data != undefined) {
      dispatch(updateItem({
        cartID: cartId,
        itemID: id,
        quantity: Math.min(quantity, data.item.quantity),
        discount: data.item.discount,
        brandName: data.item.brandName,
        pricePerUnit: data.item.pricePerUnit,
      }))
    }
  }, [id, cartId, quantity, data])

  if(error) {
    return (
      <tr className={styles.errorRow}>
        <td scope='row'>{index + 1}</td>
        <td className={styles.buttonBlock}>
          <IconButton
            onClick={onDelete}
            title={`Remove Item: ${id} from cart`}><TrashIcon /></IconButton>
        </td>
        <td>{id}</td>
        <td>{error.message}</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{quantity}</td>
        <td></td>
      </tr>
    )
  }

  if(loading || data === undefined) {
    return (
      <tr>
        <td scope='row'>{index + 1}</td>
        <td className={styles.buttonBlock}>
          <IconButton
            onClick={onDelete}
            title={`Remove Item: ${id} from cart`}><TrashIcon /></IconButton>
        </td>
        <td>{id}</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>Loading...</td>
        <td>{quantity}</td>
        <td>Loading...</td>
      </tr>
    )
  }

  const total = itemTotal({
    ...data.item,
    quantity: quantity,
    pricePerUnit: data.item.pricePerUnit,
    discount: data.item.discount,
  })

  return (
    <tr key={id}>
      <td scope='row'>{index + 1}</td>
      <td className={styles.buttonBlock}>
        <IconButton
          onClick={onDelete}
          title={`Remove ${data.item.brandName} from cart`}><TrashIcon /></IconButton>
      </td>
      <td>{id}</td>
      <td>{data.item.brandName}</td>
      <td>{currency.format(data.item.pricePerUnit)}</td>
      <td>{percent.format(data.item.discount)}</td>
      <td>{currency.format(data.item.pricePerUnit)}</td>
      <td className={styles.editableBlock}>
        <TouchInput
          onSubmit={({ value }) => value != 'Enter Name' && !isNaN(Number(value)) && onUpdate(Number(value))}
          text={quantity}
          default='0' />
      </td>
      <td>{currency.format(total)}</td>
    </tr>
  )
}

export interface CartProps {
  organizationId?: string
  branches: Branch[]
}
export function Cart({ organizationId, branches }: CartProps) {
  const { id } = useParams()

  if(id === undefined)
    throw new Error('Required Param `id` is undefined')
  
  const dispatch = useAppDispatch()
  const navigate = useNavigatePersist()
  const cart = useAppSelector(selectCart(id))
  const [branchId, setBranchId] = useState<string | null>(branches[0]?.id || null)
  const [createBill] = useMutation<CreateBillMutation, CreateBillMutationVariables>(CREATE_BILL)

  if(!cart) {
    return <NotFoundPage />
  }
  
  const nextCart = useAppSelector(selectNextCart(id))
  const prevCart = useAppSelector(selectPrevCart(id))

  const handleGenerateBill = () => {
    if(organizationId === undefined) {
      toast.error('Organization Id is undefined')
      return
    }
    if(branchId === null) {
      toast.error('Branch is not selected')
      return
    }
    if(cart.customer.name === null) {
      toast.error('Fill Customer Name to Continue with Billing')
      return
    }
    if(cart.customer.email === null) {
      toast.error('Fill Customer Email to Continue with Billing')
      return
    }
    if(cart.customer.phone === null) {
      toast.error('Fill Customer Phone to Continue with Billing')
      return
    }
    if(cart.items.length === 0) {
      toast.error('Cart is Empty')
      return
    }
    
    dispatch(updateCart({
      cartId: cart.id,
      locked: true,
    }))

    toast.promise<FetchResult<CreateBillMutation>, GraphQLError>(
      createBill({
        variables: {
          organizationId,
          branchId,
          customerName: cart.customer.name,
          customerEmail: cart.customer.email,
          customerPhone: cart.customer.phone,
          items: cart.items.map(item => ({ itemId: item.id, quantity: item.quantity }))
        }
      }),
      {
        pending: `Generating Bill for Cart: ${cart.id}`,
        error: {
          render({ data }) {
            dispatch(updateCart({
              cartId: cart.id,
              locked: false,
            }))
            return `Bill Generation Failed, ${data?.message}, Cart: ${cart.id}`
          }
        },
        success: {
          render({ data }) {
            dispatch(updateCart({
              cartId: cart.id,
              billId: data?.data?.createBill.id,
              locked: true,
            }))
            return `Bill Generated, Cart: ${cart.id}, Bill: ${data?.data?.createBill.id}`
          }
        },
      }
    )
  }

  const handleDeleteCart = () => {
    dispatch(removeCart({ id }))
    if(nextCart) navigate('../' + nextCart.id)
    else if(prevCart) navigate('../' + prevCart.id)
    else navigate('../')
  }

  const handleAddItem = ({ value }: InputButtonPayload) => {
    if(value.length) {
      dispatch(addItemToCart({ itemID: value, cartID: id}))
    }
  }

  const total = cartTotal(cart)

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <InputButton placeholder='Item ID: 1234567' onSubmit={handleAddItem}><MathPlusIcon /></InputButton>
        {
          cart.billId && <div>Generated Bill ID: {cart.billId}</div>
        }
        <div className={styles.actionButtons}>
          {
            branches.length > 0 &&
            <select onChange={(event) => setBranchId(event.currentTarget.value)}>
              {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
            </select>
          }
          <IconButton title='Delete Cart' onClick={handleDeleteCart}><TrashIcon /></IconButton>
          {
            cart.billId ?
              <IconLink to={`/app/bills/${branchId}/${cart.billId}`} title='Open Bill'><FileDocumentIcon /></IconLink> :
              <IconButton title='Generate Bill' onClick={handleGenerateBill}><FileAddIcon /></IconButton>
          }
        </div>
      </div>

      <Table className={styles.customerDetails}>
        <TableHead>
          <th>Cart ID</th>
          <th>Customer Name</th>
          <th>Email ID</th>
          <th>Phone Number</th>
        </TableHead>
        <TableBody>
          <tr>
            <td>
              <i>{id}</i>
            </td>
            <td className={styles.editableBlock}>
              <TouchInput
                onSubmit={({ value }) => value != 'Enter Name' && dispatch(updateCustomerDetails({ id, name: value }))}
                text={cart.customer.name}
                default='Enter Name' />
            </td>
            <td className={styles.editableBlock}>
              <TouchInput
                onSubmit={({ value }) => value != 'Enter Email' && dispatch(updateCustomerDetails({ id, email: value }))}
                text={cart.customer.email}
                default='Enter Email' />
            </td>
            <td className={styles.editableBlock}>
              <TouchInput
                onSubmit={({ value }) => value != 'Enter Email' && dispatch(updateCustomerDetails({ id, phone: value }))}
                text={cart.customer.phone}
                default='Enter Phone' />
            </td>
          </tr>
        </TableBody>
      </Table>

      <Table className={styles.cartTable}>
        <TableHead>
          <th scope='col'>#</th>
          <th scope='col'></th>
          <th scope='col'>Product ID</th>
          <th scope='col'>Product Name</th>
          <th scope='col' title='Price Per Quantity'>P / Q</th>
          <th scope='col'>Discount</th>
          <th scope='col' title='Final Price Per Quantity'>FP / Q</th>
          <th scope='col'>Quantity</th>
          <th scope='col'>Total</th>
        </TableHead>
        <TableBody>
          {cart.items.map((item, index) => (
            <CartRow
              key={item.id}
              quantity={item.quantity}
              id={item.id}
              cartId={id}
              index={index}
              onDelete={() => dispatch(removeItemFromCart({ cartID: id, itemID: item.id }))}
              onUpdate={(value: number) => dispatch(updateItem({ cartID: id, itemID: item.id, quantity: value }))} />
          ))}
        </TableBody>
        <TableFooter>
          <td colSpan={8} title='Inclusive of Taxes and Discounts (if any)'>Total Bill Value</td>
          <td>{currency.format(total)}</td>
        </TableFooter>
      </Table>
    </div>
  )
}