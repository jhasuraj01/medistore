import style from './index.module.scss'

interface PageProps {
  text: string,
}

export function Page({ text }: PageProps) {
  return (
    <div className={style.page}>
      I am {text} Page!
    </div>
  )
}