// App Entrance
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store'
import IndexLayout from './views/layout'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Switch>
              <Route path='/home' component={IndexLayout} />
              <Route path='/' component={IndexLayout} />
            </Switch>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;