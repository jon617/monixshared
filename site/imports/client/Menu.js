import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MaterialMonixUITheme from './MaterialMonixUITheme';
import { RaisedButton } from 'material-ui';
import './Menu.scss';

class Menu extends Component {
  goTo = ( url ) => {
    this.props.history.push( "/" + url );  // for example: /commonlist
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={ MaterialMonixUITheme }>
        <div className="Menu">

          <div className="Title">
            Main menu
          </div>

          <div className="MenuButtons">

            <div className="MenuButton">
              <RaisedButton
                primary={ true }
                label="example page"
                labelStyle={{ color: "#ffffff" }}
                style={{
                  height: 40
                }}
                onClick={ () => this.goTo("payment") }
              />
            </div>
            <div className="MenuButton">
              <RaisedButton
                primary={ true }
                label="list all inputs"
                labelStyle={{ color: "#ffffff" }}
                style={{
                  height: 40
                }}
                onClick={ () => this.goTo("commonlist") }
              />
            </div>

          </div>

        </div>
      </MuiThemeProvider>
    )
  }
}
export default Menu;
