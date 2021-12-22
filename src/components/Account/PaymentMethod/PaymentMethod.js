import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './PaymentMethod.module.scss'
import { SideMenu } from '../Components/SideMenu'
import { useDispatch } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType
  } from '../../../store/slices/rootSlice'
import { request } from '../../../utils';
  

const PaymentMethod = () => {

    if(shopCustomer.id === 0){
        return <Redirect push to="/" />
    }

    const [cardNumber, setCardNumber] = React.useState('')
    const dispatch = useDispatch()

    React.useEffect( () => {
        dispatch(displayHeader(false))
        dispatch(displayFooter(false))
        dispatch(selectFaqType(null))
        let cardSearch = false;
        for(const order of shopCustomer.orders){
            for(const transaction of order.transactions){
                if(!cardSearch && transaction.cardNumber !== ''){
                    cardSearch = transaction.cardNumber
                    setCardNumber(transaction.cardNumber)
                }
            }
        }
        
      }, []);

    const handleEdit = async () => {
        const subApi = await request(`${process.env.PROXY_APP_URL}/recharge/customer?email=${shopCustomer.email}`, { method: 'get', data: '', headers: { authorization: 'qweqweqwe' }}, 3)

        window.location.href = `https://quickfresh-sandbox.myshopify.com/tools/recurring/portal/${subApi.data.customers[0].hash}/payment_sources?token=${window.customerToken}`;
    }

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
                <p></p>
            </div>
            <div className="bundleTwoThirds">
                <div className="headerOffset">
                    <h2>Payment Method</h2>
                </div>
            </div>
        </div>
        <div className="bundleRow">
            <div className="bundleOneThird">
                <SideMenu active='payment-method' />
            </div>
            <div className="bundleTwoThirds">
                <div className="bundleBuilderCard">
                    <div className={styles.contentCardWrapper}>
                        <div className={styles.contentCardNavigation}>
                            <h3>Default Card</h3>
                            <button onClick={handleEdit} className="secondaryButton">Edit Info</button>
                        </div>
                        <div>
                            <p><span className={styles.boldTextField}>Name:</span>{shopCustomer.fullName}</p>
                            <p><span className={styles.boldTextField}>Card Number:</span>{cardNumber}</p>
                            <div className={styles.accountAddress}><p><span className={styles.boldTextField}>Billing Address:</span></p><p>{shopCustomer.address.street}<br />{shopCustomer.address.city}, {shopCustomer.address.provinceCode} {shopCustomer.address.zip}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentMethod