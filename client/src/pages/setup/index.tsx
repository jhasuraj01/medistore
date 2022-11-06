import { gql, useQuery } from '@apollo/client'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { selectAuth } from '../../features/Auth/authSlice'
import { GetCurrentUserQuery, GetCurrentUserQueryVariables } from '../../gql/graphql'
import { ReactComponent as Ripple } from '../../icons/ripple.svg'
import { NavigatePersist, useNavigatePersist } from '../../supports/Persistence'
import { NotFoundPage } from '../404'
import { CreateOrganizationPage } from './CreateOrganizationPage'
import styles from './index.module.scss'
import { OrganizationSetupLayout } from './layout'

const GET_CURRENTUSER = gql`
  query GetCurrentUser {
    currentUser {
      organizationId
    }
  }
`

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

  const navigateNext = () => {
    setTimeout(() => {
      navigate({
        pathname: returnAddress,
        search: ''
      })
    }, 1)
  }

  
  if(data.currentUser?.organizationId) {
    navigateNext()
  }

  return (
    <Routes>
      <Route index element={<NavigatePersist to='organization/create' />} />
      <Route path='organization' element={<OrganizationSetupLayout onSkip={navigateNext}/>}>
        <Route path='create' element={<CreateOrganizationPage navigateNext={navigateNext}/>} />
        <Route path='join' element={<div style={{ textAlign: 'center' }}>Coming Soon!</div>} />
        <Route path='invitations' element={<div style={{ textAlign: 'center' }}>Coming Soon!</div>} />
      </Route>
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}