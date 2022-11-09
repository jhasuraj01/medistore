import { ApolloQueryResult, gql, useMutation, useQuery } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { useRef } from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { IconButton } from '../../../../components/IconButton'
import { Table, TableBody, TableHead } from '../../../../components/Table'
import { AddItemMutation, AddItemMutationVariables, DeleteItemMutation, DeleteItemMutationVariables, GetItemsQuery, GetItemsQueryVariables, UpdateItemMutation, UpdateItemMutationVariables } from '../../../../gql/graphql'
import { NavLinkPersist } from '../../../../supports/Persistence'
import { NotFoundPage } from '../../../404'
import { BranchProxy } from './branchProxy'
import styles from './index.module.scss'
import { ReactComponent as TrashIcon } from '../../../../icons/trash.svg'

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

const queuePromise = async (func: (() => Promise<unknown>)[]): Promise<void> => {
  for (let i = 0; i < func.length; i++) {
    await func[i]()
  }
}

interface StockPageProps {
  organizationId: string
}

interface ItemsEditorProps {
  organizationId: string
  branchId: string
  refreshItems: (variables?: Partial<GetItemsQueryVariables> | undefined) => Promise<ApolloQueryResult<GetItemsQuery>>
}

const GET_ITEMS = gql`
  query GetItems($organizationId: ID!, $branchId: ID!) {
    items(organizationId: $organizationId, branchId: $branchId) {
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

const ADD_ITEM = gql`
  mutation AddItem($organizationId: ID!, $branchId: ID!, $addItemId: ID!, $brandName: StringNonEmpty!, $companyName: StringNonEmpty!, $quantity: IntPositive!, $costPerUnit: FloatNonNegative!, $pricePerUnit: FloatNonNegative!, $manufactureAt: DatePast!, $discount: Float0To1, $expireAt: DateFuture) {
    addItem(organizationId: $organizationId, branchId: $branchId, id: $addItemId, brandName: $brandName, companyName: $companyName, quantity: $quantity, costPerUnit: $costPerUnit, pricePerUnit: $pricePerUnit, manufactureAt: $manufactureAt, discount: $discount, expireAt: $expireAt)
  }
`

const UPDATE_ITEM = gql`
  mutation UpdateItem($organizationId: ID!, $branchId: ID!, $updateItemId: ID!, $brandName: StringNonEmpty, $companyName: StringNonEmpty, $quantity: IntPositive, $costPerUnit: FloatNonNegative, $pricePerUnit: FloatNonNegative, $discount: Float0To1, $manufactureAt: DatePast, $expireAt: DateFuture) {
    updateItem(organizationId: $organizationId, branchId: $branchId, id: $updateItemId, brandName: $brandName, companyName: $companyName, quantity: $quantity, costPerUnit: $costPerUnit, pricePerUnit: $pricePerUnit, discount: $discount, manufactureAt: $manufactureAt, expireAt: $expireAt)
  }
`

const DELETE_ITEM = gql`
  mutation DeleteItem($organizationId: ID!, $branchId: ID!, $deleteItemId: ID!) {
    deleteItem(organizationId: $organizationId, branchId: $branchId, id: $deleteItemId)
  }
