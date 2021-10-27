import React from 'react'
import { useSelector } from 'react-redux'

const Entrees = () => {
  const state = useSelector((state) => state)

  // TODO: example page
  return (
    <div className="defaultWrapper">
      <div>
        <div>
          <h1>Step 4</h1>
        </div>
      </div>
    </div>
  )
}

export default Entrees
