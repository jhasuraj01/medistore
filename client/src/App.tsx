import { Route, Routes } from 'react-router-dom'
import navData from './data/nav'
import { AppSectionLayout } from './components/AppSectionLayout'
import { useAppDispatch } from './app/hooks'
import { NavigatePersist } from './supports/Persistence'
import { auth } from './firebase'
import { onAuthStateChanged, Unsubscribe } from 'firebase/auth'
import { useEffect } from 'react'
import { updateAuthState } from './features/Auth/authSlice'
import { AboutPage } from './pages/about'
import { ProfilePage } from './pages/profile'
import { NotFoundPage } from './pages/404'
import { AppLayout } from './components/AppLayout'
import styles from './App.module.scss'
import { AuthPage } from './pages/auth'

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
          <Route path='home' element={<AppSectionLayout navProps={navData.home}/>}>
            <Route index element={<NavigatePersist to='about' />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
          <Route path='search' element={<AppSectionLayout navProps={navData.search}/>}>
            <Route index element={<NavigatePersist to={navData.search.upperOptions[0].link} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
          <Route path='sales' element={<AppSectionLayout navProps={navData.sales}/>}>
            <Route index element={<NavigatePersist to={navData.sales.upperOptions[0].link} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
          <Route path='store' element={<AppSectionLayout navProps={navData.store}/>}>
            <Route index element={<NavigatePersist to={navData.store.upperOptions[0].link} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
          <Route path='my' element={<AppSectionLayout navProps={navData.profile}/>}>
            <Route index element={<NavigatePersist to={navData.profile.upperOptions[0].link} />} />
            <Route path='profile' element={<ProfilePage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Route>
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