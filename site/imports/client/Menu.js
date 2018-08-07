import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialMonixUITheme from './MaterialMonixUITheme';
import { RaisedButton } from 'material-ui';

class Menu extends Component {
  goPayment = () => {
    this.props.history.push("/payment");
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={ MaterialMonixUITheme }>
        <div className="Menu">
          <RaisedButton
            primary={ true }
            label="payment page"
            labelColor="#ffffff"
            labelStyle={{ color: "#ffffff" }}
            style={{
              height: 40,
            }}
            onClick={ this.goPayment }
          />
        </div>
      </MuiThemeProvider>
    )
  }
}
export default Menu;
