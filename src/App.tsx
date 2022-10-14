import { Nav } from './components/Nav'
import style from './App.module.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import navData from './data/nav'
import { AppSection } from './components/AppSection'
import { useAppSelector } from './app/hooks'
import { selectSubNavExpanded } from './features/SubNav/subNavSlice'

function App() {
  
  const subnavExpanded = useAppSelector(selectSubNavExpanded)

  return (
    <>
      <div className={subnavExpanded ? `${style.layout}` : `${style.layout} ${style.subnav_hide}`}>
        <Nav />
        <Routes>
          <Route path='/' element={<Navigate to='home' />} />
          <Route path='/home/*' element={<AppSection navProps={navData.home}/>} />
          <Route path='/search/*' element={<AppSection navProps={navData.search} />} />
          <Route path='/sales/*' element={<AppSection navProps={navData.sales} />} />
          <Route path='/store/*' element={<AppSection navProps={navData.store} />} />
        </Routes>
      </div>
    </>
  )
}
export default App