import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import enTranslations from '@shopify/polaris/locales/en.json'
import { AppProvider } from '@shopify/polaris'
import './App.scss'
import '@shopify/polaris/build/esm/styles.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import 'regenerator-runtime/runtime'
import {
  Frequency,
  Location,
  EntreeType,
  Entrees,
  Review
} from './components/Steps'

import {
  Dashboard,
  OrderHistory,
  AccountInfo,
  PaymentMethod,
  PlanSettings,
  EditOrder
} from './components/Account'
import Faq from './components/Faq/Faq'
import { getSelectedBundle } from './components/Hooks'

function App() {
  const state = useSelector((state) => state)

  useEffect(() => {
    // TODO: remove this block of code later (testing purposes)
    findMissingTags()
  }, [])

  // TODO: remove this block of code later (testing purposes)
  const findMissingTags = async () => {
    const expectedTags = [
      '7 Day with breakfast',
      '7 Day',
      '5 Day with breakfast',
      '5 Day',
      '3 Day with breakfast',
      '3 Day'
    ]

    for (const findTag of expectedTags) {
      const currentTag = await getSelectedBundle(findTag)
      if (Object.keys(currentTag).length === 0) {
        console.log('TAG not found:', findTag)
      }
    }
  }

  return (
    <AppProvider i18n={enTranslations}>
      <Router>
        <div className="defaultWrapper flexColumnDirection">
          {state.displayHeader && <Header />}
          <div className="content mb-9">
            <Switch>
              <Route exact path="/account" component={Dashboard} />
              <Route exact path="/order-history" component={OrderHistory} />
              <Route exact path="/account-info" component={AccountInfo} />
              <Route exact path="/payment-method" component={PaymentMethod} />
              <Route exact path="/plan-settings" component={PlanSettings} />
              <Route exact path="/edit-order/:orderId" component={EditOrder} />

              <Route path="/steps/2" component={Location} />
              <Route path="/steps/3" component={EntreeType} />
              <Route path="/steps/4" component={Entrees} />
              <Route path="/steps/5" component={Review} />
              <Route path="*" component={Frequency} />
            </Switch>
          </div>
          {state.displayFooter && <Footer />}
          {/* {state.faqType && <Faq type={state.faqType} />} */}
        </div>
      </Router>
    </AppProvider>
  )
}

export default App
