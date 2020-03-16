import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom'

class App extends Component {
  constructor() { 
    super();
    this.state = {
      monstera: {
        isSelected: false,
        amount: 5000,
        description: 'Monstera',
        quantity: 1,
      },
      snakePlant: {
        isSelected: false,
        amount: 2000,
        description: 'Snake Plant',
        quantity: 1,
      },
      zzPlant: {
        isSelected: false,
        amount: 1800,
        description: 'ZZ Plant',
        quantity: 1,
      },
    }
  }

  togglePlant(name) {
    let plantInfo = {...this.state[name]}
    plantInfo.isSelected = !plantInfo.isSelected;
    this.setState({ [name]: plantInfo })
  }

  // CHECKOUT -> Choose items to order.
  createAnOrder() {
    const listOfItems = [];

    for (let [name, info] of Object.entries(this.state)) {
      if (info.isSelected) {
        listOfItems.push({
          amount: info.amount,
          description: info.description,
          quantity: info.quantity,
        });
      }
    }

    fetch('http://localhost:3030/checkout', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(listOfItems)
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
        <div className="App-list">
          <div className="card App-card">
            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h4 className="card-title"><a>Monstera</a></h4>
              <p className="card-text">$50</p>
              <a href="#" className="btn btn-primary" onClick={ () => this.togglePlant('monstera') }>+</a>
            </div>
          </div>

          <div className="card App-card">
            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h4 className="card-title"><a>Snake Plant</a></h4>
              <p className="card-text">$20</p>
              <a href="#" className="btn btn-primary" onClick={ () => this.togglePlant('snakePlant') }>+</a>
            </div>
          </div>

          <div className="card App-card">
            <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" alt="Card image cap"/>
            <div className="card-body">
              <h4 className="card-title"><a>ZZ Plant</a></h4>
              <p className="card-text">$18</p>
              <a href="#" className="btn btn-primary" onClick={ () => this.togglePlant('zzPlant') }>+</a>
            </div>
          </div>
        </div>
        <Link to='/checkout'>
          <button type="button" className="btn btn-dark" onClick={ () => this.createAnOrder() }>CHECKOUT</button>
        </Link>
      </div>
      );
  }
}

export default App;
