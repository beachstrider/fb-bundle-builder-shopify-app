import { Card } from '@shopify/polaris'
import React from 'react'
import styles from '../Faq.modules.scss'

const faqs = [
  {
    title: 'How to prepare?',
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat.`
  },
  {
    title: 'How to clean?',
    text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat.`
  }
]

const FaqLocation = () => {
  return (
    <div className={styles.faqType}>
      {faqs.map((faq, index) => (
        <div key={index}>
          <Card sectioned>
            {/* TODO: Just a placeholder */}
            <div>{faq.title}</div>
            <div>
              <blockquote>{faq.text}</blockquote>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}

export default FaqLocation
