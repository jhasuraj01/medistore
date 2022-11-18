import styles from './index.module.scss'
import Barcode from 'react-barcode'
import QRCode from 'react-qr-code'
import { BillDataQuery, BillDataQueryVariables } from '../../gql/graphql'
import { gql, useQuery } from '@apollo/client'
import { PDFExport } from '@progress/kendo-react-pdf'
import { useRef } from 'react'

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

const currency = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const percent = new Intl.NumberFormat('en-IN', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export interface BillProps {
  organizationName: string
  organizationId: string
  branchId: string
  branchName: string
  billId: string
  customerEmail: string
  customerName: string
  customerPhone: string
  discountedPriceTotal: number
  createdAt: number
  items: {
    id: string
    brandName: string
    costPerUnit: number
    discount: number
    pricePerUnit: number
    quantity: number
  }[]
}

export function Bill(props: BillProps) {

  return (
    <div className={styles.billContainer}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.h1}>MediStore</div>
          <div className={styles.h2}>{props.organizationName}</div>
          <div className={styles.h3}>{props.branchName}</div>
          <div>Invoice: {props.billId}</div>
          <div>{new Date(props.createdAt).toString()}</div>
        </div>
        <div className={styles.colQRCode}>
          <QRCode size={150} bgColor='white' fgColor='currentColor' value={props.billId} />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div>Bill To,</div>
          <div>{props.customerName}</div>
          <div>Email: {props.customerEmail}</div>
          <div>Phone: {props.customerPhone}</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.table}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>#</div>
              <div className={styles.tableCellLeft}>Name</div>
              <div className={styles.tableCell}>Price/Unit</div>
              <div className={styles.tableCell}>Qty</div>
              <div className={styles.tableCell}>Discount</div>
              <div className={styles.tableCell}>Total</div>
            </div>
            {
              props.items.map((item, index) => (
                <div className={styles.tableRow} key={item.id}>
                  <div className={styles.tableCell}>{index + 1}</div>
                  <div className={styles.tableCellLeft}>{item.brandName}</div>
                  <div className={styles.tableCellRight}>{currency.format(item.costPerUnit)}</div>
                  <div className={styles.tableCell}>{item.quantity}</div>
                  <div className={styles.tableCellRight}>{percent.format(item.discount)}</div>
                  <div className={styles.tableCellRight}>{currency.format(item.pricePerUnit * item.quantity * (1 - item.discount))}</div>
                </div>
              ))
            }
            <div className={styles.tableFooter}>
              <div className={styles.tableCellRight}>Total Bill Value</div>
              <div className={styles.tableCellRight}>{currency.format(props.discountedPriceTotal)}</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.colCenter}>
          <Barcode value={props.billId} />
        </div>
      </div>
      <hr />
      <div className={styles.row}>
        <div className={styles.col}>
          <div>Branch Id: {props.branchId}</div>
          <div>Organization Id: {props.organizationId}</div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.colCenter}>
          <hr />
        </div>
        <div>Thank You</div>
        <div className={styles.colCenter}>
          <hr />
        </div>
      </div>
    </div>
  )
}

export interface BillProviderProps {
  organizationId: string
  branchId: string
  billId: string
}

export function BillProvider({ organizationId, branchId, billId }: BillProviderProps) {
  
  const billRef = useRef<PDFExport>(null)

  const {loading, error, data} = useQuery<BillDataQuery, BillDataQueryVariables>(GET_BILL_DATA, {
    variables: { organizationId, branchId, billId }
  })

  if(error) {
    return (
      <div>
        <div>{error.message}</div>
      </div>
    )
  }

  if(loading || data == undefined) {
    return (
      <div className='loading-top'></div>
    )
  }

  const downloadBill = () => {
    if(billRef.current === null) return
    billRef.current.save()
  }

  return (
    <div>
      <PDFExport ref={billRef} paperSize='A4' scale={0.5}>
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
          createdAt={data.bill.createdAt}
        />
      </PDFExport>
      <div className={styles.toolbar}>
        <button onClick={downloadBill}>Download Bill</button>
      </div>
    </div>
  )
}