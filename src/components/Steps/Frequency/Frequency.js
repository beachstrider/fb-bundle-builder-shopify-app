import React from 'react'
import { useDispatch } from 'react-redux'
import { chooseEntrees } from '../../../store/slices/rootSlice'
import { Link } from 'react-router-dom'
const Frequency = () => {
  const dispatch = useDispatch()

  // TODO: just an example. For inputs we should use a HOC to debounce
  const handleChange = () => {
    dispatch(chooseEntrees(entree))
  }

  return (
    <div className="defaultWrapper">
      <div>
        <label>Entree here</label>
        <input
          type="number"
          name="entree"
          onChange={(e) => handleChange(e.target.value)}
        />
        <Link to="/plan-settings">Plan Settings</Link>
      </div>
    </div>
  )
}

export default Frequency
