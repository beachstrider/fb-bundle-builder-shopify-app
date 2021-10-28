import React from 'react'
import styles from './ItemCard.module.scss'

const MenuItemCard = (props) => {
    return (
        <div className="bundleBuilderCard" style={{width:props.width}}>
            <img className={styles.cardImage} src="//cdn.shopify.com/s/files/1/0552/6549/3185/files/Kimchi_Pork__Keto_C_165x.jpg?v=1634949902" alt="Buffalo Mozzarella Chicken" />
            <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                    <h3>Buffalo Mozzarella Chicken</h3>
                </div>
                <div className={styles.cardInfo}>
                    <p className={styles.cardTitle}>
                        <strong>Regular</strong>
                    </p>
                    <p className={styles.cardTitle}>
                        Qty: <strong>1</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MenuItemCard