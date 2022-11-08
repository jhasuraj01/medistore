import { Table, TableBody, TableHead } from '../../../../components/Table'
import styles from './index.module.scss'

const stock = [
  {
    id: '123456',
    name: 'Detol HandWash',
    quantity: 50,
    costPerUnit: 85,
    pricePerUnit: 100,
    discount: 0.1
  },
]

interface StockPageProps {
  organizationId: string
}

export function StockPage({ organizationId }: StockPageProps) {

  


  return (
    <div className={styles.container}>
      <div className={styles.header}>Stock Management Page</div>
      <Table className={styles.stockTable}>
        <TableHead>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Cost / Unit</th>
          <th>Price / Unit</th>
          <th>Margin</th>
          <th>Discount</th>
          <th>PL / Unit</th>
        </TableHead>
        <TableBody>
          {
            stock.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.costPerUnit}</td>
                <td>{item.pricePerUnit}</td>
                <td>{item.pricePerUnit - item.costPerUnit}</td>
                <td>{item.discount}</td>
                <td>{item.pricePerUnit * (1 - item.discount) - item.costPerUnit}</td>
              </tr>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}