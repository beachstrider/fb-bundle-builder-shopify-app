import { Icon } from '@shopify/polaris'
import { CircleCancelMinor } from '@shopify/polaris-icons'
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
          <Icon source={CircleCancelMinor} color="base" />
        </div>
        {children}
      </div>
    </div>
  ) : null
}

export default Modal
