import styles from './index.module.scss'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AppSectionLayout, Page } from '../../../components/AppSectionLayout'
import { Cart } from '../../../features/Carts'
import { addNewCart, selectCarts, } from '../../../features/Carts/cartsSlice'
import { SubNav, SubNavButton, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { useNavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { CartHomePage } from './CartHomePage'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { Branch, GetBranchesQuery, GetBranchesQueryVariables, GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../../gql/graphql'
import { toast } from 'react-toastify'
import { LoaderRipple } from '../../../components/Loader/Ripple'
import { useEffect } from 'react'
import { PendingOrganizationSetup } from '../../errors/pending-organization-setup'

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

function CartPageSubNav({ branches }: { branches: Branch[]}) {
  const carts = useAppSelector(selectCarts)
  const dispatch = useAppDispatch()
  const navigate = useNavigatePersist()

  const createNewCart = () => {
    const id = String(Date.now())
    dispatch(addNewCart({ id, branchId: branches[0].id }))
    navigate(id)
  }

  return (
    <SubNav title='Carts'>
      <SubNavSection>
        { branches.length === 0 &&
          <SubNavLink to='../../organization/branches' className={styles.styledSubNavButton}>Create New Branch</SubNavLink>
        }
        { branches.length > 0 &&
          <SubNavButton className={styles.styledSubNavButton} onClick={createNewCart}>Create New Cart</SubNavButton>
        }
        { branches.length > 0 &&
          carts.map(cart => <SubNavLink key={cart.id} to={cart.id}>{cart.id}</SubNavLink>)
        }
      </SubNavSection>
    </SubNav>
  )
}

export function CartPage() {
  
  const {
    loading: currentUserLoading,
    error: currentUserError,
    data: currentUserData,
  } = useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GET_CURRENTUSER)

  const [
    loadBranches,
    {
      called: loadBranchesCalled,
      // loading: branchesLoading,
      data: branchesData,
      error: branchesError,
    }
  ] = useLazyQuery<GetBranchesQuery, GetBranchesQueryVariables>(GET_BRANCHES)

  const organizationId = currentUserData?.currentUser.organizationId
  const currentUserErrorMessage = currentUserError?.message

  useEffect(() => {
    if(currentUserErrorMessage !== undefined && currentUserLoading === false) {
      toast.error(currentUserErrorMessage)
    }
  }, [currentUserErrorMessage, currentUserLoading])

  if(!currentUserLoading && currentUserData && !loadBranchesCalled) {
    loadBranches({
      variables: {
        organizationId: currentUserData.currentUser.organizationId
      }
    })
  }

  if(branchesError) {
    toast.error(branchesError.message)
  }

  const branches = branchesData?.branches || []

  if(currentUserLoading) {
    return <LoaderRipple />
  }

  if(organizationId === undefined) {
    return (
      <Page>
        <PendingOrganizationSetup
          header='Customer Billing Point'
          message='Create New Cart, Scan Product&apos;s BarCode, Collect Payment, Generate Bill'/>
      </Page>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<CartPageSubNav branches={branches} />}  />} >
        <Route index element={<CartHomePage />} />
        <Route path=':id' element={<Cart organizationId={organizationId} branches={branches}/>} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}