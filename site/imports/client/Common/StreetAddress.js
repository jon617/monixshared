import React, { Component } from 'react';
import NameCase from 'namecase';
import './NameInput.scss';
import {
  TextField,
} from 'material-ui';

// incoming variables:
// fieldRef
// phoneValue
// setPhoneValue

class StreetAddress extends Component {
  constructor( props ) {
    super( props );
  }

  // change name input field
  onChangeStreet = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let street = target.value;
    street = street.substring( 0, 100 );
    this.props.setStreetError("");
    this.props.setStreet( street );
  }
  onBlurStreet = () => {
    const street = this.props.streetVal;
    this.props.setStreet( NameCase( street ) );
  }

  render() {
    return (
      <div className="CommonNameInput">
        <TextField
          // ref={ (el) => { this.phone = el; } }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="on"
          spellCheck="false"
          floatingLabelText="Address"
          floatingLabelFixed={ false }
          hintText="Chris Williams"
          onChange={ this.onChangeStreet }
          value={ this.props.streetVal }
          onBlur={ this.onBlurStreet }
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
          errorText={ this.props.streetErrorVal }
          // onKeyPress={ this.goEnterKey }
        />
      </div>
    )
  }
}

export default StreetAddress;
