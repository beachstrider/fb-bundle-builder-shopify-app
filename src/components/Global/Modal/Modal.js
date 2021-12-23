import { Icon } from '@shopify/polaris'
import { CancelSmallMinor } from '@shopify/polaris-icons'
import React from 'react'
import styles from './Modal.module.scss'

const Modal = ({ children, open, close }) => {
  return open ? (
    <div
      className={styles.wrapper}
      onClick={() => {
        close()
      }}
    >
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className={styles.closeButton} onClick={close}>
          <Icon source={CancelSmallMinor} color="base" />
        </div>
        {children}
      </div>
    </div>
  ) : null
}

export default Modal
