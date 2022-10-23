import { Outlet } from 'react-router-dom'
import { Nav } from '../Nav'
import styles from './index.module.scss'

export function AppLayout() {
  return (
    <div className={styles.container}>
      <Nav />
      <Outlet />
    </div>
  )
}