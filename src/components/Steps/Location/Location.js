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
  setReturnToStep,
  setDeliveryDates,
  setTokens
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
  useGuestToken,
  withActiveStep
} from '../../Hooks'
import SpinnerIcon from '../../Global/SpinnerIcon'
import DeliveryDates from '../Components/DeliveryDates'
import Toast from '../../Global/Toast'
import TopTitle from '../Components/TopTitle'
import { useErrorHandler } from 'react-error-boundary'
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'
import { getDeliveryDates } from '../../Hooks/withBundleApi'

import dayjs from 'dayjs'
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)

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
  const [displayDates, setDisplayDates] = useState([])
  const [error, setError] = useState({
    open: false,
    status: 'Success',
    message: ''
  })
  const handleError = useErrorHandler()

  const generateToken = async () => {
    const currentToken = await useGuestToken()
    if (currentToken) {
      dispatch(
        setTokens({
          ...state.tokens,
          guestToken: currentToken
        })
      )
      return currentToken
    } else {
      setError({
        open: true,
        status: 'Danger',
        message: 'There was an error. Please try again'
      })
      dispatch(displayFooter(false))
    }
  }

  useEffect(() => {
    generateToken().then((currentToken) => {
      getDeliveryDates(currentToken)
        .then((res) => {
          const deliveryDates = res.data.data

          const today = new Date()
          today.setHours(0)
          today.setMinutes(0)
          today.setSeconds(0)

          const filteredDates = deliveryDates
            .filter((deliveryDate) => {
              const date = new Date(deliveryDate.date)
              return (
                date > today.getTime() &&
                deliveryDate.quantity > deliveryDate.used
              )
            })
            .map((deliveryDate, index) => {
              deliveryDate.isSelected = false
              deliveryDate.isDisabled = false
              deliveryDate.day = new Date(deliveryDate.date).getDay() + 1 // Add day since midnight is counting as previous day
              return deliveryDate
            })
            .sort((a, b) => (new Date(a.date) < new Date(b.date) ? -1 : 1))

          dispatch(setDeliveryDates(filteredDates))
        })
        .catch((e) => {
          // TODO: Alert user of error
          console.error(e)
        })
    })
  }, [])

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

      setCurrentZone(zone)

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
    if (state.location.deliveryDate && state.location.deliveryDate.id === -1) {
      dispatch(setIsNextButtonActive(false))
    } else {
      if (!state.isNextButtonActive) {
        dispatch(setIsNextButtonActive(true))
      }
    }
  }, [state.location.deliveryDate])

  useEffect(() => {
    if (currentZone.deliveryDates) {
      const allowedDays = currentZone.deliveryDates.map((date) => {
        return date.day
      })

      const today = dayjs()
      const earliestAvilableDate = today.add(currentZone.leadTime, 'day')

      console.log(
        'currentZone.deliveryDates',
        currentZone.deliveryDates,
        earliestAvilableDate
      )
      const filteredDates = state.deliveryDates.filter((deliveryDate) => {
        console.log(
          'earliestAvilableDate',
          earliestAvilableDate,
          dayjs(deliveryDate.date),
          earliestAvilableDate.isSameOrBefore(dayjs(deliveryDate))
        )
        return (
          allowedDays.includes(deliveryDate.day) &&
          earliestAvilableDate.isSameOrBefore(dayjs(deliveryDate.date))
        )
      })
      console.log('filteredDates', filteredDates)
      setDisplayDates(filteredDates)
      setLocation()
    }
  }, [currentZone, isRedirecting])

  const setStepToReturn = async (step) =>
    new Promise((resolve) => {
      dispatch(setReturnToStep(step))
      resolve()
    })

  const handleSubmit = async (e) => {
    e.preventDefault()
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
      setCurrentZone(zone)

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
        (shopifyCustomer.data?.data?.customers?.edges &&
          shopifyCustomer.data?.data?.customers?.edges?.length === 0)
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
        dispatch(displayFooter(true))

        setIsRedirecting(false)
        setIsLoading(false)
      } else {
        setError({
          open: true,
          status: 'Danger',
          message: DEFAULT_ERROR_MESSAGE
        })
      }
    } catch (error) {
      setError({
        open: true,
        status: 'Danger',
        message: DEFAULT_ERROR_MESSAGE
      })
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
        setDisplayDates([])
        setCurrentZone({})
        dispatch(setLocation(initialState.location))
      }
      setZipCode(value)
    }
  }

  const handleEmailChange = (value) => {
    if (Object.keys(currentZone).length > 0) {
      setDisplayDates([])
      setCurrentZone({})
      dispatch(setLocation(initialState.location))
    }
    setEmail(value.toLowerCase())
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!zipCode) {
      setZipCode('90028')
      setEmail('eduardo@sunriseintegration.com')
    }
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
          <form onSubmit={handleSubmit}>
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
              <button
                className={`button primaryButton ${styles.buttonWrapper}`}
                type="submit"
              >
                {isLoading ? <SpinnerIcon /> : 'Submit'}
              </button>
            </div>
          </form>
        </div>
        {Object.keys(currentZone).length > 0 && !isLoading && displayDates && (
          <DeliveryDates
            onClick={handleDeliveryDate}
            dates={displayDates}
            selectedDate={state.location.deliveryDate}
            autoScrollDown
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
