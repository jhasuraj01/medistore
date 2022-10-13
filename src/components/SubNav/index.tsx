import { NavLinkPersist } from '../../supports/Persistence'
import style from './index.module.scss'

export interface SubNavProps {
  title: string,
  upperOptions: {
    name: string,
    link: string,
  }[],
  lowerOptions: {
    name: string,
    link: string,
  }[],
}

export function SubNav({ title, upperOptions, lowerOptions }: SubNavProps) {
  return (
    <div className={style.container}>
      <div className={style.header}>{title}</div>
      <div className={style.subnav}>
        <div className={style.subnavSection}>
          {
            upperOptions.map(option =>
              <NavLinkPersist 
                to={option.link}
                key={option.name}
                className={({ isActive }) => isActive ? `${style.subnavOption} ${style.selected}` : `${style.subnavOption}`}
              >{option.name}
              </NavLinkPersist>
            )
          }
        </div>
        <div className={style.subnavSection}>
          {
            lowerOptions.map(option => <NavLinkPersist to={option.link} key={option.name} className={style.subnavOption}>{option.name}</NavLinkPersist>)
          }
        </div>
      </div>
    </div>
  )
}