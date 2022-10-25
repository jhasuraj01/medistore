import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../components/AppSectionLayout'
import { SubNav, SubNavButton, SubNavLink, SubNavSection } from '../../features/SubNav'
import { NavigatePersist } from '../../supports/Persistence'
import { NotFoundPage } from '../404'

function CartPageSubNav() {
  const [carts, setCarts] = useState<string[]>([])

  const createNewBill = () => {
    setCarts([String(Date.now()), ...carts])
  }

  return (
    <SubNav title='Search'>
      <SubNavSection>
        <SubNavButton onClick={createNewBill}>Create New Cart</SubNavButton>
        { carts.map(cart => <SubNavLink key={cart} to={cart}>{cart}</SubNavLink>)}
        <SubNavLink to='Sample Cart'>Sample Bill</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function CartPage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<CartPageSubNav />}  />} >
        <Route index element={<NavigatePersist to='create-new-bill' />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}