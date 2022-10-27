import styles from './index.module.scss'

interface IconButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: React.ReactElement<SVGSVGElement>
}

export function IconButton(props: IconButtonProps) {
  const className = `${styles.button} ${props.className || ''}`
  return (
    <button {...props} className={className}>{props.children}</button>
  )
}