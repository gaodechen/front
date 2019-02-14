// App Entrance
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store'
import Index from './views/index'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <PersistGate loading={null} persistor={persistor}>
            <Index />
          </PersistGate>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;