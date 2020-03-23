const express = require('express')
const app = express()
const port = 3030
const cors = require('cors')
const bodyParser  = require('body-parser');
const request = require('request');
require('dotenv').config();
const authToken = process.env.AUTH_TOKEN;
app.use(express.json());
app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => res.send(`The Plant Store's SERVER!`))
let listOfItems;
let orderId;

// When user clicks CHECKOUT -> Save items to order.
app.post('/checkout', (req, res) => {
  listOfItems = req.body;
})

// When user clicks PROCEED TO PAYMENT -> Create an order.
app.post('/createAnOrder', (req, res) => {
  const options = {
    method: 'POST',
    url: 'https://scl-sandbox.dev.clover.com/v1/orders',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${authToken}`,
    },
    body: {
      'currency': 'USD',
      'email': req.body.email,
      'items': listOfItems,
      'shipping': {
        'address': {
          'city': req.body.city,
          'country': req.body.country,
          'line1': req.body.line1,
          'line2': req.body.line2,
          'postal_code': req.body.postal_code,
          'state': req.body.state,
        },
        'name': req.body.name,
      },
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    orderId = body.id;
  });
})

// When user goes to the Payment page, grab the Merchant Key.
app.get('/merchantKey', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://apisandbox.dev.clover.com/pakms/apikey',
    headers: {
      accept: 'application/json',
      authorization: `Bearer ${authToken}`
    }
  };

  // Let the Payment page grab the Merchant Key.
  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    res.send(body);
  });
});

// When user clicks PLACE ORDER -> Use the token to pay for the order.
app.post('/payForAnOrder', (req, res) => {
  const options = {
    method: 'POST',
    url: `https://scl-sandbox.dev.clover.com/v1/orders/${orderId}/pay`,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${authToken}`,
    },
    body: {
      'source': req.body.token,
    },
    json: true,
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
