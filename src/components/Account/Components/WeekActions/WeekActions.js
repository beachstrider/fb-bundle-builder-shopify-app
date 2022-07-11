import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import dayjs from 'dayjs'

const WeekActions = ({ status, date, orderId, displaySummary = false, isOldBundle = false }) => {

  const history = useHistory()
  const isQuickfresh = process.env.STORE_SETTINGS_KEY === 'quickfresh'
  const isChow = process.env.STORE_SETTINGS_KEY === 'chow'
  // const isCse = process.env.STORE_SETTINGS_KEY === 'cse'
  const handleChange = () => {
    if (isQuickfresh || isChow){
      if (isOldBundle){
        window.location.href = `/pages/bundle-swap`;
      }else{
        history.push(`/edit-order/${orderId}?date=${date}`);
      }
    }else{
      history.push(`/edit-order/${orderId}?date=${date}`);
    }
    return 0
  }

  // This block of code is necessary because there are 2 behaviors for the order summary page
  const OrderSummaryButton = () => {
    return displaySummary ? (
      <Link
        to={`/order-summary/${orderId}?date=${date}`}
        className="secondaryButton"
      >
        Order Summary
      </Link>
    ) : (
      <Link
        to={`/order-history?date=${dayjs.utc(date).format('YYYY-MM-DD')}`}
        className="secondaryButton"
      >
        Order Summary
      </Link>
    )
  }

  return (
    <>
      {status === 'sent' || status === 'locked' ? (
        <OrderSummaryButton />
      ) : (
        <button
          onClick={() => handleChange(isOldBundle) }
          className="secondaryButton">
         Edit Order
        </button>
      )}
    </>
  )
}

export default WeekActions
