import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';

class Payment extends Component {
  constructor() { 
    super();
    this.state = {
      amount: null,
      'card-number': null,
      'card-date': null,
      'card-cvv': null,
      'card-postal-code': null,
      apiAccessKey: null,
    }
  }

  componentDidMount() {
    // Get the Merchant Key.
    fetch('http://localhost:3030/merchantKey')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ apiAccessKey: data.apiAccessKey });
      });
  }

  onChange(e, val) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit() {
    const clover = window.Clover(this.state.apiAccessKey);

    // Generate payment token
    clover.createToken()
      .then((result) => {
        if (result.errors) {
          Object.values(result.errors).forEach((value) => {
            console.log('Error generating token: ', value);
          });
        } else {
          console.log('Token: ', result.token);
        }
      });

    // Save for when I'm able to retrieve the token.
    /*fetch('http://localhost:3030/payForAnOrder', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state)
    });*/
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <p>
            The Plant Store
          </p>
        </header>
        <div className="App-list">

          <form id='clover-payment'>
            <div className="md-form">
              <input type="text" id="amount" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="amount">Amount</label>
            </div>

            <div className="md-form">
              <input type="text" id="card-number" className="form-control" onChange={(e) => this.onChange(e)}/>
              <label for="card-number">Card Number</label>
            </div>

            <div>
              <div className="md-form">
                <input type="text" id="card-date" className="form-control" onChange={(e) => this.onChange(e)}/>
                <label for="card-date">Exp Date</label>
              </div>
              <div className="md-form">
                <input type="text" id="card-cvv" className="form-control" onChange={(e) => this.onChange(e)}/>
                <label for="card-cvv">CVV</label>
              </div>
              <div className="md-form">
                <input type="text" id="card-postal-code" className="form-control" onChange={(e) => this.onChange(e)}/>
                <label for="card-postal-code">Zip Code</label>
              </div>
            </div>
            <div id="card-errors" role="alert"></div>
            <div>
              <Link to='/orderConfirmation'>
                <button type="button" class="btn btn-dark" onClick={ () => this.onSubmit() }>PLACE ORDER</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Payment;
