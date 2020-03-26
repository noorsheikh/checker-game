import React, { Component } from 'react';

import './Footer.css';

class Footer extends Component<{},{}> {
  render() {
    return (
      <div className="row" id="footer">
        <div className="medium-12 columns">
          <p>Copyright © 2020 Version 0.1</p>
        </div>
      </div>
    );
  }
}

export default Footer;