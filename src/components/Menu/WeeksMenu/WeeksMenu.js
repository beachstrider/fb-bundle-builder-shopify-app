import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dates, MenuTypes, Meals } from '..'
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'
import { TOAST_INITIAL_STATE } from '../../../constants/toasts'
import {
  displayFooter,
  displayHeader,
  setTokens
} from '../../../store/slices/rootSlice'
import { Spinner } from '../../Global'
import Toast from '../../Global/Toast'
import {
  getBundleConfigurations,
  getEnabledBundles,
  useGuestToken
} from '../../Hooks'
import TopTitle from '../../Steps/Components/TopTitle'

const WeeksMenu = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(TOAST_INITIAL_STATE)
  const [firstBundle, setFirstBundle] = useState({})
  const [selectedType, setSelectedType] = useState({})
  const [selectedWeek, setSelectedWeek] = useState({})
  const [configurations, setConfigurations] = useState([])

  useEffect(() => {
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))

    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [state.tokens.guestToken])

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
    try {
      !state.tokens.guestToken && (await generateToken())

      /*
       * Note: In order to display all available weeks, the app
       * is pulling the first available bundle
       * */
      const bundles = await getEnabledBundles(
        state.tokens.guestToken,
        'is_enabled=1&pageSize=1'
      )

      if (bundles.status === 401) {
        return await generateToken()
      }

      setFirstBundle(bundles.data.data[0])

      const configurations = await getBundleConfigurations(
        state.tokens.guestToken,
        bundles.data.data[0].id
      )

      setConfigurations(configurations.data.data)
      setIsLoading(false)
    } catch (error) {
      return displayErrorMessage()
    }
  }

  const handleSelectedWeek = (week) => {
    setSelectedWeek(week)
  }

  const handleSelectedType = (type) => {
    setSelectedType(type)
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
      {configurations.length > 0 && (
        <Dates
          bundle={firstBundle}
          configurations={configurations}
          onClick={handleSelectedWeek}
        />
      )}
      <MenuTypes bundle={firstBundle} onClick={handleSelectedType} />
      <Meals
        week={selectedWeek}
        bundleSubType={selectedType}
        configurations={configurations}
      />
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
