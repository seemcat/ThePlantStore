import * as React from 'react';

class CardEntry extends React.Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.src = "https://checkout.sandbox.dev.clover.com/sdk.js";
    script.async = true;
    script.onload = () => this.scriptLoaded();
    document.body.appendChild(script);
  }
  scriptLoaded() {
    // Set payments client.
    // @ts-ignore
    const clover = new window.Clover('fc9e4d48df0d110f12812a5190a4f424');
    const elements = clover.elements();
    const styles = {
      body: {
        fontFamily: 'Roboto, Open Sans, sans-serif',
        fontSize: '16px',
      },
      input: {
        fontSize: '16px',
      },
    };
    const cardNumber = elements.create('CARD_NUMBER', styles);
    const cardDate = elements.create('CARD_DATE', styles);
    const cardCvv = elements.create('CARD_CVV', styles);
    const cardPostalCode = elements.create('CARD_POSTAL_CODE', styles);
    cardNumber.mount('#card-number');
    cardDate.mount('#card-date');
    cardCvv.mount('#card-cvv');
    cardPostalCode.mount('#card-postal-code');
    const displayError = document.getElementById('card-errors');
    // // Handle real-time validation errors from the card Element.
    // cardNumber.addEventListener('change', function(event) {
    //     if (event.error) {
    //         displayError.textContent = event.error.message;
    //     } else {
    //         displayError.textContent = '';
    //     }
    // });
    //
    // cardDate.addEventListener('change', function(event) {
    //     if (event.error) {
    //         displayError.textContent = event.error.message;
    //     } else {
    //         displayError.textContent = '';
    //     }
    // });
    //
    // cardCvv.addEventListener('change', function(event) {
    //     if (event.error) {
    //         displayError.textContent = event.error.message;
    //     } else {
    //         displayError.textContent = '';
    //     }
    // });
    //
    // cardPostalCode.addEventListener('change', function(event) {
    //     if (event.error) {
    //         displayError.textContent = event.error.message;
    //     } else {
    //         displayError.textContent = '';
    //     }
    // });
    // TODO: Register event handlers
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      clover.createToken()
        .then(function(result: any) {
          if (result.errors) {
            Object.values(result.errors).forEach(function (value) {
              alert(value);
            });
          } else {
            // Save for when I'm able to retrieve the token.
            fetch('http://localhost:3030/payForAnOrder', {
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify(result.token)
            });
            alert(result.token);
          }
        });
    });
  }

  render() {
    return (
      <div className="container">
        <form action="/charges" method="post" id="payment-form">
          <div className="form-row top-row">
            <div id="amount" className="field card-number">
              <input name="amount" placeholder="Amount" />
            </div>
          </div>
          <div className="form-row">
            <div id="card-number" className="field card-number"></div>
          </div>
          <div className="form-row">
            <div id="card-date" className="field third-width"></div>
            <div id="card-cvv" className="field third-width"></div>
            <div id="card-postal-code" className="field third-width"></div>
          </div>
          <div id="card-errors" role="alert"></div>
          <div className="button-container">
            <button>Submit Payment</button>
          </div>
        </form>
      </div>
    );
  }
}
export default CardEntry;
