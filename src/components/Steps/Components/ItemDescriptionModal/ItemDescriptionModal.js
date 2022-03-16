import React from 'react'
import { NUTRITIONAL_VALUES } from '../../../../constants/bundles'
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
  disableRemove = false,
  displayActions = true
}) => {
  const replaceMeasurement = (value) => value.replace(/oz|g/g, '')
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
          <div className={styles.title}>{title}</div>
          {getMetafield(metafields, 'subtitle')?.value && (
            <div className={styles.subtitle}>
              {getMetafield(metafields, 'subtitle')?.value}
            </div>
          )}
          <div className={styles.description}>
            {metafields.map(
              (metafield) =>
                NUTRITIONAL_VALUES.includes(metafield.key) && (
                  <div key={metafield.key}>
                    <div className={styles.metafieldValue}>
                      {replaceMeasurement(metafield.value)}
                    </div>
                    <div className={styles.metafieldName}>{metafield.name}</div>
                  </div>
                )
            )}
          </div>
          {getMetafield(metafields, 'ingredients')?.value && (
            <div className={styles.ingredients}>
              <h3>{getMetafield(metafields, 'ingredients')?.name}:</h3>
              <div className={styles.ingredientsText}>
                {getMetafield(metafields, 'ingredients')?.value}
              </div>
            </div>
          )}
          {getMetafield(metafields, 'contains')?.value && (
            <div className={styles.contains}>
              {getMetafield(metafields, 'contains')?.name}:{' '}
              {getMetafield(metafields, 'contains')?.value}
            </div>
          )}
          {displayActions && (
            <div className={`${styles.actions}`}>
              <div>
                <ButtonCheckMark
                  isChecked={isChecked}
                  onClick={onClick}
                  isFromModal
                />
              </div>
              {isChecked && (
                <div className={`${styles.quantities}`}>
                  <ButtonQuantities
                    quantity={quantity}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    disableAdd={disableAdd}
                    disableRemove={disableRemove}
                    isFromModal
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ItemDescriptionModal
