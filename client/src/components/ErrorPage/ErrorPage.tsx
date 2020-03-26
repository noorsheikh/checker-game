import React, {Component} from 'react';
import './ErrorPage.css';

class ErrorPage extends Component<{},{}> {
  render() {
    return (
      <div className="row small-up-2 medium-up-3 large-up-4" id="Body">
      <div className="medium-12 columns">
        <h2>404 Page Not Found</h2>
      </div>
    </div>
    );
  }
}
export default ErrorPage;