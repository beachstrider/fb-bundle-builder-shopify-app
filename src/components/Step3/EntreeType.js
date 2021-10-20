import React from 'react'
import { useSelector } from 'react-redux'

const EntreeTypes = () => {
  const state = useSelector((state) => state)

  // TODO: example page
  return (
    <div className="defaultWrapper">
      <div>
        <div>
          <h1>Step 3</h1>
        </div>
      </div>
    </div>
  )
}

export default EntreeTypes
