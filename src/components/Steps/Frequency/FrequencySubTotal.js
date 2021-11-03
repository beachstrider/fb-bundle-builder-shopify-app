import React from 'react'
import { useSelector } from 'react-redux'
import { FrequencySubTotalItem } from '.'
import styles from './Frequency.module.scss'

const FrequencySubTotal = () => {
  const state = useSelector((state) => state)

  return (
    <div className={styles.column}>
      <div>
        <FrequencySubTotalItem label="Peer Entree" price={state.entree.price} />
        <FrequencySubTotalItem
          label="Breakfasts"
          price={state.breakfast.price}
        />
        <div className={styles.priceDivider}>&nbsp;</div>
        <div className={styles.prices}>
          <div className={styles.smallFont}>Weekly Total</div>
          <div className={`${styles.smallFont} ${styles.fontBold}`}>
            ${Number.parseFloat(state.entree.price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrequencySubTotal
