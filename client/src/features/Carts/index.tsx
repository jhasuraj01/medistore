import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { NotFoundPage } from '../../pages/404'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { nextCart, prevCart, removeCart } from './cartsSlice'
import { useNavigatePersist } from '../../supports/Persistence'

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
  const next = useAppSelector(nextCart(id))
  const prev = useAppSelector(prevCart(id))

  const handleDeleteCart = () => {
    dispatch(removeCart({ id }))
    if(next) navigate('../' + next)
    else if(prev) navigate('../' + prev)
    else navigate('../')
  }

  return (
    <div className={styles.container}>
      <p>Selected Cart ID: <b>{id}</b></p>
      <button onClick={handleDeleteCart}>Delete Cart</button>
    </div>
  )
}