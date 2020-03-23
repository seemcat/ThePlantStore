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
      snake: {
        isSelected: false,
        amount: 2000,
        description: 'Snake Plant',
        quantity: 1,
      },
      zz: {
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

    let txtToDisplay;

    return (
      <div className="App">
        <header className="App-header">
          <p>
            The Plant Store
          </p>
        </header>
        <div className="App-list">
          <div className="card App-card">
            <img className="card-img-top" src="https://s7d1.scene7.com/is/image/terrain/56923295_000_a?$zoom2$" alt="Card image cap"/>
            <div className="card-body">
              <h4 className="card-title"><a>Monstera</a></h4>
              <p className="card-text">$50</p>
              <a href="#" onClick={ () => this.togglePlant('monstera') }>
                { txtToDisplay = this.state.monstera.isSelected ? 'REMOVE FROM CART' : 'ADD TO CART' }
              </a>
            </div>
          </div>

          <div className="card App-card">
            <img className="card-img-top" src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_snake-plant-laurentii_variant_small_grant_blush_1200x.jpg?v=1583160736" alt="Card image cap"/>
            <div className="card-body">
              <h4 className="card-title"><a>Snake</a></h4>
              <p className="card-text">$20</p>
              <a href="#" onClick={ () => this.togglePlant('snake') }>
                { txtToDisplay = this.state.snake.isSelected ? 'REMOVE FROM CART' : 'ADD TO CART' }
              </a>
            </div>
          </div>

          <div className="card App-card">
            <img className="card-img-top" src="https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_zz-plant_variant_medium_grow-pot_none_1080x.jpg?v=1581710909" alt="Card image cap"/>
            <div className="card-body">
              <h4 className="card-title"><a>ZZ</a></h4>
              <p className="card-text">$18</p>
              <a href="#" onClick={ () => this.togglePlant('zz') }>
                { txtToDisplay = this.state.zz.isSelected ? 'REMOVE FROM CART' : 'ADD TO CART' }
              </a>
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
