import { useRef } from 'react'
import styles from './index.module.scss'
import { gql, useMutation } from '@apollo/client'
import { MutationSetupOrganizationArgs, SetupOrganizationMutation } from '../../../gql/graphql'
import { toast } from 'react-toastify'
import { GraphQLError } from 'graphql'

const SETUP_ORGANIZATION = gql`
  mutation SetupOrganization($name: String!) {
    setupOrganization(name: $name) {
      organizationId
    }
  }
`

export function CreateOrganizationPage({ navigateNext }: { navigateNext: () => void}) {

  const inputRef = useRef<HTMLInputElement>(null)
  const [mutateFunction, { data, loading }] = useMutation<SetupOrganizationMutation, MutationSetupOrganizationArgs>(SETUP_ORGANIZATION)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    if(!inputRef.current || loading) return
    event.preventDefault()
    event.stopPropagation()
    const name = inputRef.current.value
    toast.promise<unknown, GraphQLError>(
      mutateFunction({ variables: { name } }),
      {
        pending: 'Creating Organization',
        success: 'Organization Created',
        error: {
          render(error){
            return error.data?.message
          }
        }
      }
    )
  }

  if(data?.setupOrganization.organizationId) {
    navigateNext()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={loading ? 'loading-bottom' : undefined}>
          <input
            ref={inputRef}
            required
            autoFocus
            placeholder='Enter Organization Name'
            pattern='^[a-zA-Z\s]+$'
            title='Organization name must be at least 3 characters long and contain only English letters and spaces'
            minLength={3}
            maxLength={20}
            type='text'
            name='organizationName'
            disabled={loading} />
        </div>
        <button type='submit' disabled={loading}>Create Organization</button>
      </form>
    </div>
  )
}