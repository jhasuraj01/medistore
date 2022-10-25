import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../components/AppSectionLayout'
import { SubNav, SubNavLink, SubNavSection } from '../../features/SubNav'
import { NavigatePersist } from '../../supports/Persistence'
import { NotFoundPage } from '../404'

function SalesPageSubNav() {
  return (
    <SubNav title='Search'>
      <SubNavSection>
        <SubNavLink to='create-new-bill'>Create New Bill</SubNavLink>
        <SubNavLink to='draft-bill-1'>Draft Bill 1</SubNavLink>
        <SubNavLink to='draft-bill-2'>Draft Bill 2</SubNavLink>
        <SubNavLink to='draft-bill-3'>Draft Bill 3</SubNavLink>
        <SubNavLink to='draft-bill-4'>Draft Bill 4</SubNavLink>
        <SubNavLink to='draft-bill-5'>Draft Bill 5</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function SalesPage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<SalesPageSubNav />}  />} >
        <Route index element={<NavigatePersist to='create-new-bill' />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}