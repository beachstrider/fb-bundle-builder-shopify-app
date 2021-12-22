import React from 'react'
import { ButtonCheckMark, ButtonQuantities } from '../../../Buttons'
import Modal from '../../../Global/Modal'
import styles from './ItemDescriptionModal.module.scss'

const ItemDescriptionModal = ({
  open,
  close,
  title,
  description,
  image,
  metafields,
  quantity,
  isChecked,
  onClick,
  onAdd,
  onRemove,
  disableAdd = false
}) => {
  return (
    <Modal open={open} close={close}>
      <div className={styles.card}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url('${image}')` }}
        >
          &nbsp;
        </div>
        <div className={styles.descriptionWrapper}>
          <div className={`${styles.title} mb-3`}>{title}</div>
          <div className={styles.description}>
            {metafields.map((metafield) => (
              <div key={metafield.key}>
                <div className={styles.subTitle}>{metafield.value}</div>
                <div className={styles.subTitleDescription}>
                  {metafield.name}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.descriptionHtml}>
            <div
              dangerouslySetInnerHTML={{
                __html: description
              }}
            ></div>
          </div>
          <div className={`${styles.actions} mt-5`}>
            <div>
              <ButtonCheckMark isChecked={isChecked} onClick={onClick} />
            </div>
            {isChecked && (
              <div>
                <ButtonQuantities
                  quantity={quantity}
                  onAdd={onAdd}
                  onRemove={onRemove}
                  disableAdd={disableAdd}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ItemDescriptionModal
