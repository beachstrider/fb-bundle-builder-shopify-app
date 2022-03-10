import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dates, MenuTypes } from '..'
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'
import { TOAST_INITIAL_STATE } from '../../../constants/toasts'
import {
  displayFooter,
  displayHeader,
  setTokens
} from '../../../store/slices/rootSlice'
import { Spinner } from '../../Global'
import Toast from '../../Global/Toast'
import { getEnabledBundles, useGuestToken } from '../../Hooks'
import TopTitle from '../../Steps/Components/TopTitle'

const WeeksMenu = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(TOAST_INITIAL_STATE)
  const [firstBundle, setFirstBundle] = useState({})

  useEffect(() => {
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))

    fetchData()
  }, [])

  const displayErrorMessage = () =>
    setError({
      open: true,
      status: 'Danger',
      message: DEFAULT_ERROR_MESSAGE
    })

  const generateToken = async () => {
    const guestToken = await useGuestToken()
    if (guestToken) {
      dispatch(
        setTokens({
          ...state.tokens,
          guestToken: guestToken
        })
      )
      setIsLoading(false)
    } else {
      return displayErrorMessage()
    }
  }

  const fetchData = async () => {
    !state.tokens.guestToken && (await generateToken())

    try {
      const bundles = await getEnabledBundles(
        state.tokens.guestToken,
        'is_enabled=1&pageSize=1'
      )

      setFirstBundle(bundles.data.data[0])
      setIsLoading(false)
    } catch (error) {
      return displayErrorMessage()
    }
  }

  const handleSelectedWeek = (date) => {
    console.log('selected date:', date)
  }

  const handleSelectedType = (type) => {
    console.log('selected type:', type)
  }

  if (isLoading && !firstBundle) {
    return <Spinner label="Loading..." />
  }

  return (
    <div>
      <TopTitle
        title="Explore Our Rotating Weekly Menu"
        subTitle="Choose From 20+ Healthy, Chef-Curated Meals Each Week"
      />
      <Dates bundle={firstBundle} onClick={handleSelectedWeek} />
      <MenuTypes bundle={firstBundle} onClick={handleSelectedType} />
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

export default WeeksMenu
