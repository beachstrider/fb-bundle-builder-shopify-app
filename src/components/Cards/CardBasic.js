import React, { useState } from 'react'
import { NUTRITIONAL_VALUES } from '../../constants/bundles'
import ItemDescriptionModal from '../Steps/Components/ItemDescriptionModal/ItemDescriptionModal'
import styles from './CardBasic.module.scss'

const CardBasic = ({
  title,
  description,
  image,
  metafields,
  productMetafields,
  quantity
}) => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <div>
      <div className={styles.card}>
        <div
          className={styles.image}
          style={{ backgroundImage: `url('${image}')` }}
          onClick={() => setOpenModal(true)}
        >
          &nbsp;
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
        </div>
      </div>
      <ItemDescriptionModal
        title={title}
        description={description}
        image={image}
        metafields={metafields}
        productMetafields={productMetafields}
        quantity={quantity}
        isChecked={false}
        onClick={() => {}}
        onAdd={() => {}}
        onRemove={() => {}}
        disableAdd={true}
        disableRemove={true}
        disableActions={true}
        open={openModal}
        displayActions={false}
        close={() => setOpenModal(false)}
      />
    </div>
  )
}

export default CardBasic
