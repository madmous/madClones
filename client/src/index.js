import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import Home from './www/Home/Home';

import configureStore from './redux/configureStore'

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root')
);