import { Nav } from './components/Nav'
import style from './App.module.scss'
import { Route, Routes } from 'react-router-dom'
import navData from './data/nav'
import { AppSection } from './components/AppSection'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectSubNavExpanded } from './features/SubNav/subNavSlice'
import { NavigatePersist } from './supports/Persistence'
import { auth } from './firebase'
import { onAuthStateChanged, Unsubscribe } from 'firebase/auth'
import { useEffect } from 'react'
import { updateAuthState } from './features/Auth/authSlice'

function App() {
  
  const subnavExpanded = useAppSelector(selectSubNavExpanded)
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const unsubscribe: Unsubscribe = onAuthStateChanged(auth, async () => await dispatch(updateAuthState()))
    return () => unsubscribe()
  }, [])

  return (
    <>
      <div className={subnavExpanded ? `${style.layout}` : `${style.layout} ${style.subnav_hide}`}>
        <Nav />
        <Routes>
          <Route path='/' element={<NavigatePersist to='home' />} />
          <Route path='/home/*' element={<AppSection navProps={navData.home}/>} />
          <Route path='/search/*' element={<AppSection navProps={navData.search} />} />
          <Route path='/sales/*' element={<AppSection navProps={navData.sales} />} />
          <Route path='/store/*' element={<AppSection navProps={navData.store} />} />
          <Route path='/profile/*' element={<AppSection navProps={navData.profile} />} />
        </Routes>
      </div>
    </>
  )
}
export default App