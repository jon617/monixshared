// payment page goes here
// incomplete
import React, { Component } from 'react';
import namecase from 'namecase';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialMonixUITheme from './MaterialMonixUITheme';
import { TextField } from 'material-ui';
import './Payment.scss';

class Payment extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      name: "",
      nameError: "",
    };
  }

  onChangeName = ({ target }) => {
    const name = target.value;
    this.setState({ name: name });
  }

  onBlurName = () => {
    let name;
    name = namecase( this.state.name );
    if ( name ) {
      this.setState({ name: name });
    }
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={ MaterialMonixUITheme }>
        <div className="Payment">
          Enter payment info:
          <br />
          <div className="NameField">
            <TextField
              ref={ this.nameField } // required. Change nameField to whatever you want to call this TextField object for reference later
              fullWidth
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="on"
              spellCheck="false"
              floatingLabelText="Full name"
              floatingLabelFixed={ true }
              hintText="Jamie Smith"
              onChange={ this.onChangeName }
              onBlur={ this.onBlurName }
              value={ this.state.name }
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
                color: "#111111",
              }}
              errorStyle={{
                fontSize: 18,
                fontWeight: 400,
                marginTop: 10,
              }}
              hintStyle={{
                marginBottom: 8,
                marginLeft: 10,
              }}
              floatingLabelStyle={{
                marginLeft: 10,
              }}
              errorText={ this.state.nameError }
            />
          </div>

        </div>
      </MuiThemeProvider>
    );
  }
}

export default Payment;
