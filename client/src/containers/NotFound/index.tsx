import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NotFound extends React.Component<{}, {}> {

  render() {

    return (
      <Container>
        <Row>
          <Col>
            <div className="cg-heading">
              <h1 className="cg-heading__text">404 Page Not Found</h1>
              <Link to="/">Go to Home Page</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;