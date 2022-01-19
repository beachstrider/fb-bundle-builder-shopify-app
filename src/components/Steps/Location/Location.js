import { InlineError } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  selectFaqType,
  displayHeader,
  displayFooter,
  setLocation,
  setEmail as setStoreEmail,
  setIsNextButtonActive,
  initialState
} from '../../../store/slices/rootSlice'
import { InputEmail, InputText } from '../Components/Inputs'
import {
  availableDeliveryDays,
  findZipCode,
  getTodayDate,
  isValidEmail,
  mapDeliveryDays,
  request
} from '../../../utils'
import styles from './Location.module.scss'
import { withActiveStep } from '../../Hooks'
import SpinnerIcon from '../../Global/SpinnerIcon'
import DeliveryDates from '../Components/DeliveryDates'
import Toast from '../../Global/Toast'

const FAQ_TYPE = 'location'
const STEP_ID = 2

const Location = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [currentZone, setCurrentZone] = useState({})
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({
    open: false,
    status: 'Success',
    message: ''
  })

  const todayDate = getTodayDate()

  useEffect(() => {
    dispatch(displayHeader(true))

    if (
      state.email &&
      state.location.zipCode &&
      shopCustomer.email === state.email
    ) {
      setZipCode(state.location.zipCode)
      setEmail(state.email)

      const zone = findZipCode(state.deliveryZones, state.location.zipCode)
      if (!zone) {
        dispatch(displayFooter(false))
        return setZipCodeError('Delivery is not available to your zip code')
      }

      const newZone = getMappedZones(zone)
      setCurrentZone(newZone)

      if (
        state.location?.deliveryDate &&
        state.location.deliveryDate.id === 0
      ) {
        handleDeliveryDate(findDefaultSelectedDate(zone.deliveryDates))
      } else {
        checkCurrentSelectedDate(zone)
      }
      dispatch(selectFaqType(FAQ_TYPE))
      dispatch(displayFooter(true))
    } else {
      setCurrentZone({})
      setEmail('')
      setZipCode('')
      dispatch(selectFaqType(null))
      dispatch(displayFooter(false))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(currentZone).length > 0) {
      checkCurrentSelectedDate(currentZone)
    }

    if (state.location.deliveryDate.id === -1) {
      dispatch(setIsNextButtonActive(false))
    } else {
      if (!state.isNextButtonActive) {
        dispatch(setIsNextButtonActive(true))
      }
    }
  }, [state.location.deliveryDate])

  const getMappedZones = (zone) => {
    const availableDays = availableDeliveryDays(zone, todayDate)
    const mappedDays = mapDeliveryDays(availableDays, zone.deliveryDates)
    const newZone = {
      ...zone,
      deliveryDates: [...mappedDays]
    }

    return newZone
  }

  const checkCurrentSelectedDate = (zone) => {
    let deliveryDates = JSON.parse(JSON.stringify([...zone.deliveryDates]))
    const selectedDateIndex = deliveryDates.find((date) => date.isSelected)

    deliveryDates = deliveryDates.map((date) => {
      if (selectedDateIndex && date.id === selectedDateIndex.id) {
        date.isSelected = false
      }

      if (
        state.location.deliveryDate &&
        date.id === state.location.deliveryDate.id
      ) {
        date.isSelected = true
      }
      return date
    })

    const newZone = getMappedZones({
      ...zone,
      deliveryDates: [...deliveryDates]
    })

    setCurrentZone(newZone)
  }

  const findDefaultSelectedDate = (deliveryDates) =>
    deliveryDates.find((date) => date.isSelected)

  const handleSubmit = async () => {
    if (!email || !isValidEmail(email)) {
      return setEmailError('Please type a valid email')
    }

    if (zipCode.length < 4) {
      return setZipCodeError('Please type a valid zip code')
    }
    setIsLoading(true)

    dispatch(setStoreEmail(email))
    dispatch(
      setLocation({
        zipCode: zipCode,
        deliveryDate: state.location.deliveryDate
      })
    )

    const shopifyMultipass = await request(
      `${process.env.PROXY_APP_URL}/shopify/multipass-url?shop=${shopDomain}`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          email,
          created_at: new Date().toISOString(),
          return_to: window.location.href,
          addresses: {
            zip: zipCode
          }
        }
      }
    )

    if (shopifyMultipass?.data?.url) {
      window.location.href = shopifyMultipass.data.url
    }
  }

  const handleDeliveryDate = (date) => {
    dispatch(
      setLocation({
        ...state.location,
        deliveryDate: date
      })
    )
  }

  const handleZipCodeChange = (value) => {
    if (Number.isInteger(Number(value))) {
      if (Object.keys(currentZone).length > 0) {
        setCurrentZone({})
        dispatch(setLocation(initialState.location))
      }
      setZipCode(value)
    }
  }

  const handleEmailChange = (value) => {
    if (Object.keys(currentZone).length > 0) {
      setCurrentZone({})
      dispatch(
        setLocation({
          deliveryDate: {
            id: 0
          }
        })
      )
    }
    setEmail(value)
  }

  if (state.bundle.id === 0) {
    return <Redirect push to="/" />
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <div className={`${styles.title} mb-7`}>
          Enter Your Zip Code And Email To Continue
        </div>
        <div className={styles.rows}>
          <div>
            <div className="mb-3">
              Your Zip Code <span className={styles.required}>(Required)</span>
            </div>
            <InputText
              onChange={(value) => handleZipCodeChange(value)}
              value={zipCode}
              required={true}
            />
            <div className={styles.inLineError}>
              {zipCodeError && <InlineError message={zipCodeError} />}
            </div>
          </div>
          <div>
            <div className="mb-3">
              Enter Your Email{' '}
              <span className={styles.required}>(Required)</span>
            </div>
            <InputEmail
              onChange={(value) => handleEmailChange(value)}
              value={email}
              required={true}
            />
            <div className={styles.inLineError}>
              {emailError && <InlineError message={emailError} />}
            </div>
          </div>
          <div>
            <div className="mb-3">&nbsp;</div>
            <div
              className={`button primaryButton ${styles.buttonWrapper}`}
              onClick={handleSubmit}
            >
              {isLoading ? <SpinnerIcon /> : 'Submit'}
            </div>
          </div>
        </div>
        {Object.keys(currentZone).length > 0 && currentZone.deliveryDates && (
          <DeliveryDates
            onClick={handleDeliveryDate}
            title="Choose Delivery Date"
            dates={currentZone.deliveryDates}
            todayDate={todayDate}
          />
        )}
      </div>
      {error.open ? (
        <Toast
          open={error.open}
          status={error.status}
          message={error.message}
          autoDelete
          handleClose={() => {
            setError({
              open: false,
              status: 'Success',
              message: ''
            })
          }}
        />
      ) : (
        ''
      )}
    </div>
  )
}

export default withActiveStep(Location, STEP_ID)
