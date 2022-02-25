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
  initialState,
  setReturnToStep
} from '../../../store/slices/rootSlice'
import { InputEmail, InputText } from '../Components/Inputs'
import {
  availableDeliveryDays,
  findZipCode,
  getTodayDate,
  isValidEmail,
  isValidZipCode,
  mapDeliveryDays,
  request
} from '../../../utils'
import styles from './Location.module.scss'
import {
  generateRequestToken,
  getShopifyCustomerByEmail,
  withActiveStep
} from '../../Hooks'
import SpinnerIcon from '../../Global/SpinnerIcon'
import DeliveryDates from '../Components/DeliveryDates'
import Toast from '../../Global/Toast'
import TopTitle from '../Components/TopTitle'
import { useErrorHandler } from 'react-error-boundary'
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'

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
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [displayDates, setDisplayDates] = useState(false)
  const [error, setError] = useState({
    open: false,
    status: 'Success',
    message: ''
  })
  const handleError = useErrorHandler()

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

      defineCurrentZone(zone)

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
      dispatch(setReturnToStep(''))
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

    if (state.location.deliveryDate && state.location.deliveryDate.id === -1) {
      dispatch(setIsNextButtonActive(false))
    } else {
      if (!state.isNextButtonActive) {
        dispatch(setIsNextButtonActive(true))
      }
    }
  }, [state.location.deliveryDate])

  useEffect(() => {
    setDisplayDates(
      Object.keys(currentZone).length > 0 &&
        !isRedirecting &&
        currentZone.deliveryDates
    )
  }, [currentZone, isRedirecting])

  const defineCurrentZone = (zone) => {
    const newZone = getMappedZones(zone)
    setCurrentZone(newZone)
  }

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

  const setStepToReturn = async (step) =>
    new Promise((resolve) => {
      dispatch(setReturnToStep(step))
      resolve()
    })

  const handleSubmit = async () => {
    try {
      if (!email || !isValidEmail(email)) {
        return setEmailError('Please type a valid email')
      }

      if (!isValidZipCode(zipCode)) {
        return setZipCodeError('Please type a valid zip code')
      }
      setIsLoading(true)
      setIsRedirecting(true)

      dispatch(setStoreEmail(email))
      dispatch(
        setLocation({
          zipCode: zipCode,
          deliveryDate: state.location.deliveryDate
        })
      )

      const zone = findZipCode(state.deliveryZones, zipCode)
      defineCurrentZone(zone)

      dispatch(setStoreEmail(email))
      dispatch(
        setLocation({
          zipCode: zipCode,
          deliveryDate: state.location.deliveryDate
        })
      )

      const requestToken = await generateRequestToken(email)
      const shopifyCustomer = await getShopifyCustomerByEmail(
        requestToken.data?.token,
        email
      )

      if (shopifyCustomer.status >= 400) {
        setError({
          open: true,
          status: 'Danger',
          message: DEFAULT_ERROR_MESSAGE
        })
      }

      const currentUrl = window.location.href

      const requireShopifyLogin = false
      if (requireShopifyLogin) {
        // validates current user and input email
        if (
          shopifyCustomer.data &&
          shopifyCustomer.data?.data?.customers?.edges?.length > 0 &&
          shopCustomer.email !== email
        ) {
          await setStepToReturn('2')
          window.location.href = `https://${shopDomain}/account/login?return_url=${currentUrl}`
          return
        }
      }

      // if user isn't signed-in
      if (
        requireShopifyLogin === false ||
        shopifyCustomer.data?.data?.customers?.edges?.length === 0
      ) {
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
          return
        }
      }

      dispatch(selectFaqType(FAQ_TYPE))
      dispatch(displayFooter(true))

      setIsRedirecting(false)
      setIsLoading(false)
    } catch (error) {
      handleError(error)
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
        setDisplayDates(false)
        setCurrentZone({})
        dispatch(setLocation(initialState.location))
      }
      setZipCode(value)
    }
  }

  const handleEmailChange = (value) => {
    if (Object.keys(currentZone).length > 0) {
      setDisplayDates(false)
      setCurrentZone({})
      dispatch(setLocation(initialState.location))
    }
    setEmail(value)
  }

  if (state.bundle.id === 0) {
    return <Redirect push to="/" />
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <TopTitle
          title="Enter Your Zip Code & Email"
          subTitle="Meals are delivered fresh every week. You can pause, cancel, or update your meal plan at anytime!"
        />
        <div className={styles.rows}>
          <div>
            <div className="mt-2 mb-1">
              <span className={styles.inputLabel}>
                Zip Code<span className={styles.required}>*</span>
              </span>
            </div>
            <InputText
              className={styles.input}
              onChange={(value) => handleZipCodeChange(value)}
              value={zipCode}
              required={true}
            />
            <div className={styles.inLineError}>
              {zipCodeError && <InlineError message={zipCodeError} />}
            </div>
          </div>
          <div>
            <div className="mt-5 mb-1">
              <span className={styles.inputLabel}>
                Email Address<span className={styles.required}>*</span>
              </span>
            </div>
            <InputEmail
              className={styles.input}
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
        {displayDates && (
          <DeliveryDates
            onClick={handleDeliveryDate}
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
