import { Route, Routes } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { NavigatePersist } from './supports/Persistence'
import { auth } from './firebase'
import { onAuthStateChanged, Unsubscribe } from 'firebase/auth'
import { useEffect } from 'react'
import { selectAuth, updateAuthState } from './features/Auth/authSlice'
import { NotFoundPage } from './pages/404'
import { AppLayout } from './components/AppLayout'
import { AuthPage } from './pages/auth'
// import { HomePage } from './pages/app/home'
// import { SearchPage } from './pages/app/search'
import { CartPage } from './pages/app/carts'
import { ItemsPage } from './pages/app/items'
import { AccountPage } from './pages/app/account'
import { OrganizationPage } from './pages/app/organization'
import { AccountSetupPage } from './pages/setup'
import './App.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { BillsPage } from './pages/app/bills'
import { RootBillPage } from './pages/bill'

function App() {

  const dispatch = useAppDispatch()
  const user = useAppSelector(selectAuth)

  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async () => await dispatch(updateAuthState()))
    return () => unsubscribe()
  }, [])

  if(user.loading) {
    return (
      <div className='loading-top'></div>
    )
  }

  return (
    <div className='app'>
      <Routes>
        <Route index element={<NavigatePersist to='app' />} />
        <Route path='app' element={<AppLayout />}>
          <Route index element={<NavigatePersist to='organization' />} />
          <Route path='account/*' element={<AccountPage />} />
          <Route path='bills/*' element={<BillsPage />} />
          <Route path='carts/*' element={<CartPage />} />
          {/* <Route path='home/*' element={<HomePage />} /> */}
          <Route path='items/*' element={<ItemsPage />} />
          <Route path='organization/*' element={<OrganizationPage />} />
          {/* <Route path='search/*' element={<SearchPage />} /> */}
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route path='auth' element={<AuthPage />} />
        <Route path='bill' element={<RootBillPage />} />
        <Route path='setup/*' element={<AccountSetupPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position='bottom-right' />
    </div>
  )
}

export default App