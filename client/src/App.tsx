import { Route, Routes } from 'react-router-dom'
import { useAppDispatch } from './app/hooks'
import { NavigatePersist } from './supports/Persistence'
import { auth } from './firebase'
import { onAuthStateChanged, Unsubscribe } from 'firebase/auth'
import { useEffect } from 'react'
import { updateAuthState } from './features/Auth/authSlice'
import { NotFoundPage } from './pages/404'
import { AppLayout } from './components/AppLayout'
import styles from './App.module.scss'
import { AuthPage } from './pages/auth'
import { HomePage } from './pages/home'
import { SearchPage } from './pages/search'
import { SalesPage } from './pages/sales'
import { StorePage } from './pages/store'
import { AccountPage } from './pages/account'

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async () => await dispatch(updateAuthState()))
    return () => unsubscribe()
  }, [])

  return (
    <div className={styles.app}>
      <Routes>
        <Route index element={<NavigatePersist to='app' />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<NavigatePersist to='home' />} />
          <Route path='home/*' element={<HomePage />} />
          <Route path='search/*' element={<SearchPage />} />
          <Route path='sales/*' element={<SalesPage />} />
          <Route path='store/*' element={<StorePage />} />
          <Route path='account/*' element={<AccountPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route path='login' element={<NavigatePersist to='/auth' />} />
        <Route path='signup' element={<NavigatePersist to='/auth' />} />
        <Route path='auth' element={<AuthPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App