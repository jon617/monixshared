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

// screens
import Menu    from './Menu';
import Payment from './Payment';

// css
import './App.css';

class App extends Component {
  render() {
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

export default connect( mapStateToprops, null )(
  App
);
