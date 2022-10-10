import { Nav } from './components/Nav'
import { SubNav } from './components/SubNav'
import { Page } from './components/Page'
import style from './App.module.scss'

function App() {
  return (
    <>
      <div className={style.layout}>
        <Nav />
        <SubNav />
        <Page />
      </div>
    </>
  )
}

export default App