import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { NavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { ProfilePage } from './profile'

function AccountPageSubNav() {
  return (
    <SubNav title='My Account'>
      <SubNavSection>
        <SubNavLink to='profile'>My Profile</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function AccountPage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<AccountPageSubNav />}  />} >
        <Route index element={<NavigatePersist to='profile' />} />
        <Route path='profile' element={<ProfilePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}