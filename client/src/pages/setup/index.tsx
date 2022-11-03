import { gql, useQuery } from '@apollo/client'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/Auth/authSlice'
import { GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../gql/graphql'
import { ReactComponent as Ripple } from '../../icons/ripple.svg'
import { NavLinkPersist, useNavigatePersist } from '../../supports/Persistence'
import { NotFoundPage } from '../404'
import styles from './index.module.scss'

const GET_CURRENTUSER = gql`
  query GetCurrentUser {
    currentUser {
      organizationId
    }
  }
`

function AccountSetupMenu() {
  const [ params ] = useSearchParams()
  const returnAddress = params.get('return') || '/app'

  return (
    <div>
      <NavLinkPersist to='organization/create'>Create Organization</NavLinkPersist>
      <NavLinkPersist to='organization/join'>Join Organization</NavLinkPersist>
      <NavLinkPersist to='organization/invitations'>Organization Invitations</NavLinkPersist>
      <NavLinkPersist to={returnAddress}>Skip</NavLinkPersist>
    </div>
  )
}

export function AccountSetupPage() {

  const user = useAppSelector(selectAuth)
  const navigate = useNavigatePersist()
  const [ params ] = useSearchParams()
  const returnAddress = params.get('return') || '/app'
  const { loading, error, data } = useQuery<GetCurrentUserQuery,GetCurrentUserQueryVariables>(GET_CURRENTUSER)

  if(!user.active) {
    navigate({
      pathname: '/auth',
      search: `?return=${returnAddress}`
    })
  }

  if(loading || user.loading) {
    return (
      <div className={styles.spinnerContainer}>
        <Ripple />
      </div>
    )
  }

  if(error || !data) {
    return (
      <div>
        <div>Some Error has occured!</div>
        <div>{JSON.stringify(error)}</div>
      </div>
    )
  }

  
  if(data.currentUser?.organizationId) {
    setTimeout(() => {
      navigate({
        pathname: returnAddress,
        search: ''
      })
    }, 1)
  }

  return (
    <Routes>
      <Route index element={<AccountSetupMenu />}/>
      <Route path='organization'>
        <Route path='create' element={<div>Create Organization</div>} />
        <Route path='join' element={<div>Create Organization</div>} />
        <Route path='invitation' element={<div>Create Organization</div>} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}