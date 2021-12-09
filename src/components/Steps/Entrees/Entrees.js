import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardQuantities from '../../Cards/CardQuantities'
import {
  getMenuItems,
  getSelectedBundle,
  getBundle,
  withActiveStep
} from '../../Hooks'
import { cartUpdate } from '../../../store/slices/rootSlice'
import styles from './Entrees.module.scss'
import weekday from 'dayjs/plugin/weekday'
import dayjs from 'dayjs'
import { Redirect } from 'react-router'
import Loading from '../Components/Loading'

const FAQ_TYPE = 'entreeType'
const STEP_ID = 4
const ENTREE_CONFIGURATION_TITLE = 'Entree'
const BREAKFAST_CONFIGURATION_TITLE = 'Breakfast'
const EMPTY_STATE_IMAGE =
  'https://sunriseintegration.slack.com//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif'

dayjs.extend(weekday)

const Entrees = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [entrees, setEntrees] = useState([])
  const [entreeQuantity, setEntreeQuantity] = useState(0)
  const [breakfasts, setBreakfasts] = useState([])
  const [breakfastQuantity, setBreakfastQuantity] = useState(0)
  const [temporaryCart, setTemporaryCart] = useState([])

  useEffect(() => {
    getCurrentMenuItems()
  }, [])

  useEffect(() => {
    if (entreeQuantity === 0 && breakfastQuantity === 0) {
      // TODO: enable continue button
      dispatch(cartUpdate(temporaryCart))
    }
  }, [entreeQuantity, breakfastQuantity])

  const getCurrentMenuItems = async () => {
    setIsLoading(true)

    let currentApiBundle = null
    const shopifyProduct = getSelectedBundle(state.bundle.breakfast.tag)

    const { data } = await getBundle(state.tokens.guestToken, shopifyProduct.id)
    if (data.data.length > 0) {
      currentApiBundle = data.data[0]
    }

    const findTitle = (title, search) =>
      title.toLowerCase().includes(search.substr(1, 6))
    for (const configuration of currentApiBundle.configurations) {
      // search for part of the word ENTREE or BREAKFAST in the title
      if (findTitle(configuration.title, ENTREE_CONFIGURATION_TITLE)) {
        await getProducts(configuration, ENTREE_CONFIGURATION_TITLE, setEntrees)
      }

      if (findTitle(configuration.title, BREAKFAST_CONFIGURATION_TITLE)) {
        await getProducts(
          configuration,
          BREAKFAST_CONFIGURATION_TITLE,
          setBreakfasts
        )
      }
    }

    setIsLoading(false)
  }

  const getProducts = async (configuration, title, setContent) => {
    const nextWeekSunday = dayjs()
      .weekday(7)
      .format('YYYY-MM-DDT00:00:00.000[Z]')

    if (configuration.title.toLowerCase().includes(title.substr(1, 6))) {
      const response = await getMenuItems(
        state.tokens.guestToken,
        configuration.bundleId,
        configuration.id,
        `is_enabled=1&display_after=${nextWeekSunday}`
      )

      if (response.data?.data && response.data?.data.length > 0) {
        const filteredProducts = await filterShopifyProducts(
          response.data.data[0].products,
          shopProducts
        )

        const filteredVariants = await filterShopifyVariants(
          filteredProducts,
          configuration
        )
        setContent(filteredVariants)

        if (title === BREAKFAST_CONFIGURATION_TITLE) {
          setBreakfastQuantity(response.data.data[0].configuration.quantity)
        }
        if (title === ENTREE_CONFIGURATION_TITLE) {
          setEntreeQuantity(response.data.data[0].configuration.quantity)
        }
      }
    }
  }

  const filterShopifyProducts = async (items, shopifyProducts) =>
    new Promise((resolve) => {
      const apiProductIds = items.map((i) => Number(i.platform_product_id))

      const filteredProducts = shopifyProducts.filter((p) =>
        apiProductIds.includes(p.id)
      )

      resolve(filteredProducts)
    })

  const filterShopifyVariants = async (shopifyProducts, configuration) =>
    new Promise((resolve) => {
      const filteredVariants = []
      for (const product of shopifyProducts) {
        const filtered = product.variants.filter(
          (variant) =>
            variant.options.includes(state.entreeType.title) &&
            variant.options.includes(state.entreeSubType.title)
        )

        filtered.map((f) => {
          f.images = product.images
          f.configurationBundleId = configuration.bundleId
          f.configurationContentId = configuration.id
          f.quantity = 0

          if (f.name.includes('-')) {
            f.name = f.name.split('-')[0]
          }

          return f
        })

        if (filtered.length > 0) {
          filteredVariants.push(...filtered)
        }
      }

      resolve(filteredVariants)
    })

  const handleAddItem = (item, type) => {
    if (type === 'breakfast' && breakfastQuantity === 0) {
      return
    }
    if (type === 'entree' && entreeQuantity === 0) {
      return
    }

    const currentCartState = [...temporaryCart]
    const existingItem = currentCartState.find(
      (i) => Number(i.id) === Number(item.id)
    )

    if (!existingItem) {
      currentCartState.push({
        ...item,
        quantity: 1
      })
    } else {
      existingItem.quantity += 1
    }

    if (type === 'breakfast') {
      setBreakfastQuantity(breakfastQuantity - 1)
    }
    if (type === 'entree') {
      setEntreeQuantity(entreeQuantity - 1)
    }
    setTemporaryCart([...currentCartState])
  }

  const handleRemoveItem = (item, type) => {
    let currentCartState = [...temporaryCart]
    const existingItem = currentCartState.find(
      (i) => Number(i.id) === Number(item.id)
    )

    if (existingItem) {
      existingItem.quantity -= 1
    }

    if (existingItem.quantity === 0) {
      currentCartState = currentCartState.filter(
        (i) => i.id !== existingItem.id
      )
    }

    if (type === 'breakfast') {
      setBreakfastQuantity(breakfastQuantity + 1)
    }
    if (type === 'entree') {
      setEntreeQuantity(entreeQuantity + 1)
    }
    setTemporaryCart([...currentCartState])
  }

  const getItemQuantity = (item) => {
    const currentItem = temporaryCart.find(
      (i) => Number(i.id) === Number(item.id)
    )

    return currentItem?.quantity || 0
  }

  const isItemSelected = (item) => {
    return !!temporaryCart.find((c) => c.id === item.id)
  }

  if (state.entreeType.id === 0) {
    return <Redirect push to="/steps/3" />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <div className={`${styles.title} mb-7`}>Choose Entrees</div>
        <div className={`defaultWrapper ${styles.quantities}`}>
          <div>
            <span className={styles.number}>{breakfastQuantity}</span>{' '}
            Breakfasts Left
          </div>
          <div className="px-3">
            <span className={styles.number}>{entreeQuantity}</span> Entrees Left
          </div>
        </div>
        <div className={styles.listHeader}>
          <div className={styles.title}>Breakfasts</div>
          <div className={`px-10 ${styles.quantities}`}>
            <span className={styles.number}>{breakfastQuantity}</span>{' '}
            Breakfasts Left
          </div>
        </div>
        <div className={`${styles.cards} mb-10`}>
          {breakfasts.map((breakfast) => {
            return (
              <CardQuantities
                key={breakfast.id}
                title={breakfast.name}
                image={
                  breakfast.feature_image
                    ? breakfast.feature_image.src
                    : breakfast.images.length > 0
                    ? breakfast.images[0]
                    : EMPTY_STATE_IMAGE
                }
                metafields={breakfast.metafields}
                isChecked={isItemSelected(breakfast)}
                quantity={getItemQuantity(breakfast)}
                onClick={() => handleAddItem(breakfast, 'breakfast')}
                onAdd={() => handleAddItem(breakfast, 'breakfast')}
                onRemove={() => handleRemoveItem(breakfast, 'breakfast')}
                disableAdd={breakfastQuantity === 0}
              />
            )
          })}
        </div>

        <div className={styles.listHeader}>
          <div className={styles.title}>Entrees</div>
          <div className={`px-10 ${styles.quantities}`}>
            <span className={styles.number}>{entreeQuantity}</span> Entrees Left
          </div>
        </div>
        <div className={`${styles.cards} mb-10`}>
          {entrees.map((entree) => {
            return (
              <CardQuantities
                key={entree.id}
                title={entree.name}
                image={
                  entree.feature_image
                    ? entree.feature_image.src
                    : entree.images.length > 0
                    ? entree.images[0]
                    : EMPTY_STATE_IMAGE
                }
                metafields={entree.metafields}
                isChecked={isItemSelected(entree)}
                quantity={getItemQuantity(entree)}
                onClick={() => handleAddItem(entree, 'entree')}
                onAdd={() => handleAddItem(entree, 'entree')}
                onRemove={() => handleRemoveItem(entree, 'entree')}
                disableAdd={entreeQuantity === 0}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default withActiveStep(Entrees, STEP_ID)
