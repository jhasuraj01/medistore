import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { NavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { AboutPage } from './about'

function HomePageSubNav() {
  return (
    <SubNav title='Home'>
      <SubNavSection>
        <SubNavLink to='about'>About</SubNavLink>
        <SubNavLink to='plans'>Plans</SubNavLink>
        <SubNavLink to='contacts'>Contacts</SubNavLink>
      </SubNavSection>
    </SubNav>
  )
}

export function HomePage() {
  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<HomePageSubNav />}  />} >
        <Route index element={<NavigatePersist to='about' />} />
        <Route path='about' element={<AboutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}