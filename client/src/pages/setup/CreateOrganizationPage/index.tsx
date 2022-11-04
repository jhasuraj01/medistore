import { useRef } from 'react'
import styles from './index.module.scss'
import { gql, useMutation } from '@apollo/client'
import { MutationSetupOrganizationArgs, SetupOrganizationMutation, SetupOrganizationResponse } from '../../../gql/graphql'

// Define mutation
const SETUP_ORGANIZATION = gql`
  mutation SetupOrganization($name: String!) {
    setupOrganization(name: $name) {
      ok
      code
      organizationId
    }
  }
`

export function CreateOrganizationPage({ navigateNext }: { navigateNext: () => void}) {

  const inputRef = useRef<HTMLInputElement>(null)
  const [mutateFunction, { data, loading, error }] = useMutation<SetupOrganizationMutation, MutationSetupOrganizationArgs>(SETUP_ORGANIZATION)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    if(!inputRef.current || loading) return
    event.preventDefault()
    event.stopPropagation()
    const name = inputRef.current.value
    await mutateFunction({ variables: { name } })
  }

  if(data?.setupOrganization.ok) {
    navigateNext()
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
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
          disabled={loading}/>
        <button type='submit' disabled={loading}>Create Organization</button>
        {loading && <div>Creating Organization</div>}
      </form>
    </div>
  )
}