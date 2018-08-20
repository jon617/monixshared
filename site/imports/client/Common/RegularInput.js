import React, { Component } from 'react';
import NameCase from 'namecase';
import './RegularInput.scss';
import {
  TextField,
} from 'material-ui';

// incoming variables:
// fieldRef, from calling class, use: (el) => this.whateverNameFieldInput = el
// label (floating label of the field)
// hintText (if any)
// setError (string)
// error (string)
// setValue (string)
// value (string)
// nameCase (true/false)
// autoCorrect (true/false)

class RegularInput extends Component {
  constructor( props ) {
    super( props );
  }

  // change name input field
  onChangeText = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let text = target.value;
    text = text.replace( new RegExp("^\\s+"), "" );  // get rid of leading spaces
    this.props.setError("");
    this.props.setValue( text );
  }
  textBlur = () => {
    const text = this.props.value;
    this.props.setValue( text );
  }

  render() {
    const autoCorrect = this.props.autoCorrect ? "on" : "off";
    const autoCapitalize = this.props.nameCase ? "on" : "off";
    return (
      <div className="RegularInput">
        <TextField
          ref={ this.props.fieldRef }
          autoComplete={ autoCorrect }
          autoCorrect={ autoCorrect }
          autoCapitalize={ autoCapitalize }
          spellCheck="false"
          floatingLabelText={ this.props.label }
          floatingLabelFixed={ this.props.floatingLabelFixed }
          hintText={ this.props.hintText }
          onChange={ this.onChangeText }
          value={ this.props.value }
          onBlur={ this.textBlur }
          errorText={ this.props.error }
          // onKeyPress={ this.goEnterKey }
          fullWidth
          style={{
            fontSize: 16,
            height: 40,
            border: "1px solid #aaaaaa",
            borderRadius: 10,
          }}
          floatingLabelFocusStyle={{
            color: "#111111",
            fontWeight: 500,
            backgroundColor: "#ffffff",
            paddingLeft: 5,
            paddingRight: 5,
            top: 12,
          }}
          floatingLabelStyle={{
            marginLeft: 10,
            color: "#aaaaaa",
            top: 10,
            backgroundColor: "#ffffff",
            paddingLeft: 5,
            paddingRight: 5,
          }}
          inputStyle={{
            left: 0,
            right: 20,
            top: -13,
            paddingLeft: 10,
            paddingRight: 10,
            color: "#000000",
          }}
          errorStyle={{
            fontSize: 14,
            fontWeight: 400,
            marginTop: 10,
          }}
          hintStyle={{
            top: 9,
            left: 5,
            marginLeft: 10,
            color: "#dddddd",
          }}
          underlineFocusStyle={{
            borderWidth: 0,
          }}
        />
      </div>
    )
  }
}

export default RegularInput;
