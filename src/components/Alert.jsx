import React from 'react';
import "../css/alert.css"

const Alert = ({ message, onClose }) => {
  return (
    <div className="alert">
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Alert;
