import { useParams } from 'react-router-dom'
import { NotFoundPage } from '../../pages/404'

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

  return (
    <p>Cart: {id}</p>
  )
}