`

function AddItem({ organizationId, branchId, refreshItems }: ItemsEditorProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [addItem] = useMutation<AddItemMutation, AddItemMutationVariables>(ADD_ITEM)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if(!formRef.current) return
    const form = new FormData(formRef.current)
    const expireAt = form.get('expireAt')
    const variables: AddItemMutationVariables = {
      organizationId,
      branchId,
      addItemId: form.get('addItemId')?.toString() || '',
      brandName: form.get('brandName')?.toString() || '',
      companyName: form.get('companyName')?.toString() || '',
      quantity: Number(form.get('quantity')?.toString()) || 0,
      costPerUnit: Number(form.get('costPerUnit')?.toString()) || 0,
      pricePerUnit: Number(form.get('pricePerUnit')?.toString()) || 0,
      discount: Number(form.get('discount')?.toString()) || 0,
      manufactureAt: new Date(form.get('manufactureAt')?.toString() || 0).getTime(),
      expireAt: expireAt !== null ? new Date(expireAt.toString()).getTime() : undefined,
    }
    toast.promise<unknown, GraphQLError>(
      queuePromise([
        () => addItem({ variables }),
        () => refreshItems()
      ]) ,
      {
        pending: 'Adding Item',
        success: 'Item Added',
        error: {
          render(error){
            return error.data?.message
          }
        }
      }
    )
  }

  return (
    <div className={styles.addItemEditor}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input required type='text' placeholder='Item ID*' name='addItemId'/>
        <input required type='text' placeholder='Brand Name*' name='brandName'/>
        <input required type='text' placeholder='Company Name*' name='companyName'/>
        <input required type='number' step={1} min={1} placeholder='Quantity*' name='quantity'/>
        <input required type='number' step={0.01} placeholder='Cost Per Unit*' name='costPerUnit'/>
        <input required type='number' step={0.01} placeholder='Price Per Unit*' name='pricePerUnit'/>
        <input required type='number' step={0.01} min={0} max={1} placeholder='Discount*' name='discount'/>
        <input required type='date' placeholder='Manufacture At*' name='manufactureAt' />
        <input type='date' placeholder='Expire At' name='expireAt' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

function UpdateItem({ organizationId, branchId, refreshItems }: ItemsEditorProps) {
  const formRef = useRef<HTMLFormElement>(null)
  const [updateItem] = useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UPDATE_ITEM)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if(!formRef.current) return
    const form = new FormData(formRef.current)
    const expireAt = form.get('expireAt')
    const manufactureAt = form.get('manufactureAt')
    const variables: UpdateItemMutationVariables = {
      organizationId,
      branchId,
      updateItemId: form.get('updateItemId')?.toString() || '',
      brandName: form.get('brandName')?.toString() || undefined,
      companyName: form.get('companyName')?.toString() || undefined,
      quantity: Number(form.get('quantity')?.toString()) || undefined,
      costPerUnit: Number(form.get('costPerUnit')?.toString()) || undefined,
      pricePerUnit: Number(form.get('pricePerUnit')?.toString()) || undefined,
      discount: Number(form.get('discount')?.toString()) || undefined,
      manufactureAt: manufactureAt !== null ? new Date(manufactureAt.toString()).getTime() : undefined,
      expireAt: expireAt !== null ? new Date(expireAt.toString()).getTime() : undefined,
    }
    toast.promise<unknown, GraphQLError>(
      queuePromise([
        () => updateItem({ variables }),
        () => refreshItems()
      ]) ,
      {
        pending: 'Updating Item',
        success: 'Item Updated',
        error: {
          render(error){
            return error.data?.message
          }
        }
      }
    )
  }

  return (
    <div className={styles.addItemEditor}>
      <form onSubmit={handleSubmit} ref={formRef}>
        <input required type='text' placeholder='Item ID*' name='updateItemId'/>
        <input type='text' placeholder='Brand Name' name='brandName'/>
        <input type='text' placeholder='Company Name' name='companyName'/>
        <input type='number' step={1} min={1} placeholder='Quantity' name='quantity'/>
        <input type='number' step={0.01} placeholder='Cost Per Unit' name='costPerUnit'/>
        <input type='number' step={0.01} placeholder='Price Per Unit' name='pricePerUnit'/>
        <input type='number' step={0.01} min={0} max={1} placeholder='Discount' name='discount'/>
        <input type='date' placeholder='Manufacture At' name='manufactureAt' />
        <input type='date' placeholder='Expire At' name='expireAt' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

function ItemsEditor(props: ItemsEditorProps) {
  
  const optionClassName = ({ isActive }: { isActive: boolean, isPending: boolean }) => `${styles.option} ${isActive && styles.active}`

  return (
    <div className={styles.itemsEditorContainer}>
      <div className={styles.itemEditorOptions}>
        <NavLinkPersist className={optionClassName} to='item-add'>Add Item</NavLinkPersist>
        <NavLinkPersist className={optionClassName} to='item-update'>Update Item</NavLinkPersist>
      </div>
      <Routes>
        <Route path='item-add' element={<AddItem {...props}/>}/>
        <Route path='item-update' element={<UpdateItem {...props}/>}/>
      </Routes>
    </div>
  )
}

export function StockPage({ organizationId }: StockPageProps) {

  const { branchId } = useParams()

  const items = useQuery<GetItemsQuery,GetItemsQueryVariables>(GET_ITEMS, {
    variables: { branchId: branchId!, organizationId },
  })
  
  const [deleteItem] = useMutation<DeleteItemMutation, DeleteItemMutationVariables>(DELETE_ITEM)

  if(branchId === undefined) {
    return (
      <NotFoundPage />
    )
  }

  const handleDeleteItem = (id: string) => {
    toast.promise<unknown, GraphQLError>(
      queuePromise([
        () => deleteItem({ variables: {branchId: branchId, organizationId: organizationId, deleteItemId: id}}),
        () => items.refetch(),
      ]),
      {
        pending: 'Deleting Item',
        success: 'Item Deleted',
        error: {
          render(error){
            return error.data?.message
          }
        }
      }
    )
  }

  if(items.error) {
    toast.error(items.error.message)
  }

  const containerClassName = `${styles.container} ${items.loading ? 'loading-top' : null}`

  const stock = new BranchProxy({name: branchId, id: branchId})
  if(items.data?.items)
    stock.setItems(items.data.items)

  return (
    <div className={containerClassName}>
      <ItemsEditor organizationId={organizationId} branchId={branchId} refreshItems={items.refetch} />
      <div className={styles.header}>Stock Management Page</div>
      <Table className={styles.stockTable}>
        <TableHead>
          <th>#</th>
          <th></th>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Cost / Unit</th>
          <th>Price / Unit</th>
          <th>Margin</th>
          <th>Discount</th>
          <th>PL / Unit</th>
        </TableHead>
        <TableBody>
          {
            stock.items.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td className={styles.buttonBlock}>
                  <IconButton
                    onClick={() => handleDeleteItem(item.id)}
                    title={`Remove ${item.brandName} from Stock`}><TrashIcon /></IconButton>
                </td>
                <td>{item.id}</td>
                <td>{item.brandName}</td>
                <td>{item.quantity}</td>
                <td>{currency.format(item.costPerUnit)}</td>
                <td>{currency.format(item.pricePerUnit)}</td>
                <td>{currency.format(item.marginPerUnit)}</td>
                <td>{percent.format(item.discount)}</td>
                <td>{currency.format(item.profitLossPerUnit)}</td>
              </tr>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}