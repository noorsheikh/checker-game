import React from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button, NavLink, Nav } from 'react-bootstrap';
import { User } from '../../models/User';
import { connect } from 'react-redux';
import { registerUser, login } from '../../actions';
import { CurrentUserState } from '../../reducers/auth';
import { Route, Link } from 'react-router-dom';

interface SIProps {
    currentUser?: CurrentUserState;
    registerUser: Function;
    login: Function;
    history: any;
}

interface SIState {
    user?: User;
    currentUser?: CurrentUserState;
    username: string;
    password: string;
}

class SignUp extends React.Component<SIProps, SIState> {
    state = {
        user: {} as User,
        username: '',
        password: '',
    };

    handleRegisterUserChange = (event: any) => {
        const { name, value } = event.currentTarget;
        const user = {...this.state.user};
        if (name === 'username') {
            user['username'] = value;
        } else if (name === 'email') {
            user['email'] = value;
        } else if (name === 'password') {
            user['password'] = value;
        }
        this.setState({ user } as SIState, () => this.state);
    }

    handleRegisterUserSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        this.props.registerUser(this.state.user);
        event.preventDefault();
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className='cg-heading'>
                            <h1 className="cg-heading__text">Sign up to play game</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                  <Col lg={{ span: 6, offset: 3 }}  className="justify-content-md-center">
                      <div className="cg-section">
                          <Form className="cg-section__form" onSubmit={this.handleRegisterUserSubmit} noValidate>
                          <FormGroup>
                                  <InputGroup>
                                      <Form.Control
                                          type="text"
                                          className="cg-section__form--input"
                                          placeholder="Your Username"
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
                                          placeholder="Your Email"
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
                                          placeholder="Your Password"
                                          name="password"
                                          onChange={this.handleRegisterUserChange}
                                          />
                                  </InputGroup>
                              </FormGroup>
                              <div className="cg-section__form--action">
                                  <div className='cg-section__form--action-link'>
                                      <span className='cg-section__form--action-link-text'>Already have an account:</span>
                                      <Link to="/sign-in">Sign In</Link>
                                  </div>
                                  <Button type="submit" className="cg-section__form--action-submit">Register</Button>
                              </div>
                          </Form>
                      </div>
                  </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: SIState) => ({
    user: state.user,
    currentUser: state.currentUser,
});

export default connect(mapStateToProps, {registerUser})(SignUp);
