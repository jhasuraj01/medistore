import React, { useRef } from 'react'
import styles from './index.module.scss'

export interface InputButtonPayload {
  value: string
}

export interface InputButton {
  onChange?: (payload: InputButtonPayload) => void
  onSubmit?: (payload: InputButtonPayload) => void
  placeholder?: string
}

export function InputButton (props: InputButton) {

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()
    
    if(props.onSubmit)
      props.onSubmit({ value: inputRef.current?.value || '' })

    if(inputRef.current) {
      inputRef.current.value = ''
      inputRef.current.focus()
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if(props.onChange)
      props.onChange({ value: inputRef.current?.value || '' })
  }

  return (
    <form onSubmit={props.onSubmit && handleSubmit} className={styles.form}>
      <input autoFocus={true} ref={inputRef} placeholder={props.placeholder} onChange={props.onChange && handleChange} type="text" />
      <button type='submit'>+</button>
    </form>
  )
}