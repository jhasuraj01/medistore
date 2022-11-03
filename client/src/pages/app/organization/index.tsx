import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { NavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { StoresPage } from './stores'

function OrganizationPageSubNav() {
  return (
    <SubNav title='Organization'>
      <SubNavSection>
        <SubNavLink to='stores'>Stores</SubNavLink>
        <SubNavLink to='staffs'>Staffs</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function OrganizationPage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<OrganizationPageSubNav />}  />} >
        <Route index element={<NavigatePersist to='stores' />} />
        <Route path='stores' element={<StoresPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}