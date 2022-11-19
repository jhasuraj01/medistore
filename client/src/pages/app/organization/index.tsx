import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppSectionLayout, Page } from '../../../components/AppSectionLayout'
import { LoaderRipple } from '../../../components/Loader/Ripple'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../../gql/graphql'
import { NavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { PendingOrganizationSetup } from '../../errors/pending-organization-setup'
import { BranchesPage } from './branches'

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
        <SubNavLink to='branches'>Branches</SubNavLink>
        {/* <SubNavLink to='staffs'>Staffs</SubNavLink> */}
      </SubNavSection>
    </SubNav>
  )
}

export function OrganizationPage() {

  const { loading, error, data } = useQuery<GetCurrentUserQuery,GetCurrentUserQueryVariables>(GET_CURRENTUSER)

  const organizationId = data?.currentUser.organizationId
  const errorMessage = error?.message

  useEffect(() => {
    if(errorMessage !== undefined && loading === false) {
      console.log(loading, errorMessage, data)
      toast.error(errorMessage)
    }
  }, [errorMessage, loading])

  if(loading) {
    return <LoaderRipple />
  }

  if(organizationId === undefined) {
    return (
      <Page>
        <PendingOrganizationSetup
          header='Manage Organization'
          message='Add New Branch to Your Organization Here!'/>
      </Page>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<OrganizationPageSubNav />}  />} >
        <Route index element={<NavigatePersist to='branches' />} />
        <Route path='branches' element={<BranchesPage organizationId={organizationId} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}