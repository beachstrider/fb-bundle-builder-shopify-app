import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLocation } from '../../../../store/slices/rootSlice'
import { findZipCode, availableDeliveryDays } from '../../../../utils'
import Modal from '../../../Global/Modal'
import DeliveryDates from '../DeliveryDates'
import styles from './DeliveryModal.module.scss'
import dayjs from 'dayjs'
const TODAY_DATE = dayjs()

const DeliveryDateModal = ({ open, close }) => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [currentZone, setCurrentZone] = useState({})

  useEffect(() => {
    if (state.email && state.location.zipCode) {
      const zone = findZipCode(state.deliveryZones, state.location.zipCode)
      setCurrentZone(zone)

      if (state.location.deliveryDate.id === 0) {
        handleDeliveryDate(findDefaultSelectedDate(zone.deliveryDates))
      } else {
        checkCurrentSelectedDate(zone)
      }
    }
  }, [])

  useEffect(() => {
    if (Object.keys(currentZone).length > 0) {
      checkCurrentSelectedDate(currentZone)
    }
  }, [state.location.deliveryDate])

  const handleDeliveryDate = (date) => {
    dispatch(
      setLocation({
        ...state.location,
        deliveryDate: date
      })
    )
  }

  const findDefaultSelectedDate = (deliveryDates) =>
    deliveryDates.find((date) => date.isSelected)

  const checkCurrentSelectedDate = (zone) => {
    const availableDays = availableDeliveryDays(zone, TODAY_DATE.day())
    console.log('availableDays: ', availableDays)
    let deliveryDates = JSON.parse(JSON.stringify(zone.deliveryDates))
    deliveryDates = deliveryDates.map((date) => {
      console.log('date: ', date)
      date.disabled = !availableDays.includes(date.day)
      date.isSelected = date.id === state.location.deliveryDate.id
      return date
    })
    setCurrentZone({
      ...zone,
      deliveryDates: [...deliveryDates]
    })
  }

  return (
    <Modal open={open} close={close}>
      <div className="mb-5">
        {Object.keys(currentZone).length > 0 && currentZone.deliveryDates && (
          <DeliveryDates
            className={styles.modal}
            onClick={handleDeliveryDate}
            title="Choose Delivery Date"
            dates={currentZone.deliveryDates}
            todayDate={TODAY_DATE}
          />
        )}
        <div className={styles.buttonWrapper}>
          <div className={`button primaryButton`} onClick={() => close()}>
            Submit
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DeliveryDateModal
