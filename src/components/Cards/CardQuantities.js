import React, { useState } from 'react'
import { NUTRITIONAL_VALUES } from '../../constants/bundles'
import { ButtonCheckMark, ButtonQuantities } from '../Buttons'
import ItemDescriptionModal from '../Steps/Components/ItemDescriptionModal/ItemDescriptionModal'
import styles from './CardQuantities.module.scss'
import { settings } from '../../utils'

const CardQuantities = ({
  title,
  description,
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
  const [openModal, setOpenModal] = useState(false)

  return (
    <div className={isChecked ? styles.isChecked : styles.isUnchecked}>
      <div className={styles.card}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url('${image}')` }}
          onClick={() => setOpenModal(true)}
        >
          <div className={styles.iconsContainer}>
            {settings()
              .icons()
              .map((icon) => {
                const currentMetaField = metafields.find(
                  (m) => m.key === icon.key
                )
                return (
                  !!currentMetaField &&
                  currentMetaField.value === 'true' && (
                    <img
                      className={styles.icon}
                      src={`${process.env.PROXY_APP_URL}${icon.src}`}
                      alt={icon.alt}
                      key={icon.alt}
                    />
                  )
                )
              })}
          </div>
        </div>
        <div className={`${styles.descriptionWrapper}`}>
          <div className={`${styles.title}`}>{title}</div>
          <div className={styles.description}>
            {metafields.map(
              (metafield) =>
                NUTRITIONAL_VALUES.includes(metafield.key) && (
                  <div key={metafield.key}>
                    <div className={styles.metafieldValue}>
                      {metafield.value}
                    </div>
                    <div className={styles.metafieldName}>{metafield.name}</div>
                  </div>
                )
            )}
          </div>
          <div className={`${styles.actions}`}>
            <div>
              <ButtonCheckMark
                isChecked={isChecked}
                onClick={onClick}
                disableAdd={disableAdd}
              />
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
      <ItemDescriptionModal
        title={title}
        description={description}
        image={image}
        metafields={metafields}
        productMetafields={productMetafields}
        quantity={quantity}
        isChecked={isChecked}
        onClick={onClick}
        onAdd={onAdd}
        onRemove={onRemove}
        disableAdd={disableAdd}
        disableRemove={disableRemove}
        open={openModal}
        close={() => setOpenModal(false)}
      />
    </div>
  )
}

export default CardQuantities
