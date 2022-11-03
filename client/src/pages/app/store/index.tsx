import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { NavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { StockPage } from './stock'

function StorePageSubNav() {
  return (
    <SubNav title='Store'>
      <SubNavSection>
        <SubNavLink to='stock'>Stock</SubNavLink>
        <SubNavLink to='orders'>Orders</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function StorePage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<StorePageSubNav />}  />} >
        <Route index element={<NavigatePersist to='stock' />} />
        <Route path='stock' element={<StockPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}