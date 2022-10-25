import styles from './index.module.scss'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AppSectionLayout } from '../../components/AppSectionLayout'
import { Cart } from '../../features/Carts'
import { addNewCart, selectCarts, } from '../../features/Carts/cartsSlice'
import { SubNav, SubNavButton, SubNavLink, SubNavSection } from '../../features/SubNav'
import { useNavigatePersist } from '../../supports/Persistence'
import { NotFoundPage } from '../404'
import { CartHomePage } from './CartHomePage'



function CartPageSubNav() {
  const carts = useAppSelector(selectCarts)
  const dispatch = useAppDispatch()
  const navigate = useNavigatePersist()

  const createNewCart = () => {
    const id = String(Date.now())
    dispatch(addNewCart({ id }))
    navigate(id)
  }

  return (
    <SubNav title='Carts'>
      <SubNavSection>
        <SubNavButton className={styles.newCartButton} onClick={createNewCart}>Create New Cart</SubNavButton>
        { carts.map(cart => <SubNavLink key={cart.id} to={cart.id}>{cart.id}</SubNavLink>)}
      </SubNavSection>
    </SubNav>
  )
}

export function CartPage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<CartPageSubNav />}  />} >
        <Route index element={<CartHomePage />} />
        <Route path=':id' element={<Cart />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}