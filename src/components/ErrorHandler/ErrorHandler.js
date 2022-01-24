import React from 'react'
import { Card, Frame, Page } from '@shopify/polaris'
import { ErrorBoundary } from 'react-error-boundary'
import Toast from '../Global/Toast'

const ErrorHandler = (props) => {
  const resetErrorBoundary = () => {
    console.log('reset app')
    location.reload()
  }

  const ErrorFallback = ({ error, resetErrorBoundary }) => {
    const [customError, setCustomError] = React.useState({
      open: false,
      status: 'Danger',
      message: 'Something went wrong...'
    })
    const closeAlert = () => {
      setCustomError({ ...customError, open: false })
    }

    return (
      <div style={{ height: '450px' }}>
        <Card sectioned>
          <div style={{ margin: '4rem' }}>
            <h3>Something went wrong...</h3>
            <p>
              Please try to refresh the page or if the error persists, please
              contact our support team.
            </p>
            {/* <pre>{error.message}</pre> */}
            <div className="button lightButton" onClick={resetErrorBoundary}>
              Try again
            </div>
          </div>
        </Card>
        <Toast
          open={customError.open}
          status={customError.status}
          message={customError.message}
          duration={4000}
          autoDelete
          handleClose={closeAlert}
        />
      </div>
    )
  }

  const handleError = (error, errorInfo) => {
    // TODO: log this error somewhere?
    // console.log('Error:', error, errorInfo)
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={handleError}
      onReset={resetErrorBoundary}
    >
      {props.children}
    </ErrorBoundary>
  )
}

export default ErrorHandler
