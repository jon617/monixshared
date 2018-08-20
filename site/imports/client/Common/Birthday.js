import React, { Component } from 'react';
import moment from 'moment';
import { TextField } from 'material-ui';

// uses:
// fieldRef
// nextRef
// value
// valueError
// setValue
// setError

class Birthday extends Component {
  setBirthday = ( birthday ) => {
    this.props.setValue( birthday );
  }
  onChangeBirthday = ({ target }) => {
    this.props.setError("");  // no more error

    let value = target.value;

    if ( value.length > this.props.value.length ) {
      // user is typing, not backspacing
      let re = new RegExp("^([23456789])/*");
      value = value.replace( re, "$1/");  // if first digit is 2-9, immediately add a slash after the digit
      re = new RegExp("^([01]\\d)/*");
      value = value.replace( re, "$1/");  // if first digit is 0 or 1, followed by another digit, add a slash after
      re = new RegExp("^(\\d{1,2}/)([456789])/*");
      value = value.replace( re, "$1$2/"); // if after the first slash they typed a digit 4-9, add another slash at the end
      re = new RegExp("^(\\d{1,2}/)(\\d{2})/*");
      value = value.replace( re, "$1$2/"); // if after the first slash type typed 2 digits, add another slash at the end
    }

    this.setBirthday( value );
  }
  onBlurBirthday = () => {
    let birthday = this.props.value;
    birthday = birthday.replace(
      new RegExp("^\\s+"),
      ""
    );
    birthday = birthday.replace(
      new RegExp("\\s+$"),
      ""
    );
    birthday = birthday.replace(
      new RegExp("/([3456]\\d)$"),
      "/19$1"
    );  // if birthday year appears to be between 1930 and 1969, assume the 19xx
    if ( birthday == "" ) {
      return ;
    }
    if ( birthday.match( new RegExp("/\\d{4}$") ) ) {
      birthday = moment(
        birthday,
        [
          "MM/DD/YYYY", "M/DD/YYYY", "MM/D/YYYY",
          "MMM/DD/YYYY", "MMMM/DD/YYYY",
          "MMM D, YYYY", "MMMM D, YYYY"
        ],
        false
      ).format("MM/DD/YYYY")
    } else {
      birthday = moment(
        birthday,
        [
          "MMMM D, YY", "MMMM D, YYYY", "MMMM DD, YY", "MMMM DD, YYYY",
          "MMM D, YY", "MMM D, YYYY",
          "MMM/DD/YY", "MMM/DD/YYYY", "MMMM/DD/YY", "MMMM/DD/YYYY",
          "MM/DD/YY", "M/DD/YY", "MM/D/YY", "M/D/YY",
        ],
        false
      ).format("MM/DD/YYYY");
    }
    // sanity check, is the date within the last 2 years?
    const birthdayFieldCheck = moment(
      birthday,
      "MM/DD/YYYY"
    );
    if ( birthdayFieldCheck.isValid() ) {
      if ( birthdayFieldCheck.year() >= (moment().year() - 2) ) {
        birthday = "Invalid date";
      }
    }
    // value Invalid date appears if moment() could not parse the date entered.
    if ( birthday == "Invalid date" ) {
      this.props.setError("Please use month/day/year");
      return ;
    }
    this.setBirthday( birthday );
  }

  goEnterKey = () => {

  }

  render() {
    return (
      <TextField
        ref={ this.props.fieldRef }
        onChange={ this.onChangeBirthday }
        onBlur={ this.onBlurBirthday }
        value={ this.props.value }
        errorText={ this.props.valueError }
        onKeyPress={ this.goEnterKey }
        fullWidth
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="on"
        spellCheck="true"
        floatingLabelText="Birthday"
        floatingLabelFixed={ true }
        hintText="Month/Day/Year"
        style={{
          fontSize: 30,
          height: 90,
          border: "1px solid #aaaaaa",
        }}
        floatingLabelFocusStyle={{
          color: "#bbbbbb",
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
          color: "#cccccc",
        }}
      />
    )
  }
}
export default Birthday;
