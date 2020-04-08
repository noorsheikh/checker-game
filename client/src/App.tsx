import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import Home from './containers/Home';
import SignIn from './containers/SignIn';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          persistor={persistor}
          loading={null}
        >
          <Router>
            <Route path="/" exact component={Home} />
            <Route path="/sign-in" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignIn} />
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;