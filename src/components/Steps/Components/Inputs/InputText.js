import React from 'react'
import { TextField } from '@shopify/polaris'
import styles from './Input.module.scss'

const InputText = ({ value, onChange }) => {
  return (
    <div className={styles.inputText}>
      <TextField type="text" value={value} onChange={onChange} />
    </div>
  )
}

export default InputText
