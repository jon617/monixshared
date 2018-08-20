import React, { Component } from 'react';
import {
  Router,
  Route,
  // matchPath,
} from 'react-router-dom';
import history from './browserHistory';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import AnimatedSwitch from "./AnimatedSwitch";
import { connect } from 'react-redux';
import * as actions from './actions';

// screens
import CommonList from './CommonList';
import Menu       from './Menu';
import Payment    from './Payment';

// css
import './App.css';

class App extends Component {
  componentDidMount() {
    window.addEventListener( "resize", this.setScreenDimensions );
  }
  setScreenDimensions = () => {
    var w = window;
    var d = document;
    var documentElement = d.documentElement;
    var body = d.getElementsByTagName("body")[0];
    var width =  w.innerWidth || documentElement.clientWidth || body.clientWidth;
    var height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    // console.log("setting dimensions");
    this.props.setScreen({
      width: width,
      height: height,
    });
  }

  render() {
    console.log( this.props );
    return (
      <div className="App">
        <Router history={ history }>
          <div>
            <Route
              render={ (routeProps) => {
                const { location } = routeProps;
                let key = location.key;
                return (
                  <TransitionGroup component="main">
                    <AnimatedSwitch
                      key={ key }
                      location={ location }
                      height={ this.props.screen.height }
                    >
                      <Route
                        exact
                        path="/"
                        component={ Menu }
                      />
                      <Route
                        path="/payment"
                        component={ Payment }
                      />
                      <Route
                        path="/commonlist"
                        component={ CommonList }
                      />
                    </AnimatedSwitch>
                  </TransitionGroup>
                )
              }}
            />
          </div>
        </Router>
      </div>
    );
  }
}
const mapStateToprops = (state) => {
  return {
    screen: state.screen,
  };
};

export default connect( mapStateToprops, actions )(
  App
);
