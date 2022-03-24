import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dateAddDays, formatUTDateToISO } from '../../../utils'
import { getProductVariants } from '../../Hooks'
import MealsSection from './MealsSection'
import styles from './Meals.module.scss'
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'
import { TOAST_INITIAL_STATE } from '../../../constants/toasts'
import Toast from '../../Global/Toast'
import { Spinner } from '../../Global'

const Meals = ({ week, bundleSubType, configurations }) => {
  const state = useSelector((state) => state)
  const [error, setError] = useState(TOAST_INITIAL_STATE)
  const [isFetching, setIsFetching] = useState(true)
  const [items, setItems] = useState([])

  useEffect(() => {
    fetchData()
  }, [bundleSubType, week])

  const fetchData = async () => {
    setIsFetching(true)
    const formattedItems = []
    try {
      for (const configuration of configurations) {
        // in order to pull the correct week range, we have increment one day
        const products = await getProductVariants(
          shopProducts,
          state,
          formatUTDateToISO(dateAddDays(week.deliverAfter, 1)),
          configuration,
          bundleSubType.name,
          bundleSubType.options[0].name
        )
        formattedItems.push({
          title: `${bundleSubType.name} ${configuration.title}`,
          products
        })
      }
      setItems(formattedItems)
      setIsFetching(false)
    } catch (error) {
      setError({
        open: true,
        status: 'Danger',
        message: DEFAULT_ERROR_MESSAGE
      })
    }
  }

  if (isFetching) {
    return <Spinner label="Loading..." />
  }

  return (
    <div className={styles.wrapper}>
      {items.map((item, index) => (
        <MealsSection key={index} content={item} />
      ))}
      {error.open && (
        <Toast
          open={error.open}
          status={error.status}
          message={error.message}
          autoDelete
          handleClose={() => setError(TOAST_INITIAL_STATE)}
        />
      )}
    </div>
  )
}

export default Meals
