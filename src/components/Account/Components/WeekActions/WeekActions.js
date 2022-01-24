import { Link } from 'react-router-dom'
import dayjs from 'dayjs'

const WeekActions = ({ status, date, orderId, displaySummary = false }) => {
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
        <Link
          to={`/edit-order/${orderId}?date=${date}`}
          className="secondaryButton"
        >
          Edit Order
        </Link>
      )}
    </>
  )
}

export default WeekActions
