import { gql, useMutation, useQuery } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { toast } from 'react-toastify'
import { Page } from '../../../../components/AppSectionLayout'
import { CreateBranchMutation, CreateBranchMutationVariables, GetBranchesQuery, GetBranchesQueryVariables } from '../../../../gql/graphql'
import styles from './index.module.scss'

const GET_BRANCHES = gql`
  query GetBranches($organizationId: ID!) {
    branches(organizationId: $organizationId) {
      id
      name
    }
  }
`

const CREATE_BRANCH = gql`
  mutation CreateBranch($name: String!, $organizationId: ID!) {
    createBranch(name: $name, organizationId: $organizationId) {
      id
      name
    }
  }
`

export interface BranchCardProps {
  name: string
  id: string
  className?: string
}

export function BranchCard({ name, id, className}: BranchCardProps) {
  return (
    <div className={`${styles.branch} ${className || ''}`}>
      <div className={styles.branchName}>{name}</div>
      <div className={styles.branchId}>{id}</div>
    </div>
  )
}

export interface BranchesPageProps {
  organizationId: string
}

export function BranchesPage({ organizationId }: BranchesPageProps) {
  const { loading: branchesLoading, data: branchesData } = useQuery<GetBranchesQuery, GetBranchesQueryVariables>(GET_BRANCHES, {
    variables: {
      organizationId: organizationId
    }
  })
  const [createBranch] = useMutation<CreateBranchMutation, CreateBranchMutationVariables>(CREATE_BRANCH, {
    refetchQueries: [
      'GetBranches' // Query name
    ],
  })

  const handleCreateBranch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    const data = new FormData(event.currentTarget)
    const branchName = data.get('branchName') as string | null
    if(branchName === null)
      throw new Error('Branch Name is Null!')

    toast.promise<unknown, GraphQLError>(
      createBranch({
        variables: {
          name: branchName,
          organizationId,
        }
      }),
      {
        pending: 'Creating Branch',
        error: {
          render({ data }) {
            return data?.message
          }
        },
        success: 'Branch Created!'
      }
    )
  }

  return (
    <Page className={styles.container}>
      <form onSubmit={handleCreateBranch} className={styles.createBranchForm}>
        <input
          type="text"
          placeholder='Enter Branch Name'
          name='branchName'
          id='branchName'
          className={styles.branchName}
          required />
        <button type='submit' className={styles.submit}>Create Branch</button>
      </form>
      <div className={styles.branches}>
        {
          branchesLoading ?
            <>
              <BranchCard className='loading-shine' name=' ' id=' ' />
              <BranchCard className='loading-shine' name=' ' id=' ' />
              <BranchCard className='loading-shine' name=' ' id=' ' />
            </> :
            branchesData?.branches.map(branch => (
              <BranchCard key={branch.id} name={branch.name} id={branch.id} />
            ))
        }
      </div>
    </Page>
  )
}