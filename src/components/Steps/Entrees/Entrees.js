import React, { useState } from 'react'
import CardQuantities from '../../Cards/CardQuantities'
import styles from './Entrees.module.scss'

const FAQ_TYPE = 'entreeType'
const STEP_ID = 4

const Entrees = () => {
  // TODO: get state from the store
  const [item, setItem] = useState({
    id: 1,
    title: 'Blackened Salmon',
    info: {
      fat: 25,
      carbs: 25,
      protein: 26,
      calories: 24
    },
    isSelected: true,
    image:
      'https://cdn.shopify.com/s/files/1/0596/3694/0985/files/keto-meal-001.png?v=1629490017',
    quantity: 0
  })

  // TODO: WIP
  const handleAddItem = () => {
    const newItem = { ...item, quantity: item.quantity + 1 }
    setItem(newItem)
  }

  const handleRemoveItem = () => {
    const newItem = { ...item, quantity: item.quantity - 1 }
    setItem(newItem)
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <div className={`${styles.title} mb-7`}>Choose Entrees</div>
        <div className={`${styles.entrees} mb-10`}>
          {/* TODO: map list */}
          <CardQuantities
            title={item.title}
            image={item.image}
            info={item.info}
            isChecked={item.quantity > 0}
            quantity={item.quantity}
            onClick={handleAddItem}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  )
}

export default Entrees
