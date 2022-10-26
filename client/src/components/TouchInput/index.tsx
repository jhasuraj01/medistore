import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

export interface TouchInputPayload {
  value: string
}

export interface TouchInputProps {
  onChange?: (payload: TouchInputPayload) => void
  onSubmit?: (payload: TouchInputPayload) => void
  placeholder?: string
  text?: string | number | null
  default?: string | number | null
}

export function TouchInput(props: TouchInputProps) {

  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const elm = ref.current
    if(!elm) return

    const handleFocus = () => {
      window.setTimeout(function() {
        let sel, range
        if (window.getSelection && document.createRange) {
          range = document.createRange()
          range.selectNodeContents(elm)
          sel = window.getSelection()
          sel?.removeAllRanges()
          sel?.addRange(range)
        }
      }, 1)
    }

    elm.addEventListener('focus', handleFocus)

    return () => elm.removeEventListener('focus', handleFocus)
  }, [ref])

  const handleClick = () => {
    if(ref.current) {
      ref.current.contentEditable = 'True'
      ref.current.focus()
    }
  }

  const handleBlur = () => {
    if(!ref.current) return
    ref.current.contentEditable = 'False'

    if(ref.current.innerText == '' && props.default)
      ref.current.innerText = String(props.default)

    if(props.onSubmit)
      props.onSubmit({ value: ref.current.innerText })
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if(!ref.current) return

    if(event.key === 'Enter'){
      event.preventDefault()
      event.stopPropagation()
      ref.current.blur()
    }
  }

  const handleChange = () => {
    if(!ref.current) return

    if(props.onChange)
      props.onChange({ value: ref.current.innerText })
  }

  return (
    <span
      ref={ref}
      className={styles.span}
      onChange={props.onChange && handleChange}
      onClick={handleClick}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}>
      {props.text || props.default}
    </span>
  )
}