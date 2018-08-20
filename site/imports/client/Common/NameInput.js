import React, { Component } from 'react';
import NameCase from 'namecase';
import './NameInput.scss';
import {
  TextField,
} from 'material-ui';

// incoming variables:
// fieldRef
// nameValue
// nameError
//  FUNCTIONS:
// setNameValue
// setNameErrorValue


class NameInput extends Component {
  constructor( props ) {
    super( props );
  }

  // change name input field
  onChangeName = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let name = target.value;
    name = name.replace( new RegExp("^\\s+"), "" );
    this.props.setNameErrorValue("");
    this.props.setNameValue( name );
  }
  nameBlur = () => {
    const name = this.props.nameValue;
    this.props.setNameValue( NameCase( name ) );
  }

  render() {
    return (
      <div className="CommonNameInput">
        <TextField
          // ref={ (el) => { this.phone = el; } }
          onChange={ this.onChangeName }
          value={ this.props.nameValue }
          errorText={ this.props.nameError }
          onBlur={ this.nameBlur }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="on"
          spellCheck="false"
          floatingLabelText="Name"
          // floatingLabelFixed={ true }
          hintText="Chris Williams"
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

export default NameInput;
