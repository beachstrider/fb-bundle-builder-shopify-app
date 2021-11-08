import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import {MenuItemCard} from '../Components/MenuItemCard'
import {
  ChevronRightMinor
} from '@shopify/polaris-icons';
import * as dayjs from 'dayjs';



const Dashboard = () => {
  const state = useSelector((state) => state)
  const [weeks, setWeeks] = React.useState([]);
  const [active, setActive] = React.useState([]);
  const [sent, setSent] = React.useState();
  
  React.useEffect(() => {

      const newWeeksArr = []
      const activeWeeksArr = []
      for(let i = 0; i < 4; i++){
        const nextSunday = dayjs().add((7 * i), 'day');
        newWeeksArr.push(nextSunday.format('MMM DD'));
        if(i < 2){
          activeWeeksArr.push(nextSunday.format('MMM DD'));
        }

        if(i === 0){
          setSent(nextSunday.format('MMM DD'));
        }
      }
      setWeeks(newWeeksArr);
      setActive(activeWeeksArr)

  }, []);

  const handleChange = (week) => {
    if(!active.includes(week)){
      setActive([week])
    }
    
  }

  if(shopCustomer.id === 0){
    return <Redirect push to="/" />
  }


  return (
    <div className={styles.accountWrapper}>
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
                return ( <button key={index} onClick={() => handleChange(week)} className={ active.includes(week) ? "primaryButton largeButton" : "secondaryButton largeButton"}>{week}</button> )
              })}
            </div>
        </div>
      </div>
      <div className={styles.promoSection}>
        <p>Promo Section</p>
      </div>
      <div className="contentWrapper">
        {active.map((week, index) => (
          <div key={index} className={styles.subscriptionRow}>
            <div className={styles.menuRow}>
              <div className={styles.headerWthLink}>
                <h3>Week of {week}</h3>
                {week === sent ? <Link to="#" className={styles.primaryLink}>Track Package</Link> : ''}
              </div>
              <Link to="/order-history" className="secondaryButton">Order Summary</Link>
            </div>
            <div className={styles.accountMenuRow}>
                <MenuItemCard />
                <MenuItemCard />
                <MenuItemCard />
                <MenuItemCard />
                <MenuItemCard />
                <Link to="/order-history" className={styles.viewAllLink}>
                  See All <ChevronRightMinor />
                </Link>
            </div>
        </div>
        ))}
        

      </div>
    </div>
  )
}

export default Dashboard
