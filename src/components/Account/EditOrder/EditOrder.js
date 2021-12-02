import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType
  } from '../../../store/slices/rootSlice'
import { Link, Redirect, useParams, useLocation } from 'react-router-dom'
import styles from './EditOrder.module.scss'
import CardQuantities from '../../Cards/CardQuantities'

const bundleObj = {
    "id": 1,
    "account_id": 1,
    "product_id": null,
    "platform_product_id": null,
    "title": "3-Day with Breakfast",
    "options": null,
    "is_enabled": 1,
    "createdAt": "2021-11-09T21:58:39.000Z",
    "updatedAt": "2021-11-09T21:58:39.000Z",
    "configurations": [
      {
        "id": 1,
        "bundle_id": 1,
        "title": "Breakfast",
        "quantity": 5,
        "createdAt": "2021-11-09T21:58:39.000Z",
        "updatedAt": "2021-11-09T21:58:39.000Z",
        "bundleId": 1,
        "contents": [
          {
            "id": 1,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 1,
            "platform_product_variant_id": 41375600771257,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 1,
              "product_id": 1,
              "title": "Ancho Lime Chicken",
              "sku": "KH-121",
              "platform_id": 41375600771257,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/ancho-lime-chicken-high-protein",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/ancho-lime-chicken-high-protein-943209.jpg?v=1631911470",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 2,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 2,
            "platform_product_variant_id": 41432952766649,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 2,
              "product_id": 2,
              "title": "Andouille Fennel Salad",
              "sku": "KH-269",
              "platform_id": 41432952766649,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/andouille-fennel-salad-high-protein",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/andouille-fennel-salad-high-protein-469235.jpg?v=1635634422",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 3,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 3,
            "platform_product_variant_id": 41213176643769,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 3,
              "product_id": 3,
              "title": "Asian Slaw Salad",
              "sku": "KH-176",
              "platform_id": 41213176643769,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/asian-slaw-salad-high-protein",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asian-slaw-salad-high-protein-385481.jpg?v=1633122770",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 4,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 4,
            "platform_product_variant_id": 41213176545465,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 4,
              "product_id": 4,
              "title": "Asparagus Mushroom Frittata",
              "sku": "KB-177",
              "platform_id": 41213176545465,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/asparagus-mushroom-frittata-keto-breakfast",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asparagus-mushroom-frittata-keto-breakfast-367122.jpg?v=1633122770",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 5,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 5,
            "platform_product_variant_id": 41479168196793,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 5,
              "product_id": 5,
              "title": "Bacon Ranch Chicken",
              "sku": "KH-165",
              "platform_id": 6995052527801,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/bacon-ranch-chicken-high-protein-2",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 6,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 6,
            "platform_product_variant_id": 40812018729145,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 6,
              "product_id": 6,
              "title": "Barbados Sirloin",
              "sku": "KH-100",
              "platform_id": 40812018729145,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/barbados-sirloin-high",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/barbados-sirloin-high-protein-374434.jpg?v=1630652440",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          }
        ]
      },
      {
        "id": 2,
        "bundle_id": 1,
        "title": "Entrees",
        "quantity": 12,
        "createdAt": "2021-11-09T21:58:39.000Z",
        "updatedAt": "2021-11-09T21:58:39.000Z",
        "bundleId": 1,
        "contents": [
          {
            "id": 1,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 1,
            "platform_product_variant_id": 41375600771257,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 1,
              "product_id": 1,
              "title": "Ancho Lime Chicken",
              "sku": "KH-121",
              "platform_id": 41375600771257,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/ancho-lime-chicken-high-protein",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/ancho-lime-chicken-high-protein-943209.jpg?v=1631911470",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 2,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 2,
            "platform_product_variant_id": 41432952766649,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 2,
              "product_id": 2,
              "title": "Andouille Fennel Salad",
              "sku": "KH-269",
              "platform_id": 41432952766649,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/andouille-fennel-salad-high-protein",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/andouille-fennel-salad-high-protein-469235.jpg?v=1635634422",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 3,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 3,
            "platform_product_variant_id": 41213176643769,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 3,
              "product_id": 3,
              "title": "Asian Slaw Salad",
              "sku": "KH-176",
              "platform_id": 41213176643769,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/asian-slaw-salad-high-protein",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asian-slaw-salad-high-protein-385481.jpg?v=1633122770",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 4,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 4,
            "platform_product_variant_id": 41213176545465,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 4,
              "product_id": 4,
              "title": "Asparagus Mushroom Frittata",
              "sku": "KB-177",
              "platform_id": 41213176545465,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/asparagus-mushroom-frittata-keto-breakfast",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asparagus-mushroom-frittata-keto-breakfast-367122.jpg?v=1633122770",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 5,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 5,
            "platform_product_variant_id": 41479168196793,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 5,
              "product_id": 5,
              "title": "Bacon Ranch Chicken",
              "sku": "KH-165",
              "platform_id": 6995052527801,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/bacon-ranch-chicken-high-protein-2",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          },
          {
            "id": 6,
            "customer_subscription_bundle_confirguration_id": 1,
            "product_variant_id": 6,
            "platform_product_variant_id": 40812018729145,
            "created_at": "2021-11-09 21:58:39",
            "updated_at": "2021-11-09 21:58:39",
            "ProductVariants": {
              "id": 6,
              "product_id": 6,
              "title": "Barbados Sirloin",
              "sku": "KH-100",
              "platform_id": 40812018729145,
              "platform_url": "https://quickfresh-sandbox.myshopify.com/products/barbados-sirloin-high",
              "platform_img": "https://cdn.shopify.com/s/files/1/0596/3694/0985/products/barbados-sirloin-high-protein-374434.jpg?v=1630652440",
              "platform_data": "description",
              "metafields": {
                "fat": 25,
                "carbs": 25,
                "protein": 26,
                "calories": 24
              }
            }
          }
        ]
      }
    ]
  }

function useQuery () {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const EditOrder = () => {
    const { orderId } = useParams();
    const query = useQuery();
    const dispatch = useDispatch()
    const [bundle, setBundle] = useState(bundleObj)
    const [bundleQty, setBundleQty] = useState({})
    const [disabled, setDisabled] = useState(true)

    React.useEffect(() => {
        dispatch(displayHeader(false))
        dispatch(displayFooter(false))
        dispatch(selectFaqType(null))
        console.log('orderId: ',orderId)
        console.log('query: ',query.get("date"))
        const qtyObj = {};
        const newObj = bundleObj
        bundleObj.configurations.forEach((c, i) => {
            qtyObj[c.id] = c.quantity;
            c.contents.forEach( (item, idx) => {
                newObj.configurations[i].contents[idx].quantity = 0;
            })
        });
        setBundleQty(qtyObj)
        setBundle(newObj)
    }, []);

    if(shopCustomer.id === 0){
        return <Redirect push to="/" />
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

    return (
        <div className="contentWrapper">
            <div>
                <h3 className={styles.header}>Choose {bundle.title} Items</h3>
                <div className={styles.subHeaderRow}>
                {bundle.configurations.map( (config, index) => (
                    <p key={index} className={styles.subHeaders}><span className={styles.greenNumbers}>{bundleQty[config.id]}</span> {config.title} Left</p>
                ))}
                </div>
            </div>
            {bundle.configurations.map( (config, index) => (
                <div key={index}>
                    <div className={styles.headerRow}>
                        <h3 className={styles.noMargin}>{config.title}</h3>
                        <p className={styles.subHeaders}><span className={styles.greenNumbers}>{bundleQty[config.id]}</span> {config.title} Left</p>      
                    </div>
                    <div className={styles.menuRow}>
                        {config.contents.map((item, idx) => (
                            <div key={idx} className={`${styles.menuItemWrapper} mb-10 px-1`}>
                                <CardQuantities
                                    title={item.ProductVariants.title}
                                    image={item.ProductVariants.platform_img}
                                    info={item.ProductVariants.metafields}
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
    