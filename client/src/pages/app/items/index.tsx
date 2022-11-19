import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout, Page } from '../../../components/AppSectionLayout'
import { SubNav, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { useNavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { StockPage } from './branch'
import { BranchesHomePage } from './BranchesHomePage'
import { gql, useQuery } from '@apollo/client'
import { GetBranchesQuery, GetBranchesQueryVariables, GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../../gql/graphql'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoaderRipple } from '../../../components/Loader/Ripple'
import { PendingOrganizationSetup } from '../../errors/pending-organization-setup'
import styles from './index.module.scss'

const GET_CURRENTUSER = gql`
  query GetCurrentUser {
    currentUser {
      organizationId
    }
  }
`

const GET_BRANCHES = gql`
  query GetBranches($organizationId: ID!) {
    branches(organizationId: $organizationId) {
      id
      name
    }
  }
`

function BranchesPageSubNav({organizationId}: {organizationId: string}) {
  const { loading, data } = useQuery<GetBranchesQuery, GetBranchesQueryVariables>(GET_BRANCHES, {
    variables: {
      organizationId: organizationId
    }
  })

  return (
    <SubNav title='Stock Management' className={loading ? 'loading-top' : undefined}>
      <SubNavSection>
        { data?.branches.length == 0 &&
          <SubNavLink to='../../organization/branches' className={styles.styledSubNavButton}>Create New Branch</SubNavLink>
        }
        {
          data?.branches.map(branch => {
            return (
              <SubNavLink key={branch.id} to={branch.id}>{branch.name}</SubNavLink>
            )
          })
        }
      </SubNavSection>
    </SubNav>
  )
}

export function ItemsPage() {

  const { loading, error, data } = useQuery<GetCurrentUserQuery,GetCurrentUserQueryVariables>(GET_CURRENTUSER)
  const navigate = useNavigatePersist()

  const organizationId = data?.currentUser?.organizationId
  const errorMessage = error?.message

  useEffect(() => {
    if(organizationId === null && !loading) {
      toast.error('Setup Your Organization to Continue!')
      navigate({pathname: '/setup', search: 'return=/app/branches'})
    }
  }, [organizationId, loading])

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
          header='Stock Management'
          message='Add New Products, Update Existing Products, View Available Stocks'/>
      </Page>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<BranchesPageSubNav {...{organizationId}}/>}  />} >
        <Route index element={<BranchesHomePage />} />
        <Route path=':branchId/*' element={<StockPage organizationId={organizationId} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}