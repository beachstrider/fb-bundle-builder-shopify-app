import React from 'react'
import { ButtonCheckMark, ButtonQuantities } from '../../../Buttons'
import Modal from '../../../Global/Modal'
import styles from './ItemDescriptionModal.module.scss'

const ItemDescriptionModal = ({
  open,
  close,
  title,
  image,
  metafields,
  productMetafields,
  quantity,
  isChecked,
  onClick,
  onAdd,
  onRemove,
  disableAdd = false,
  disableRemove = false
}) => {
  const removeMeasurement = (value, needle = 'oz') => value.split(needle)[0]
  const getMetafield = (metafields, key) =>
    metafields.find((m) => m.key === key)

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
                <div className={styles.metafieldValue}>
                  {removeMeasurement(metafield.value)}
                </div>
                <div className={styles.metafieldName}>{metafield.name}</div>
              </div>
            ))}
          </div>
          {getMetafield(productMetafields, 'ingredients').value && (
            <div className={styles.ingredients}>
              <h2>{getMetafield(productMetafields, 'ingredients')?.name}:</h2>
              <div className={styles.ingredientsText}>
                {getMetafield(productMetafields, 'ingredients')?.value}
              </div>
            </div>
          )}
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
                  disableRemove={disableRemove}
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
