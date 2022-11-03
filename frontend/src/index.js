import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import App from './App.js';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf.js';
import * as sessionActions from './store/session.js';
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAirbnb} from "@fortawesome/free-brands-svg-icons"

const store = configureStore();

// if (process.env.NODE_ENV !== "production") {
//   window.store = store;
// }
//some changes

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    {/* <FontAwesomeIcon icon={faAirbnb}></FontAwesomeIcon> */}
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
