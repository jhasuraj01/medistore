import { Nav } from './components/Nav'
import style from './App.module.scss'
import { Navigate, Route, Routes } from 'react-router-dom'
import navData from './data/nav'
import { AppSection } from './components/AppSection'

function App() {
  return (
    <>
      <div className={style.layout}>
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