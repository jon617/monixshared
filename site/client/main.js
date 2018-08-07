import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../imports/client/reducers/store';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import App from '../imports/client/App';

// import '../imports/client/_semanticcss/semantic.css';

Meteor.startup( () => {
  render(
    <Provider store={ store }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    ,
    document.getElementById("render-target")
  )
});
