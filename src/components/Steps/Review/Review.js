import React from 'react'
import { useSelector } from 'react-redux'

const Review = () => {
  const state = useSelector((state) => state)

  // TODO: example page
  return (
    <div className="defaultWrapper">
      <div>
        <div>
          <h1>Review</h1>
          <div>{JSON.stringify(state, null, 3)}</div>
        </div>
      </div>
    </div>
  )
}

export default Review
