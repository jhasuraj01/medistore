import styles from './index.module.scss'
import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { AppSectionLayout } from '../../../components/AppSectionLayout'
import { Cart } from '../../../features/Carts'
import { addNewCart, selectCarts, } from '../../../features/Carts/cartsSlice'
import { SubNav, SubNavButton, SubNavLink, SubNavSection } from '../../../features/SubNav'
import { useNavigatePersist } from '../../../supports/Persistence'
import { NotFoundPage } from '../../404'
import { CartHomePage } from './CartHomePage'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { GetBranchesQuery, GetBranchesQueryVariables, GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../../gql/graphql'
import { toast } from 'react-toastify'

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

function CartPageSubNav() {
  const carts = useAppSelector(selectCarts)
  const dispatch = useAppDispatch()
  const navigate = useNavigatePersist()

  const createNewCart = () => {
    const id = String(Date.now())
    dispatch(addNewCart({ id }))
    navigate(id)
  }

  return (
    <SubNav title='Carts'>
      <SubNavSection>
        <SubNavButton className={styles.newCartButton} onClick={createNewCart}>Create New Cart</SubNavButton>
        { carts.map(cart => <SubNavLink key={cart.id} to={cart.id}>{cart.id}</SubNavLink>)}
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
      loading: branchesLoading,
      data: branchesData,
      error: branchesError,
    }
  ] = useLazyQuery<GetBranchesQuery, GetBranchesQueryVariables>(GET_BRANCHES)

  if(!currentUserLoading && currentUserData && !loadBranchesCalled) {
    loadBranches({
      variables: {
        organizationId: currentUserData.currentUser.organizationId
      }
    })
  }

  if(currentUserError) {
    toast.error(currentUserError.message)
  }

  if(branchesError) {
    toast.error(branchesError.message)
  }

  const organizationId = currentUserData?.currentUser.organizationId
  const branches = branchesData?.branches || []

  return (
    <Routes>
      <Route path='/' element={<AppSectionLayout subnav={<CartPageSubNav />}  />} >
        <Route index element={<CartHomePage />} />
        <Route path=':id' element={<Cart organizationId={organizationId} branches={branches}/>} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}