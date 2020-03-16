import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Checkout from './Checkout';
import Payment from './Payment';
import OrderConfirmation from './OrderConfirmation';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/checkout' component={Checkout} />
            <Route exact path='/payment' component={Payment} />
            <Route exact path='/orderConfirmation' component={OrderConfirmation} />
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
