import React from 'react';
import GameBoard from './GameBoard/GameBoard';

class App extends React.Component<{}, {}> {
  render() {
    return (
      <React.Fragment>
        <GameBoard/>
      </React.Fragment>
    )
  }
}

export default App;
