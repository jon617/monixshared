import React, { Component } from 'react';
import {
  TextField,
} from 'material-ui';
import creditCardType from 'credit-card-type';
import moment from 'moment';
import './CreditCard.scss';

// incoming variables:
//  VALUES:
// CCval
// expVal
// cvvVal
//  FUNCTIONS:
// setCC
// setCCerror
// setExp
// setExpError
// setCVV
// setCVVerror

class CreditCard extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      CVVname: "Code",
      CVVmaxlength: 4,
    };
  }

  onChangeCC = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let cc = target.value;
    const re = new RegExp("[^\\d]", "g");
    cc = cc.replace( re, "" );
    cc = cc.substring( 0, 19 );
    const ccType = creditCardType( cc ) || [];
    // console.log( ccType );
    if ( ! ccType[0] ) { return };
    const gaps = ccType[ 0 ].gaps;
    const type = ccType[ 0 ].type;
    const maxLength = ccType[ 0 ].lengths ? ccType[ 0 ].lengths[ 0 ] : 16;
    const cvv = ccType[ 0 ].code;
    if ( cvv['name'] && cvv['size'] ) {
      this.setState({ CVVname: cvv.name, CVVmaxLength: cvv.size });
      // if they already typed a cvv, shorten it to the maxLength
      this.props.setCVV( this.props.cvvVal.substring( 0, cvv.size ) );
    } else {
      this.setState({ CVVname: "Code", CVVmaxLength: 4 });
    }
    // are there gaps (spaces) to insert?
    if ( gaps ) {
      if ( (typeof gaps[ 2 ] === "number") && (cc.length > 12) ) {
        cc = (
          cc.substring( 0, gaps[0] ) + " " +
          cc.substring( gaps[0], gaps[1] ) + " " +
          cc.substring( gaps[1], gaps[2] ) + " " +
          cc.substring( gaps[2], maxLength )
        );
      } else if ( (typeof gaps[ 1 ] === "number") && (cc.length > 8) ) {
        if ( type != "american-express" ) {
          cc = (
            cc.substring( 0, gaps[0] ) + " " +
            cc.substring( gaps[0], gaps[1] ) + " " +
            cc.substring( gaps[1] )
          );
        } else {
          if ( cc.length > 10 ) {
            cc = (
              cc.substring( 0, gaps[0] ) + " " +
              cc.substring( gaps[0], gaps[1] ) + " " +
              cc.substring( gaps[1], maxLength )
            );
          } else {
            if ( cc.length > 8 ) {
              cc = (
                cc.substring( 0, gaps[0] ) + " " +
                cc.substring( gaps[0] )
              );
            }
          }
        }
      } else if ( (typeof gaps[ 0 ] === "number") && (cc.length > 4) ) {
        cc = (
          cc.substring( 0, gaps[0] ) + " " +
          cc.substring( gaps[0] )
        );
      }
    }

    this.props.setCC( cc );
  }
  ccBlur = () => {

  }

  onChangeExp = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let exp = target.value;
    let re = new RegExp("[^\\d/]", "g");
    exp = exp.replace( re, "" );
    re = new RegExp("[^\\d]", "g");
    // digitsOnly = exp.replace( re, "" );

    exp = exp.substring( 0, 5 );

    // if just 3 or 4 digits, format it
    if ( exp.match( new RegExp("^\\d{3,4}$") ) ) {
      exp = exp.substring( 0, 2 ) + "/" + exp.substring( 2, 4 );
    }

    // got shorter? backspace hit
    if ( this.props.expVal.length > exp.length ) {
      this.props.setExp( exp );
      return ;
    }
    // user started by entering 2-9
    re = new RegExp("^([2-9])$");
    exp = exp.replace( re, "0$1/" );
    // user started by entering 0 then 2-9
    re = new RegExp("^(0[1-9])$");
    exp = exp.replace( re, "$1/" );
    // user entered 10, 11, or 12
    re = new RegExp("^(10|11|12)$");
    exp = exp.replace( re, "$1/");

    this.props.setExpError("");
    this.props.setExp( exp );

  }

  expBlur = () => {
    const exp = this.props.expVal;
    // check if the expiration MM/YY is after today
    const expMoment = moment(
      exp,
      ["MM/YY", "M/YY"],
      true
    );
    if ( expMoment.isValid() ) {
      const expHasExpired = expMoment.isBefore(
        moment( moment().format("MM/YY"), "MM/YY" )
      );
      if ( expHasExpired ) {
        this.props.setExpError(" ");  // yes, that is a space
      }
    }
  }

  onChangeCVV = ({ target }) => {
    let cvv = target.value;
    const re = new RegExp("[^\\d]", "g");  // anything that is NOT a digit, match as many as found
    cvv = cvv.replace( re, "" );

    cvv = cvv.substring( 0, 4 );  // always no more than 4 digits
    cvv = cvv.substring( 0, this.state.CVVmaxLength );
    this.props.setCVV( cvv );
  }
  cvvBlur = () => {

  }

  render() {
    return (
      <div className="CreditCard">
        <div className="CreditCardTable">
          <div className="CreditCardTableBody">
            <div className="CreditCardTableRow">
              <div className="CreditCardNumber">

                <TextField
                  // ref={ (el) => { this.phone = el; } }
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  floatingLabelText="Credit card number"
                  floatingLabelFixed={ false }
                  hintText=""
                  onChange={ this.onChangeCC }
                  value={ this.props.CCval }
                  onBlur={ this.ccBlur }
                  fullWidth
                  style={{
                    fontSize: 30,
                    height: 90,
                    border: "0px solid #aaaaaa",
                  }}
                  floatingLabelFocusStyle={{
                    color: "#aaaaaa",
                  }}
                  inputStyle={{
                    marginLeft: 10,
                    color: "#000000",
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
                    top: 31,
                    color: "#cccccc",
                    fontSize: 24,
                  }}
                  // errorText={ this.state.phoneError }
                  // onKeyPress={ this.goEnterKey }
                />


              </div>

              <div className="CreditCardExp">
                <TextField
                  // ref={ (el) => { this.phone = el; } }
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  floatingLabelText="Month/Year"
                  floatingLabelFixed={ false }
                  hintText=""
                  onChange={ this.onChangeExp }
                  value={ this.props.expVal }
                  onBlur={ this.expBlur }
                  errorText={ this.props.expError }
                  fullWidth
                  style={{
                    fontSize: 30,
                    height: 90,
                    border: "0px solid #aaaaaa",
                  }}
                  floatingLabelFocusStyle={{
                    color: "#aaaaaa",
                  }}
                  inputStyle={{
                    marginLeft: 10,
                    color: "#000000",
                  }}
                  errorStyle={{
                    position: "absolute",
                    fontSize: 18,
                    fontWeight: 400,
                    marginTop: 10,
                    opacity: 0,
                  }}
                  hintStyle={{
                    marginBottom: 8,
                    marginLeft: 10,
                    color: "#dddddd",
                  }}
                  floatingLabelStyle={{
                    marginLeft: 10,
                    top: 31,
                    color: "#cccccc",
                    fontSize: 24,
                  }}
                  // onKeyPress={ this.goEnterKey }
                />
              </div>

              <div className="CreditCardCVV">
                <TextField
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  floatingLabelText={ this.state.CVVname }
                  floatingLabelFixed={ false }
                  hintText=""
                  onChange={ this.onChangeCVV }
                  value={ this.props.cvvVal }
                  onBlur={ this.cvvBlur }
                  fullWidth
                  style={{
                    fontSize: 30,
                    height: 90,
                    border: "0px solid #aaaaaa",
                  }}
                  floatingLabelFocusStyle={{
                    color: "#aaaaaa",
                  }}
                  inputStyle={{
                    marginLeft: 10,
                    color: "#000000",
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
                    top: 31,
                    color: "#cccccc",
                    fontSize: 24,
                  }}
                  // errorText={ this.state.phoneError }
                  // onKeyPress={ this.goEnterKey }
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreditCard;
