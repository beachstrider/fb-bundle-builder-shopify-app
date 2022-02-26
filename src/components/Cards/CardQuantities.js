import React, { useState } from 'react'
import { ButtonCheckMark, ButtonQuantities } from '../Buttons'
import ItemDescriptionModal from '../Steps/Components/ItemDescriptionModal/ItemDescriptionModal'
import styles from './CardQuantities.module.scss'

const CardQuantities = ({
  title,
  description,
  image,
  metafields,
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
    <>
      <div
        className={styles.card}
        style={{
          border: isChecked ? '4px solid #3DAE2B' : '1px solid #e5e5e5'
        }}
      >
        <div
          className={styles.image}
          style={{ backgroundImage: `url('${image}')` }}
          onClick={() => setOpenModal(true)}
        >
          &nbsp;
        </div>
        <div className={`${styles.descriptionWrapper} py-5`}>
          <div className={`${styles.title} mb-3`}>{title}</div>
          <div className={styles.description}>
            {metafields.map((metafield) => (
              <div key={metafield.key}>
                <div className={styles.subTitle}>{metafield.value}</div>
                <div>{metafield.name}</div>
              </div>
            ))}
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
    </>
  )
}

export default CardQuantities
