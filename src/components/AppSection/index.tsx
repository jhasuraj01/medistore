import { Navigate, Route, Routes } from 'react-router-dom'
import { Page } from '../Page'
import { SubNav, SubNavProps } from '../SubNav'

interface AppSectionProps {
  navProps: SubNavProps
}

export function AppSection({ navProps }: AppSectionProps) {

  const options = [ ...navProps.upperOptions, ...navProps.lowerOptions ]
  return (
    <>
      <SubNav {...navProps} />
      <Routes>
        {/* <Route path='/' element={<Navigate to={options[0].link} />} /> */}
        <Route path='/' element={ <Navigate to={options[0].link} /> } />
        {options.map(option => <Route key={option.link} path={ '/' + option.link} element={<Page text={option.name} />} />)}
      </Routes>
    </>
  )
}