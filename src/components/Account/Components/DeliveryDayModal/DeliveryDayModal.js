import React from 'react';
import * as dayjs from 'dayjs';

const DeliveryDayModal = (props) => {
  const [show, setShow] = React.useState(false);
  const deliveryDays = [
      { value: 1, label:'Monday' },
      { value: 2, label:'Tuesday' },
      { value: 3, label:'Wednesday' },
      { value: 4, label:'Thursday' },
      { value: 5, label:'Friday' },
      { value: 6, label:'Saturday' }
  ]
  // TODO Need to complete delivery day change modal
  return (
    <div>
        <button className="secondaryButton" onClick={() => setShow(true)}>{props.label}</button>
        {show ? (
            <div>
                <button className="secondaryButton" onClick={() => setShow(false)}>Close</button>
                <div>
                    Change the Delivery Day?
                    <select>
                        {deliveryDays.map( dd => (
                            <option key={dd.value} value={dd.value}>{dd.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        ) : ''}
    </div>
  );
}

export default DeliveryDayModal;