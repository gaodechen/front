/**
 * @description entrance component App
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store'
import Index from './views/index'

class App extends Component {
  /**
   * @description provider: providing props for components
   *              persistor: data persistence
   *              router: router component
   * @returns component containing wrapped Index component
   * @memberof App
   */
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Index />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;