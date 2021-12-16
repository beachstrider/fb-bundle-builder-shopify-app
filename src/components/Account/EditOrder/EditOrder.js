import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  displayHeader,
  displayFooter,
  selectFaqType,
  setTokens
} from '../../../store/slices/rootSlice'
import {
  getMenuItems,
  getSelectedBundle,
  getBundle,
  withActiveStep
} from '../../Hooks'
import { Link, Redirect, useParams, useLocation } from 'react-router-dom'
import styles from './EditOrder.module.scss'
import CardQuantities from '../../Cards/CardQuantities'
import * as dayjs from 'dayjs';
import { request } from '../../../utils';
import { Spinner } from '../../Global';

// editItemsArr[config.id].push({
//   title: thisProduct ? thisProduct.title : 'default product',
//   image: thisProduct && thisProduct.images.length > 0 ? thisProduct.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
//   metafields: [{
//     variantId: '123',
//     key: 'total_fat',
//     name: 'Total Fat:', 
//     value: '123'
//   }],
//   quantity: 0
// })

function useQuery () {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const EditOrder = () => {
    const { orderId } = useParams();
    const query = useQuery();
    const state = useSelector((state) => state)
    const dispatch = useDispatch()
    const [bundle, setBundle] = useState([])
    const [bundleQty, setBundleQty] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [editable, setEditable] = useState(false)
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        dispatch(displayHeader(false))
        dispatch(displayFooter(false))
        dispatch(selectFaqType(null))
        console.log('orderId: ',orderId)
        console.log('query: ',query.get("date"))
        console.log('shop product example: ', shopProducts[0])
        // setBundleQty(qtyObj)
        // setBundle(newObj)
        if (!state.tokens.userToken) {
          const thisToken = getToken();
          getCustomerBundleItems(thisToken);
        } else {
          getCustomerBundleItems(state.tokens.userToken);
        }
        
    }, []);
    
      const getToken = async () => {
        const tokenResponse = await useUserToken();
        console.log('tokenResponse: ', tokenResponse)
        if (tokenResponse.token) {
          dispatch(
            setTokens({
              ...state.tokens,
              userToken: `Bearer ${tokenResponse.token}`
            })
          )
          return `Bearer ${tokenResponse.token}`
        }
      }

    const getBundleItems = async ( bundleId, configId, token) => {
      console.log('call avail items - get it')
      const thisWeek = dayjs(query.get("date"));
      const response = await getMenuItems(
        token,
        bundleId,
        configId,
        `is_enabled=1&display_after=${thisWeek.format('YYYY-MM-DDT00:00:00.000Z')}`
      )
      console.log('response from get items call', response)
      if (response.data?.data && response.data?.data.length > 0) {
        const filteredProducts = await filterShopifyProducts(
          response.data.data[0].products,
          shopProducts
        )
  
        const filteredVariants = await filterShopifyVariants(
          filteredProducts,
          configuration
        )

        const configTitle = response.data.data[0].configuration.title
        const configId = response.data.data[0].configuration.id
        const quantity = response.data.data[0].configuration.quantity
  
        return {
          id: configId,
          products: filteredVariants,
          quantity: quantity,
          title: configTitle,
          quantityCountdown: quantity

        }
      }
    };

    const getCustomerBundleItems = async (token) => {
      const thisWeek = dayjs(query.get("date"));
      const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${orderId}/orders`, { method: 'get', data: '', headers: { authorization: token }}, 3)
      console.log('this is the subscription orders', subApi)
      const bunQty = {}
      // TODO call bundle to get configurations
      // TODO Check display date for config and call products available
      // TODO Check customer order and add in QTY's if previously added
      
      const editItemsArr = []
      if(subApi.data.data){

        for(const order of subApi.data?.data){
          const editItemsConfigArr = []
          console.log('the order in loop: ', order)
          if(order.bundle_configuration_content?.display_after){
            console.log('make the call for the products');
            const bundleProducts = false // await getBundleItems(order.subscription.bundle_id, order.bundle_configuration_content_id, token)

            for(const product of order?.items){
              // TODO filter products looking for variant
              // TODO need to combine order products into the product array and update quantities

              const thisProd = await findProductFromVariant(product.platform_product_variant_id);
                          
              if(thisProd.any('product')){
                  editItemsConfigArr.push({
                    title: thisProd?.product?.title ? thisProd.product.title : 'default product',
                    image: thisProd?.product?.images && thisProd.product?.images.length > 0 ? thisProd.product.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
                    metafields: thisProd?.metafields?.length > 0 ? thisProd.metafields : [],
                    quantity: product.quantity
                  })
              }
            }
            
            console.log('products array: ', editItemsConfigArr);
            // bunQty[order.bundle_configuration_content_id] = 12; // bundleProducts?.quantityCountdown
            editItemsArr.push({
              id: bundleProducts ? bundleProducts.id : order.id,
              title: bundleProducts ? bundleProducts.title : `Config Title - ${order.id}`,
              products: editItemsConfigArr
            })
          }
        }
        console.log('the qty object: ', bunQty)
        // setBundleQty(bunQty)
        setBundle(editItemsArr)
        console.log('looped subs: ', editItemsArr)
        setLoading(false)
      }
    }

    const filterShopifyProducts = async (items, shopifyProducts) =>
    new Promise((resolve) => {
      const apiProductIds = items.map((i) => Number(i.platform_product_id))

      const filteredProducts = shopifyProducts.filter((p) =>
        apiProductIds.includes(p.id)
      )

      const mappedProducts = filteredProducts.map((product) => ({
        ...product,
        bundle_configuration_content_id: items.find(
          (i) => Number(i.platform_product_id) === Number(product.id)
        ).bundle_configuration_contents_id
      }))

      resolve(mappedProducts)
    })

  const findProductFromVariant = async (variantId) => 
  new Promise((resolve) => {
    let foundProduct = {};
    console.log('find this variant: ', variantId);
    for (const product of shopProducts) {
      const variant = product.variants.filter( v => v.id === variantId)
      if(product.variants.filter( v => v.id === variantId).length > 0){
        foundProduct = {
          product,
          metafields: variant[0].metafields
        }
      }
    }
    console.log('found it? : ', foundProduct);
    resolve(foundProduct)
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
          f.configurationContentId = product.bundle_configuration_content_id
          f.bundleContentId = configuration.id
          f.quantity = 0
          f.type = configuration.title

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

    // TODO: WIP
    const handleAddItem = (listId, list, item) => {
        if(bundleQty[listId] > 0){
            const newBundle = bundle;
            newBundle.configurations[list].contents[item].quantity = newBundle.configurations[list].contents[item].quantity + 1;
            setBundle({ ...newBundle })
            const qtyObj = { ...bundleQty, [newBundle.configurations[list].id]:  bundleQty[newBundle.configurations[list].id] - 1 };
            setBundleQty(qtyObj)
        }

        let activateButton = 0;
        for (const [key, value] of Object.entries(bundleQty)) {
            activateButton = activateButton + value
        }
        if(activateButton === 0){
            setDisabled(false)
        }
    }

    const handleRemoveItem = (listId, list, item) => {
        if(bundleQty[listId] > 0){
            const newBundle = bundle;
            newBundle.configurations[list].contents[item].quantity = newBundle.configurations[list].contents[item].quantity - 1;
            setBundle(...newBundle)
        }
    }

    const handleSave = () => {
        const myOrder = [];
        bundle.configurations.forEach(config => {
            config.contents.forEach( item => {
                if(item.quantity > 0){
                    myOrder.push(item)
                }
            })
        })
        console.log('My order: ', myOrder);
    }
    
    if(shopCustomer.id === 0){
      return <Redirect push to="/" />
    }

    if (loading) {
      // TODO: work in progress
      return (
        <Spinner label="Loading..." />
      )
    }
    
    return (
        <div className="contentWrapper">
            <div>
                <h3 className={styles.header}>Choose Items</h3>
                <div className={styles.subHeaderRow}>
                {bundle.map( (config, index) => (
                    <p key={index} className={styles.subHeaders}><span className={styles.greenNumbers}>{bundleQty[config.id]}</span> {config.title} Left</p>
                ))}
                </div>
            </div>
            {bundle.map( (config, index) => (
                <div key={index}>
                    <div className={styles.headerRow}>
                        <h3 className={styles.noMargin}>{config.title}</h3>
                        <p className={styles.subHeaders}><span className={styles.greenNumbers}>{bundleQty[config.id]}</span> {config.title} Left</p>      
                    </div>
                    <div className={styles.menuRow}>
                        {config.products.map((item, idx) => (
                            <div key={idx} className={`${styles.menuItemWrapper} mb-10 px-1`}>
                                <CardQuantities
                                    title={item.title}
                                    image={item.platform_img}
                                    metafields={item.metafields}
                                    isChecked={item.quantity > 0}
                                    quantity={item.quantity}
                                    onClick={() => handleAddItem(config.id, index, idx)}
                                    onAdd={() => handleAddItem(config.id, index, idx)}
                                    onRemove={() => handleRemoveItem(config.id, index, idx)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <div className={styles.buttonsRow}>
                    <Link to="/account" className="secondaryButton">Cancel</Link>
                    <button disabled={disabled} className="primaryButton" onClick={handleSave}>Save</button> 
            </div>
        </div>
    )
}
    
export default EditOrder
    