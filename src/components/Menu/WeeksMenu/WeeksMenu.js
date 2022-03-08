import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dates } from '..'
import {
  displayFooter,
  displayHeader,
  setTokens
} from '../../../store/slices/rootSlice'
import { Spinner } from '../../Global'
import { useGuestToken } from '../../Hooks'
import TopTitle from '../../Steps/Components/TopTitle'

const WeeksMenu = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))

    !state.tokens.guestToken ? generateToken() : setIsLoading(false)
  }, [])

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
      setError({
        open: true,
        status: 'Danger',
        message: 'There was an error. Please try again'
      })
    }
  }

  const handleSelectedWeek = (date) => {
    console.log('selected date:', date)
  }

  if (isLoading) {
    return <Spinner label="Loading..." />
  }

  return (
    <div>
      <TopTitle
        title="Explore Our Rotating Weekly Menu"
        subTitle="Choose From 20+ Healthy, Chef-Curated Meals Each Week"
      />
      <Dates onClick={handleSelectedWeek} />
    </div>
  )
}

export default WeeksMenu
