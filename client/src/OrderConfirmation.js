import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function OrderConfirmation() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          The Plant Store
        </p>
      </header>
      <div className="App-list">
        Thank you for your order!
      </div>
    </div>
  );
}

export default OrderConfirmation;
