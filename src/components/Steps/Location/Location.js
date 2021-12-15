import { InlineError } from '@shopify/polaris'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFaqType,
  displayHeader,
  displayFooter,
  setLocation,
  setEmail as setStoreEmail,
  setIsNextButtonActive
} from '../../../store/slices/rootSlice'
import { InputEmail, InputText } from '../Components/Inputs'
import { isValidEmail, request } from '../../../utils'
import { LocationDate } from '.'
import styles from './Location.module.scss'
import { withActiveStep } from '../../Hooks'
import SpinnerIcon from '../../Global/SpinnerIcon'

const FAQ_TYPE = 'location'
const STEP_ID = 2

const deliveryZones = [
  {
    id: 1,
    name: 'Zone 1',
    zipCodes: [90028, 90029, 90030],
    deliveryDates: [
      {
        id: 0,
        day: 1,
        disabled: true,
        isSelected: false
      },
      {
        id: 1,
        day: 3,
        disabled: false,
        isSelected: false
      },
      {
        id: 2,
        day: 5,
        disabled: false,
        isSelected: true
      }
    ]
  },
  {
    id: 2,
    name: 'Zone 2',
    zipCodes: [50028, 50029, 50030],
    deliveryDates: [
      {
        id: 0,
        day: 0,
        disabled: false,
        isSelected: false
      },
      {
        id: 1,
        day: 1,
        disabled: false,
        isSelected: false
      },
      {
        id: 2,
        day: 2,
        disabled: false,
        isSelected: true
      }
    ]
  },
  {
    id: 3,
    name: 'Zone 3',
    zipCodes: [60028, 60029, 60030],
    deliveryDates: [
      {
        id: 0,
        day: 0,
        disabled: false,
        isSelected: false
      },
      {
        id: 1,
        day: 1,
        disabled: false,
        isSelected: false
      },
      {
        id: 2,
        day: 2,
        disabled: false,
        isSelected: true
      }
    ]
  }
]

const Location = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [zones, setZones] = useState(deliveryZones)
  const [currentZone, setCurrentZone] = useState({})
  const [email, setEmail] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [zipCodeError, setZipCodeError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(displayHeader(true))
    dispatch(setIsNextButtonActive(true))

    setZones(deliveryZones)

    if (state.email && state.location.zipCode) {
      setZipCode(state.location.zipCode)
      setEmail(state.email)

      const zone = findZipCode(state.location.zipCode)
      if (!zone) {
        dispatch(displayFooter(false))
        return setZipCodeError('Zip code not within the delivery locations')
      }

      setCurrentZone(zone)
      handleDeliveryDate(findSelectedDate(zone.deliveryDates))
      dispatch(selectFaqType(FAQ_TYPE))
      dispatch(displayFooter(true))
    } else {
      dispatch(selectFaqType(null))
      dispatch(displayFooter(false))
    }
  }, [])

  const findZipCode = (zipCode) => {
    let result = null
    zones.forEach((zone) => {
      const found = zone.zipCodes.find((e) => Number(e) === Number(zipCode))
      if (found) {
        result = zone
      }
    })

    return result
  }

  const findSelectedDate = (deliveryDates) =>
    deliveryDates.find((date) => date.isSelected)

  const handleSubmit = async () => {
    setIsLoading(true)
    if (!email || !isValidEmail(email)) {
      return setEmailError('Please type a valid email')
    }

    // TODO: add more validations (wait to see zipCode format)
    if (zipCode.length < 4) {
      return setZipCodeError('Please type a valid zip code')
    }

    dispatch(setStoreEmail(email))
    dispatch(
      setLocation({
        zipCode: zipCode,
        deliveryDate: state.location.deliveryDate
      })
    )

    const domain = new URL(window.location.href)
    const shopifyMultipass = await request(
      `${process.env.PROXY_APP_URL}/shopify/multipass-url?shop=${domain.hostname}`,
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
    dispatch(setLocation({ ...state.location, deliveryDate: date }))
  }

  const handleZipCodeChange = (value) => {
    if (Number.isInteger(Number(value))) {
      setZipCode(value)
    }
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
              onChange={(value) => setEmail(value)}
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
        {Object.keys(currentZone).length > 0 && (
          <>
            <div className={`${styles.title} mt-10 mb-5`}>
              Choose Delivery Date
            </div>
            <div className={styles.rows}>
              {currentZone.deliveryDates &&
                currentZone.deliveryDates.map((date) => (
                  <div key={date.id}>
                    <LocationDate
                      data={date}
                      onClick={() => handleDeliveryDate(date)}
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default withActiveStep(Location, STEP_ID)
