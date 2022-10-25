import { ReactNode } from 'react'
import style from './index.module.scss'

interface PageProps {
  children: ReactNode | ReactNode[]
}

export function Page({ children }: PageProps) {
  return (
    <div className={style.page}>
      {children}
    </div>
  )
}