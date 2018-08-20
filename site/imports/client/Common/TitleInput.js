import React, { Component } from 'react';
import NameCase from 'namecase';
import './NameInput.scss';
import {
  TextField,
} from 'material-ui';

// incoming variables:
// fieldRef
// label (floating label of the field)
// hintText (if any)
// setTitleError (string)
// titleError (string)
// setTitleValue (string)
// titleValue (string)
// nameCase (true/false)
// autoCorrect (true/false)

class TitleInput extends Component {
  constructor( props ) {
    super( props );
  }

  // change name input field
  onChangeText = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let title = target.value;
    title = title.replace( new RegExp("^\\s+"), "" );  // get rid of leading spaces
    this.props.setTitleError("");
    this.props.setTitleValue( title );
  }
  titleBlur = () => {
    const title = this.props.titleValue;
    if ( this.props.nameCase == true ) {
      this.props.setTitleValue( NameCase( title ) );
    } else {
      this.props.setTitleValue( title );
    }
  }

  render() {
    const autoCorrect = this.props.autoCorrect ? "on" : "off";
    const autoCapitalize = this.props.nameCase ? "on" : "off";
    return (
      <div className="CommonNameInput">
        <TextField
          // ref={ (el) => { this.phone = el; } }
          autoComplete={ autoCorrect }
          autoCorrect={ autoCorrect }
          autoCapitalize={ autoCapitalize }
          spellCheck="false"
          floatingLabelText={ this.props.label }
          // floatingLabelFixed={ true }
          hintText={ this.props.hintText }
          onChange={ this.onChangeText }
          value={ this.props.titleValue }
          onBlur={ this.titleBlur }
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
          errorText={ this.props.titleError }
          // onKeyPress={ this.goEnterKey }
        />
      </div>
    )
  }
}

export default TitleInput;
