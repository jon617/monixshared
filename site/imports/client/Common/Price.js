import React, { Component } from 'react';
import {
  TextField,
} from 'material-ui';
import './Price.scss';

// incoming variables:
// fieldRef
// label (floating label of the field)
// hintText (if any)

// setError
// error (string)
// setValue
// value (string)

class PriceInput extends Component {
  constructor( props ) {
    super( props );
  }

  // change name input field
  onChangePrice = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let price = target.value;
    price = price.replace(
      new RegExp("[^\\d\\.]", "g"),
      ""
    ); // only digits and dots
    price = price.substring( 0, 7 );
    // get rid of leading zeros
    price = price.replace(
      new RegExp("^0+([1-9]+[\\d]*)"),
      "$1"
    );
    // split the price into dollars and cents
    const hasDot = new RegExp("\\.").test( price );  // true/false
    const dollarsAndCents = price.split( ".", 2 );  // array
    let dollars = dollarsAndCents[0];
    let cents = dollarsAndCents[1];
    // console.log( dollarsAndCents, dollars, hasDot, cents );
    if ( typeof cents === "string" ) {
      // has value
      cents = cents.substring(0, 2);
    }

    let newPrice = dollars;
    if ( typeof cents === "string" ) {
      newPrice = newPrice + "." + cents;
    } else if ( hasDot ) {
      newPrice = newPrice + ".";
    }

    this.props.setError("");
    this.props.setValue( newPrice );
  }
  priceBlur = () => {
    const price = "" + this.props.value;
    const dollarsAndCents = price.split( ".", 2 );  // array
    let dollars = dollarsAndCents[0];
    let cents = dollarsAndCents[1];
    // if dollars is empty, set it to zero
    if ( (dollars === "") && (typeof cents === "string") ) {
      dollars = "0";
    }
    if ( typeof cents === "string" ) {
      if ( cents.length == 1 ) {
        cents = cents + "0";  // cents contains one digit, like 33.2, add 0 at the end, like 33.20
      }
      if ( cents.length == 0 ) {
        this.props.setValue( dollars );
      } else {
        this.props.setValue( dollars + "." + cents );
      }
    } else {
      this.props.setValue( dollars );
    }
  }

  render() {
    return (
      <div className="CommonNameInput">
        <div className="PriceContainer">
          <div className="PriceDollarSign">
            $
          </div>
        </div>
        <TextField
          ref={ this.props.fieldRef }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          floatingLabelText={ this.props.label }
          floatingLabelFixed={ true }
          hintText=""
          onChange={ this.onChangePrice }
          value={ this.props.value }
          onBlur={ this.priceBlur }
          errorText={ this.props.error }
          fullWidth
          style={{
            fontSize: 20,
            height: 40,
            border: "1px solid #aaaaaa",
            borderRadius: 10,
          }}
          floatingLabelFocusStyle={{
            color: "#bbbbbb",
          }}
          inputStyle={{
            marginLeft: 10,
            color: "#000000",
            paddingLeft: 25,
          }}
          errorStyle={{
            fontSize: 18,
            fontWeight: 400,
            marginTop: 10,
          }}
          hintStyle={{
            marginBottom: 8,
            marginLeft: 10,
            color: "#dddddd",
          }}
          floatingLabelStyle={{
            marginLeft: 10,
            color: "#cccccc",
          }}
          // onKeyPress={ this.goEnterKey }
        />
      </div>
    )
  }
}

export default PriceInput;
