import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class Checkout extends Component {
  constructor() { 
    super();
    this.state = {
      name: 'Reggie Soper',
      email: 'reggie2surf',
      city: 'Sunnyvale',
      country: 'US',
      line1: '245 Arriba Drive', // Street Address
      line2: 'Apt 9', // Apt/Suite/Other
      postal_code: '94085', // Zip Code
      state: 'CA',
    }
  }

  onChange(e, val) {
    this.setState({ [e.target.id]: e.target.value });
  }

  // PROCEED TO PAYMENT -> Create an order.
  createAnOrder() {
    fetch('http://localhost:3030/createAnOrder', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            The Plant Store
          </p>
        </header>
        <div className="Checkout">
          <div className="Shipping-list">

            <div className="md-form">
              <input type="text" id="name" value="Reggie Soper" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="name">Name</label>
            </div>
            <div className="md-form">
              <input type="text" id="email" value="reggie2surf@gmail.com" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="email">Email</label>
            </div>

            <div className="md-form">
              <input type="text" id="country" value="US" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="country">Country</label>
            </div>
            <div className="md-form">
              <input type="text" id="line1" value="245 Arriba Drive" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="line1">Street Address</label>
            </div>
            <div className="md-form">
              <input type="text" id="line2" value="9" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="line2">Apt/Suite/Other</label>
            </div>
            <div className="md-form">
              <input type="text" id="postal_code" value="94085" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="postal_code">Zip Code</label>
            </div>
            <div className="md-form">
              <input type="text" id="city" value="Sunnyvale" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="city">City</label>
            </div>
            <div className="md-form">
              <input type="text" id="state" value="California" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="state">State</label>
            </div>
          </div>
        </div>

        <Link to='/payment'>
          <button type="button" className="btn btn-dark" onClick={ () => this.createAnOrder() }>PROCEED TO PAYMENT</button>
        </Link>
      </div>
    );
  }
}

export default Checkout;
