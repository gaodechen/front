import React, { Component } from 'react';

import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Store from './store'
import IndexLayout from './views/layout'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={Store}>
          <div>
            <Switch>
              <Route path='/home' component={IndexLayout} />
              <Route path='/' component={IndexLayout} />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;