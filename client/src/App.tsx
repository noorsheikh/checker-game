import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import GameBoard from './containers/GameBoard';
import Home from './containers/Home';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Router>
            <Route path="/home" exact component={Home} />
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path={"/game-board/:boardId?"} exact component={GameBoard} />
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
