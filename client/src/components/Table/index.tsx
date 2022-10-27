import React from 'react'
import styles from './index.module.scss'

interface TableHeadProps {
  children: React.ReactNode | React.ReactNode[]
}
export function TableHead({ children }: TableHeadProps) {
  return <> {children} </>
}

interface TableBodyProps {
  children?: React.ReactNode | React.ReactNode[]
}
export function TableBody({ children }: TableBodyProps) {
  return <> {children} </>
}

interface TableFooterProps {
  children: React.ReactNode | React.ReactNode[]
}
export function TableFooter({ children }: TableFooterProps) {
  return (
    <> {children} </>
  )
}

export interface TableProps extends Omit<React.HTMLAttributes<HTMLTableElement>, 'children'> {
  children: [
    React.ReactElement<typeof TableHead>,
    React.ReactElement<typeof TableBody>,
    React.ReactElement<typeof TableFooter>
  ] | [
    React.ReactElement<typeof TableHead>,
    React.ReactElement<typeof TableBody>
  ]
}

export function Table(props: TableProps) {

  const className = `${props.className || ''} ${styles.table}`
  const [head, body, foot] = props.children

  return (
    <table {...props} className={className}>
      <thead>
        <tr>
          {head}
        </tr>
      </thead>
      <tbody>
        {body}
      </tbody>

      {
        foot &&
        <tfoot>
          <tr>
            {foot}
          </tr>
        </tfoot>
      }
    </table>
  )
}