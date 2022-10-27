import { Table, TableBody, TableFooter, TableHead } from '../../../components/Table'
import styles from './index.module.scss'

export function StockPage() {
  return (
    <div className={styles.container}>
      <h2>Stock Management Page</h2>
      <Table className={styles.table}>
        <TableHead>
          <th>#</th>
          <th>Name</th>
          <th>Quantity</th>
        </TableHead>
        <TableBody>
          <tr>
            <td>1</td>
            <td>Detol Hand Wash</td>
            <td>50</td>
          </tr>
        </TableBody>
        <TableFooter>
          <td></td>
          <td></td>
          <td>50</td>
        </TableFooter>
      </Table>
    </div>
  )
}