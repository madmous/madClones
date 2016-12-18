import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../redux/configureStore'

const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
      </Provider>
    )
  }
}