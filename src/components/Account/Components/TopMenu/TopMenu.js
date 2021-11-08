import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './TopMenu.module.scss'
import * as dayjs from 'dayjs'

const TopMenu = () => {
  const state = useSelector((state) => state)
  const [weeks, setWeeks] = React.useState([]);
  
  React.useEffect(() => {
      const newWeeksArr = []
      for(let i = 0; i < 4; i++){
        const nextSunday = dayjs().add((7 * i), 'day');
        newWeeksArr.push(nextSunday.format('MMM DD'));
      }
      setWeeks(newWeeksArr);
  }, []);


  return (
      <div className={styles.header}>
        <div className={styles.nameHeader}>
            <h1 className={styles.userName}>
                Hi {shopCustomer.firstName}!
            </h1>
        </div>
        <div className={styles.weekMenu}>
            <p className={styles.weekMenuLabel}>Select Week</p>
            <div className={`buttons ${styles.weekMenuItems}`}>
              {weeks.map( (week, index) => {
                return ( <button key={index} className={index === 0 ? "primaryButton largeButton" : "secondaryButton largeButton"}>{week}</button> )
              })}
            </div>
        </div>
      </div>
  )
}

export default TopMenu
