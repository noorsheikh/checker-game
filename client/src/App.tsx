import React from 'react';
import './index.scss';
import Header from './components/Header/Header';
import Routes from './routes';
import Footer from './components/Footer/Footer';

class App extends React.Component<{},{appName:string;}> {
  render() {
    return (

      <div className="off-canvas-wrapper">
      <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
        <div className="off-canvas-content" data-off-canvas-content>

          <Header name="ISA 681 Checkers-Game"/>
          {Routes}
          <hr/>
          <Footer/>
        </div>
      </div>
    </div> 

    );
  }
}

export default App;
