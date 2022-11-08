import { Route, Routes } from 'react-router-dom'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { SubNav, SubNavButton, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { useNavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { StockPage } from './branch'
import styles from './index.module.scss'
import { BranchesHomePage } from './BranchesHomePage'
import { gql, useQuery } from '@apollo/client'
import { GetBranchesQuery, GetBranchesQueryVariables, GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../../gql/graphql'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { LoaderRipple } from '../../../components/Loader/Ripple'

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
  const { loading, error, data } = useQuery<GetBranchesQuery, GetBranchesQueryVariables>(GET_BRANCHES, {
    variables: {
      organizationId: organizationId
    }
  })

  return (
    <SubNav title='Branches' className={loading ? 'loading-top' : undefined}>
      <SubNavSection>
        <SubNavButton className={styles.newStoreButton}>Create New Branch</SubNavButton>
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

export function BranchesPage() {

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

  if(loading || !organizationId) {
    return <LoaderRipple />
  }

  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<BranchesPageSubNav {...{organizationId}}/>}  />} >
        <Route index element={<BranchesHomePage />} />
        <Route path=':branchId' element={<StockPage organizationId={organizationId} />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}