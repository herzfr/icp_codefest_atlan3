import React, { useState } from 'react';
import './alert.scss';

function AlertComponent({ message, onClose }) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    onClose();
  };

  return visible ? (
    <div className="custom-alert">
      <p>{message}</p>
      <button onClick={handleClose}>Close</button>
    </div>
  ) : null;
}

export default AlertComponent;
