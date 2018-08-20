import React, { Component } from 'react';
import {
  TextField,
} from 'material-ui';
import ReactSVG from 'react-svg';
import './DurationInput.scss';

// incoming variables:
// fieldRef, from calling class, use: (el) => this.searchInput = el
// label (floating label of the field)
// setError (string)
// error (string)
// setValue (string)
// value (string)
// nameCase (true/false)
// autoCorrect (true/false)

class DurationInput extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      dropdown: false,
    };
    this.minutes = [
      5, 15, 25, 30, 45, 55
    ];
  }

  // change name input field
  onChangeText = ({ target }) => {
    if ( typeof target !== "object" ) {
      return ;
    }
    let text = target.value;
    text = text.replace(
      new RegExp("[^\\d]", "g"),
      ""
    );
    text = text.substring( 0, 6 );
    text = text.replace( new RegExp("^\\s+"), "" );  // get rid of leading spaces
    this.props.setError("");
    this.props.setValue( text );
  }
  textBlur = () => {
    const text = this.props.value;
    this.props.setValue( text );
    this.setState({ dropdown: false });
  }
  textFocus = () => {
    this.setState({ dropdown: true });
  }

  render() {
    return (
      <div className="DurationInput">
        <div className="DurationInputContainer">
          {/* { this.state.dropdown */
            false
            &&
            <div className="DurationInputDropdown">
              <div className="DurationInputDropdownTable">
                <div className="DurationInputDropdownBody">
                  <div className="DurationInputDropdownRow">
                    <div className="DurationInputDropdownArrows">
                      <div className="DurationInputDropdownArrow">
                        <ReactSVG
                          path="/svg/up-arrow-angle.svg"
                          style={{ width: 25, height: 25, fill: "#333333" }}
                        />
                      </div>
                      <div className="DurationInputDropdownArrow">
                        <ReactSVG
                          path="/svg/down-arrow-angle.svg"
                          style={{ width: 25, height: 25, fill: "#333333" }}
                        />
                      </div>
                    </div>
                    <div className="DurationInputDropdownTime">
                      0 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
        <TextField
          ref={ this.props.fieldRef }
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          floatingLabelText={ this.props.label }
          floatingLabelFixed={ this.props.floatingLabelFixed }
          hintText={ this.props.hintText }
          onChange={ this.onChangeText }
          value={ this.props.value }
          onFocus={ this.textFocus }
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
            marginLeft: 10,
            color: "#000000",
            top: 0,
            textAlign: "right",
            right: 20,
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
          underlineFocusStyle={{
            borderWidth: 0,
          }}
        />
      </div>
    )
  }
}

export default DurationInput;
