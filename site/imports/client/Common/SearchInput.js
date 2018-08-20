import React, { Component } from 'react';
import NameCase from 'namecase';
import './SearchInput.scss';
import {
  TextField,
} from 'material-ui';

// incoming variables:
// fieldRef, from calling class, use: (el) => this.searchInput = el
// label (floating label of the field)
// hintText (if any)
// setSearchError (string)
// error (string)
// setSearchValue (string)
// value (string)
// nameCase (true/false)
// autoCorrect (true/false)

class SearchInput extends Component {
  constructor( props ) {
    super( props );
  }

  // change name input field
  onChangeText = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let search = target.value;
    search = search.replace( new RegExp("^\\s+"), "" );  // get rid of leading spaces
    this.props.setSearchError("");
    this.props.setSearchValue( search );
  }
  searchBlur = () => {
    const search = this.props.value;
    this.props.setSearchValue( search );
  }

  render() {
    const autoCorrect = this.props.autoCorrect ? "on" : "off";
    const autoCapitalize = this.props.nameCase ? "on" : "off";
    return (
      <div className="CommonNameInput">
        <TextField
          ref={ this.props.fieldRef }
          autoComplete={ autoCorrect }
          autoCorrect={ autoCorrect }
          autoCapitalize={ autoCapitalize }
          spellCheck="false"
          floatingLabelText={ this.props.label }
          // floatingLabelFixed={ true }
          hintText={ this.props.hintText }
          onChange={ this.onChangeText }
          value={ this.props.value }
          onBlur={ this.searchBlur }
          errorText={ this.props.error }
          // onKeyPress={ this.goEnterKey }
          fullWidth
          style={{
            fontSize: 16,
            height: 40,
            border: "1px solid #aaaaaa",
            borderRadius: 10,
          }}
          floatingLabelStyle={{
            marginLeft: 10,
            color: "#cccccc",
            top: 10,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: "#ffffff",
          }}
          floatingLabelFocusStyle={{
            color: "#bbbbbb",
            top: 12,
            paddingLeft: 5,
            paddingRight: 5,
            backgroundColor: "#ffffff",
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
            marginBottom: 8,
            marginLeft: 10,
            color: "#dddddd",
          }}
        />
      </div>
    )
  }
}

export default SearchInput;
