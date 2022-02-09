import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Header.module.scss'

const Header = () => {
  const steps = useSelector((state) => state.steps)

  return (
    <div className={`${styles.wrapper} defaultWrapper flexColumnDirection`}>
      {/* <div className={styles.logoWrapper}>
        <img className={styles.logo} src={process.env.LOGO_URL} />
      </div> */}
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => (
          <div className={styles.column} key={step.id}>
            <div
              className={
                step.isActive
                  ? styles.isSelected
                  : step.isVisited
                  ? styles.isVisited
                  : ''
              }
            >
              <div className={styles.name}>{step.name}</div>
              <div className={styles.description}>{step.description}</div>
            </div>
            {steps.length - 1 !== index && (
              <div className={styles.dividerWrapper}>
                <div>
                  <hr className={styles.divider} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
