import styles from './index.module.scss'
import Barcode from 'react-barcode'
import QRCode from 'react-qr-code'

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
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <div className={styles.h1}>MediStore</div>
          <div className={styles.h2}>{props.organizationName}</div>
          <div className={styles.h3}>{props.branchName}</div>
          <div>Invoice: {props.billId}</div>
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
              <div className={styles.tableCell}>Name</div>
              <div className={styles.tableCell}>Price/Unit</div>
              <div className={styles.tableCell}>Qty</div>
              <div className={styles.tableCell}>Discount</div>
              <div className={styles.tableCell}>Total</div>
            </div>
            {
              props.items.map((item, index) => (
                <div className={styles.tableRow} key={item.id}>
                  <div className={styles.tableCell}>{index + 1}</div>
                  <div className={styles.tableCell}>{item.brandName}</div>
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