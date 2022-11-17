import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { NavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'

function SearchPageSubNav() {
  return (
    <SubNav title='Search'>
      <SubNavSection>
        <SubNavLink to='previous-bills'>Previous Bills</SubNavLink>
        <SubNavLink to='medicines'>Medicines</SubNavLink>
        <SubNavLink to='people'>People</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function SearchPage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<SearchPageSubNav />}  />} >
        <Route index element={<NavigatePersist to='previous-bills' />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}