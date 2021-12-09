import { Spinner } from '../../../Global'
const Loading = () => {
  return (
    <div className="customSpinner">
      <div>
        <Spinner />
      </div>
      <div>Loading...</div>
    </div>
  )
}

export default Loading
