import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../components/AppSectionLayout'
import { Cart } from '../../features/Cart'
import { SubNav, SubNavButton, SubNavLink, SubNavSection } from '../../features/SubNav'
import { NavigatePersist, useNavigatePersist } from '../../supports/Persistence'
import { NotFoundPage } from '../404'

function CartPageSubNav() {
  const [carts, setCarts] = useState<string[]>([])
  const navigate = useNavigatePersist()

  const createNewBill = () => {
    const id = String(Date.now())
    setCarts([id, ...carts])
    navigate(id)
  }

  return (
    <SubNav title='Carts'>
      <SubNavSection>
        <SubNavButton onClick={createNewBill}>Create New Cart</SubNavButton>
        { carts.map(cart => <SubNavLink key={cart} to={cart}>{cart}</SubNavLink>)}
        <SubNavLink to='sample-cart'>Sample Bill</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function CartPage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<CartPageSubNav />}  />} >
        <Route index element={<NavigatePersist to='create-new-bill' />} />
        <Route path=':id' element={<Cart />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}