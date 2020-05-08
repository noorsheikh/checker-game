import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import GameBoard from './containers/GameBoard';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import SignIn from './containers/SignIn';
import SignUp from './containers/SignUp';
import JoinGame from './containers/JoinGame';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Router>
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/" exact component={SignIn} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path={"/game-board/:boardId?"} exact component={GameBoard} />
            <Route path="/join-game" exact component={JoinGame} />
            <Route component={NotFound} />
          </Switch>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
