import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { LoaderRipple } from '../../../components/Loader/Ripple'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../../gql/graphql'
import { NavigatePersist, useNavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { StoresPage } from './stores'

const GET_CURRENTUSER = gql`
  query GetCurrentUser {
    currentUser {
      organizationId
    }
  }
`

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

  const { loading, error, data } = useQuery<GetCurrentUserQuery,GetCurrentUserQueryVariables>(GET_CURRENTUSER)
  const navigate = useNavigatePersist()

  const organizationId = data?.currentUser?.organizationId
  const errorMessage = error?.message

  useEffect(() => {
    if(organizationId === null && !loading) {
      toast.error('Setup Your Organization to Continue!')
      navigate({pathname: '/setup', search: 'return=/app/organization'})
    }
  }, [organizationId, loading])

  useEffect(() => {
    if(errorMessage !== undefined && loading === false) {
      console.log(loading, errorMessage, data)
      toast.error(errorMessage)
    }
  }, [errorMessage, loading])

  if(loading || !organizationId) {
    return <LoaderRipple />
  }

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