import React, { Component } from 'react';
import { isValidNumber, AsYouType } from 'libphonenumber-js';
import { phoneFormat2 } from '../../lib/functions';
import './PhoneInput.scss';
import {
  TextField,
} from 'material-ui';

// incoming variables:
// fieldRef
// phoneValue
// setPhoneValue

class PhoneInput extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      hasSeenValidNumber: false,
      phoneError: "",
    }
  }

  // change phone input field
  onChangePhone = ({ target }) => {
    if ( typeof target !== "object" ) {
      return;
    }
    let phone = target.value;
    phone = phone.replace( new RegExp("^\\(?\\s+\\(?"), "" );  // delete leading spaces
    if ( phone.match( new RegExp("^\\d+\\s") ) ) {
      return;
    }
    this.props.setPhoneErrorValue("");
    if ( this.state.hasSeenValidNumber ) {
      // we already saw a valid looking number once, don't try to set the phoneFormat on the fly, and don't change focus
      this.props.setPhoneValue( phone.substring( 0, 14 ) );
      // reset the state hasSeenValidNumber value if they backspaced a valid-looking number and re-entered a new number
      if ( phone.match( new RegExp("^\\(\\d{3}\\) \\d{1,3}$") ) ) {
        this.setState({ hasSeenValidNumber: false });
      } else if ( phone == "" ) {
        this.setState({ hasSeenValidNumber: false });
      }
    } else {
      if ( isValidNumber( phone, "US" ) ) {
        this.props.setPhoneValue( phoneFormat2( phone, "US" ) );
        this.setState({
          hasSeenValidNumber: true,
        });

        // if we are on the login section, set the focus of the password
        // this.password.focus();
      } else {
        // not a valid number
        this.props.setPhoneValue( phoneFormat2( phone, "US" ) );
      }
    }
  }
  phoneBlur = () => {
    if ( isValidNumber( this.props.phoneValue, "US" ) ) {
      this.props.setPhoneValue( new AsYouType( "US" ).input( this.props.phoneValue ) );
      this.setState({
        hasSeenValidNumber: true,
      });
    }
  }

  render() {
    const { phoneValue, setPhoneValue } = this.props;

    return (
      <div className="CommonPhoneInput">
        <TextField
          // ref={ (el) => { this.phone = el; } }
          onChange={ this.onChangePhone }
          value={ this.props.phoneValue }
          disabled={ this.props['disabled'] ? true : false }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          floatingLabelText="Phone"
          // floatingLabelFixed={ true }
          hintText="(201) 555-1212"
          fullWidth
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
          // errorText={ this.state.phoneError }
          // onKeyPress={ this.goEnterKey }
        />
      </div>
    )
  }
}

export default PhoneInput;
