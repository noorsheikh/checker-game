import React from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, Alert } from 'react-bootstrap';
import { User } from '../../models/User';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import { CurrentUserState } from '../../reducers/auth';
import { RegisterUserState } from '../../reducers/user';
import { Link, Redirect } from 'react-router-dom';

interface SIProps {
  currentUser?: CurrentUserState;
  user?: User;
  register?: RegisterUserState;
  registerUser: Function;
}

interface SIState {
  user?: User;
  currentUser?: CurrentUserState;
  register?: RegisterUserState;
}

class SignUp extends React.Component<SIProps, SIState> {
  state = {
    user: {} as User,
  };

  handleRegisterUserChange = (event: any) => {
    const { name, value } = event.currentTarget;
    const user = { ...this.state.user };
    switch (name) {
      case 'username':
        user['username'] = value;
        break;
      case 'email':
        user['email'] = value;
        break;
      case 'password':
        user['password'] = value;
        break;
      case 'firstname':
        user['firstname'] = value;
        break;
      case 'lastname':
        user['lastname'] = value;
        break;
      default:
        return;
    }
    this.setState({ user } as SIState, () => this.state);
  };

  handleRegisterUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.props.registerUser(this.state.user);
    event.preventDefault();
  };

  render() {
    const register = this.props?.register;
    if (register?.user?.username) {
      return <Redirect to="/" />;
    }
    return (
      <Container>
        <Row>
          <Col>
            <div className="cg-heading">
              <h1 className="cg-heading__text">Sign up to play game</h1>
            </div>
          </Col>
        </Row>
        {register?.error && (
          <Row>
            <Col lg={{ span: 6, offset: 3 }}>
              <Alert variant="danger">
                <Alert.Heading>Registration Failed</Alert.Heading>
                <ul>
                  {register?.error?.map((error) => (
                    <li>{error}</li>
                  ))}
                </ul>
              </Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col lg={{ span: 6, offset: 3 }} className="justify-content-md-center">
            <div className="cg-section">
              <Form className="cg-section__form" onSubmit={this.handleRegisterUserSubmit} noValidate>
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="cg-section__form--input"
                      placeholder="First Name"
                      name="firstname"
                      onChange={this.handleRegisterUserChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="cg-section__form--input"
                      placeholder="Last Name"
                      name="lastname"
                      onChange={this.handleRegisterUserChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      className="cg-section__form--input"
                      placeholder="Username"
                      name="username"
                      onChange={this.handleRegisterUserChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="email"
                      className="cg-section__form--input"
                      placeholder="Email"
                      name="email"
                      onChange={this.handleRegisterUserChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <Form.Control
                      type="password"
                      className="cg-section__form--input"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleRegisterUserChange}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="cg-section__form--action">
                  <div className="cg-section__form--action-link">
                    <span className="cg-section__form--action-link-text">Already have an account: </span>
                    <Link to="/">Sign In</Link>
                  </div>
                  <Button type="submit" className="cg-section__form--action-submit">
                    Register
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
  register: state.register,
});

export default connect(mapStateToProps, { registerUser })(SignUp);
