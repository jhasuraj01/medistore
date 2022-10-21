import { useQuery, gql } from '@apollo/client'
import { GetMetaDataQuery, GetMetaDataQueryVariables } from '../../../gql/graphql'
import styles from './index.module.scss'

const GET_METADATA = gql`
  query GetMetaData {
    metadata {
      platform
      buildAt
      version
    }
  }
`

export function AboutPage() {
  const { loading, error, data } = useQuery<GetMetaDataQuery, GetMetaDataQueryVariables>(GET_METADATA)

  let metadata: string[][] = []

  if(loading) {
    metadata = [
      ['App Version', 'Loading...'],
      ['Build Time', 'Loading...'],
      ['Build Platform', 'Loading...'],
    ]
  }

  if(error) {
    const msg = 'Failed to Load App Meta Data!'
    metadata = [
      ['App Version', msg],
      ['Build Time', msg],
      ['Build Platform', msg],
    ]
  }

  if(data?.metadata) {
    metadata = [
      ['App Version', data.metadata.version],
      ['Build Time', data.metadata.buildAt],
      ['Build Platform', data.metadata.platform],
    ]
  }
  

  return (
    <div className={styles.container}>
      <h2>About App</h2>
      {
        metadata.map(([key, value]) => {
          return <div className={styles.records} key={key}>
            <div>{key}</div>
            <div>{value}</div>
          </div>
        })
      }
    </div>
  )
}
