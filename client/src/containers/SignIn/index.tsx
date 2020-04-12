import React from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { login } from '../../actions';
import { CurrentUserState } from '../../reducers/auth';
import { Link, Redirect } from 'react-router-dom';

interface SIProps {
  currentUser?: CurrentUserState;
  login: Function;
}

interface SIState {
  currentUser?: CurrentUserState;
  username: string;
  password: string;
}

class SignIn extends React.Component<SIProps, SIState> {
  state = {
    username: '',
    password: '',
  };

  handleUserLoginChange = (event: any) => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value } as SIState, () => console.log());
  };

  handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { username, password } = this.state;
    this.props.login(username, password);
    event.preventDefault();
  };

  render() {
    const auth = this.props.currentUser;
    if (auth?.currentUser?.isLoggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Row>
          <Col>
            <div className="cg-heading">
              <h1 className="cg-heading__text">Sign in to play game</h1>
            </div>
          </Col>
        </Row>
        {auth?.error && (
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Alert variant="danger">Authentication Denied!</Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="justify-content-md-center">
            <div className="cg-section">
              <Form className="cg-section__form" onSubmit={this.handleSignInSubmit} noValidate>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="cg-section__form--icon">
                        <FontAwesomeIcon className="cg-section__form--color" icon={faUser}></FontAwesomeIcon>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      className="cg-section__form--input"
                      placeholder="username"
                      name="username"
                      size="lg"
                      onChange={this.handleUserLoginChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className="cg-section__form--icon">
                        <FontAwesomeIcon className="cg-section__form--color" icon={faLock}></FontAwesomeIcon>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="password"
                      className="cg-section__form--input"
                      placeholder="password"
                      name="password"
                      size="lg"
                      onChange={this.handleUserLoginChange}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="cg-section__form--action">
                  <div className="cg-section__form--action-link">
                    <span className="cg-section__form--action-link-text">New account: </span>
                    <Link to="/sign-up">Sign Up</Link>
                  </div>
                  <Button type="submit" className="cg-section__form--action-submit">
                    Sign In
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: SIState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, { login })(SignIn);
