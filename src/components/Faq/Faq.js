import React, { useEffect, useState } from 'react'
import styles from './Faq.modules.scss'
import { FaqFrequency, FaqLocation } from './Types'

const faqs = [
  {
    type: 'frequency',
    title: 'FAQ’s For Meal Plans',
    component: <FaqFrequency />
  },
  {
    type: 'location',
    title: 'FAQ’s For Location',
    component: <FaqLocation />
  }
]

const Faq = ({ type }) => {
  const [currentFaq, setCurrentFaq] = useState({ title: '', component: null })

  useEffect(() => {
    const selectedFaq = faqs.find((faq) => faq.type === type)
    if (selectedFaq) {
      setCurrentFaq(selectedFaq)
    }
  }, [type])

  return (
    <div>
      <div className={styles.wrapperTitle}>{currentFaq.title}</div>
      {currentFaq.component}
    </div>
  )
}

export default Faq
