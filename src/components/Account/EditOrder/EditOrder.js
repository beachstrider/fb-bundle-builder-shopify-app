import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType,
    setTokens
  } from '../../../store/slices/rootSlice'
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
      const thisWeek = dayjs(query.get("date"));
      console.log(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundleId}/configurations/${configId}/contents?display_after=${thisWeek.format('YYYY-MM-DD')}T00:00:00.000Z`)
      const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundleId}/configurations/${configId}/contents?display_after=${thisWeek.format('YYYY-MM-DD')}T00:00:00.000Z`, { method: 'get', data: '', headers: { authorization: token }}, 3)
      console.log('this is the bundle products', subApi)
      return subApi.data.data[0].products
    };

    const getCustomerBundleItems = async (token) => {
      const thisWeek = dayjs(query.get("date"));
      const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${orderId}/orders`, { method: 'get', data: '', headers: { authorization: token }}, 3)
      console.log('this is the subscription orders', subApi)

      // TODO call bundle to get configurations
      // TODO Check display date for config and call products available
      // TODO Check customer order and add in QTY's if previously added
      
      const editItemsArr = []
      if(subApi.data.data){
        const bundle = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${orderId}/orders`, { method: 'get', data: '', headers: { authorization: token }}, 3)
        console.log('this is the subscription orders', bundle)
      }
    }

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
                        {products.map((item, idx) => (
                            <div key={idx} className={`${styles.menuItemWrapper} mb-10 px-1`}>
                                <CardQuantities
                                    title={item.ProductVariants.title}
                                    image={item.ProductVariants.platform_img}
                                    metafields={item.ProductVariants.metafields}
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
    