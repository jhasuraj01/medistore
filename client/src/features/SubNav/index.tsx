import React from 'react'
import { NavLinkProps } from 'react-router-dom'
import { NavLinkPersist } from '../../supports/Persistence'
import styles from './index.module.scss'


export function SubNavLink(props: NavLinkProps) {
  const className = `${props.className && ''} ${styles.subnavOption}`
  return (
    <NavLinkPersist
      {...props}
      className={({ isActive }) => `${className || ''} ${isActive && styles.selected}`}>
      { props.children }
    </NavLinkPersist>
  )
}

interface SubNavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function SubNavButton(props: SubNavButtonProps) {
  const className = `${props.className || ''} ${styles.subnavOption}`
  return (
    <button
      {...props}
      className={className}>
      { props.children }
    </button>
  )
}

export interface SubNavTextProps {
  children?: string
  className?: string
}
export function SubNavText(props: SubNavTextProps) {
  const className = `${props.className || ''} ${styles.subnavText}`
  return (
    <div
      {...props}
      className={className}>
      {props.children}
    </div>
  )
}

export interface SubNavSectionProps {
  children: React.ReactNode
}

export function SubNavSection({ children }: SubNavSectionProps) {
  return (
    <div className={styles.subnavSection}>
      { children }
    </div>
  )
}

export interface SubNavProps {
  title: string,
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export function SubNav({ title, children, className }: SubNavProps) {  
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.header}>{title}</div>
      <div className={styles.subnav}>
        {children}
      </div>
    </div>
  )
}