import React from 'react'
import { TextField } from '@shopify/polaris'
import styles from './Input.module.scss'

const InputText = ({ value, onChange, className }) => {
  return (
    <div className={`${styles.inputText} ${className}`}>
      <TextField
        className={styles.inputText}
        type="email"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default InputText
