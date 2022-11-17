import { gql, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Page } from '../../../../components/AppSectionLayout'
import { Bill } from '../../../../components/Bill'
import { BillDataQuery, BillDataQueryVariables } from '../../../../gql/graphql'
import styles from './index.module.scss'

const GET_BILL_DATA = gql`
  query BillData($organizationId: ID!, $branchId: ID!, $billId: ID!) {
    bill(organizationId: $organizationId, branchId: $branchId, billId: $billId) {
      createdAt
      customerEmail
      customerName
      customerPhone
      items {
        id
        brandName
        costPerUnit
        discount
        pricePerUnit
        quantity
      }
      priceTotal
      costTotal
      discountedPriceTotal
      totalItems
    }
    organization(id: $organizationId) {
      name
    }
    branch(organizationId: $organizationId, branchId: $branchId) {
      name
    }
  }
`

export interface BillPageProps {
  organizationId: string
}

export function BillPage({ organizationId }: BillPageProps) {
  const { branchId, billId } = useParams()

  if(branchId === undefined || billId === undefined)
    throw new Error('Required BranchID and BillID to Fetch Bill Data')

  const {loading, error, data} = useQuery<BillDataQuery, BillDataQueryVariables>(GET_BILL_DATA, {
    variables: { organizationId, branchId, billId }
  })

  if(error) {
    return (
      <Page>
        <div>{error.message}</div>
      </Page>
    )
  }

  if(loading) {
    return (
      <Page className='loading-top'></Page>
    )
  }

  return (
    <Page className={`${styles.container} ${loading ? 'loading-top' : ''}`}>
      {
        data &&
        <Bill
          organizationName={data.organization.name}
          organizationId={organizationId}
          branchId={branchId}
          branchName={data.branch.name}
          billId={billId}
          customerEmail={data.bill.customerEmail}
          customerName={data.bill.customerName}
          customerPhone={data.bill.customerPhone}
          discountedPriceTotal={data.bill.discountedPriceTotal}
          items={data.bill.items}
        />
      }
    </Page>
  )
}