import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import reducer from './Reducers/mainReducer'
import { Provider } from 'react-redux';
import {Auth0Provider} from '@auth0/auth0-react'

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider 
            domain="esllam.us.auth0.com"
            clientId="hxBPdGgIKNctGI8PzkZluI9zU4YzUFXJ"
            redirectUri={window.location.origin}
           >
    <Provider store={store}>
    <App />
    </Provider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
