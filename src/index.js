import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store/store'
// Sentry
import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

console.log(process.env.SENTRY_DSN, process.env.SENTRY_ENVIRONMENT);
Sentry.init({
  environment: process.env.SENTRY_ENVIRONMENT,
  dsn: process.env.SENTRY_DSN,
  integrations: [new BrowserTracing({
    tracingOrigins: ["localhost", process.env.BUNDLE_API_URL, /^\//],
    routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
  })],
  tracesSampleRate: process.env.SENTRY_SAMPLE_RATE
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
