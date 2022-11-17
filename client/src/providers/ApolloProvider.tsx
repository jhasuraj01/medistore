import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { useAppSelector } from '../app/hooks'
import { selectAuthToken } from '../features/Auth/authSlice'

const httpLink = createHttpLink({
  uri: '/graphql',
})

export interface ApolloProviderProxyProps {
  children: React.ReactNode
}
export function ApolloProviderProxy({ children }: ApolloProviderProxyProps) {

  const authToken = useAppSelector(selectAuthToken)

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authToken ? `Bearer ${authToken}` : '',
      }
    }
  })
  
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  )
}