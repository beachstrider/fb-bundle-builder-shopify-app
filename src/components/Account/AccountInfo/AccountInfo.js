import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './AccountInfo.module.scss'
import { SideMenu } from '../Components/SideMenu'
import { useDispatch } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType
  } from '../../../store/slices/rootSlice'
import { request } from '../../../utils';
  

const AccountInfo = () => {
    const dispatch = useDispatch()

    React.useEffect( () => {
        dispatch(displayHeader(false))
        dispatch(displayFooter(false))
        dispatch(selectFaqType(null))
    
    }, []);
    
    const handleEdit = async () => {
        const subApi = await request(`${process.env.PROXY_APP_URL}/recharge/customer?email=${shopCustomer.email}`, { method: 'get', data: '', headers: { authorization: 'qweqweqwe' }}, 3)

        window.location.href = `https://quickfresh-sandbox.myshopify.com/tools/recurring/portal/${subApi.data.customers[0].hash}/addresses?token=${window.customerToken}`;
    }

    if(shopCustomer.id === 0){
        return <Redirect push to="/" />
    }

    return (
        <div className="contentWrapper">
            <div className="bundleRow">
                <div className="bundleOneThird">
                    <p></p>
                </div>
                <div className="bundleTwoThirds">
                    <div className="headerOffset">
                        <h2>Account Info</h2>
                    </div>
                </div>
            </div>
            <div className="bundleRow">
                <div className="bundleOneThird">
                    <SideMenu active="account-info" />
                </div>
                <div className="bundleTwoThirds">
                    <div className="bundleBuilderCard">
                        <div className={styles.contentCardWrapper}>
                            <div className={styles.contentCardNavigation}>
                                <h3>Personal Info</h3>
                                <button onClick={handleEdit} className="secondaryButton">Edit Info</button>
                            </div>
                            <div>
                                <p><span className={styles.boldTextField}>Name:</span>{shopCustomer.fullName}</p>
                                <p><span className={styles.boldTextField}>Email:</span>{shopCustomer.email}</p>
                                <p><span className={styles.boldTextField}>Phone:</span>{shopCustomer.address.phone}</p>
                                <div className={styles.accountAddress}><p><span className={styles.boldTextField}>Address:</span></p><p>{shopCustomer.address.street}<br />{shopCustomer.address.city}, {shopCustomer.address.provinceCode} {shopCustomer.address.zip}</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo