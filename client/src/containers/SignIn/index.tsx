import React from 'react';
import { Container, Row, Col, Form, FormGroup, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../models/User';
import { connect } from 'react-redux';
import { registerUser, login } from '../../actions';
import { CurrentUserState } from '../../reducers/auth';

interface SIProps {
    currentUser?: CurrentUserState;
    registerUser: Function;
    login: Function;
    history: any;
}

interface SIState {
    user?: User;
    currentUser?: CurrentUserState;
    signIn: boolean;
    username: string;
    password: string;
}

class SignIn extends React.Component<SIProps, SIState> {
    state = {
        user: {} as User,
        signIn: true,
        username: '',
        password: '',
    };

    toggleSignInRegister = () => {
        this.setState({ signIn: !this.state.signIn});
    }

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
        this.setState({ signIn: true });
    }

    handleUserLoginChange = (event: any) => {
        const {name, value} = event.currentTarget;
        this.setState({[name]: value} as SIState, () => {});
    }

    handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        const { username, password} = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
        event.preventDefault();

        this.props.history.push('/');
    }

    render() {
        const { signIn } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        <div className='cg-heading'>
                            <h1 className="cg-heading__text">{ signIn ? 'Sign In' : 'Sign Up'} to play game</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {signIn &&
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
                                                name='username'
                                                size='lg'
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
                                                name='password'
                                                size='lg'
                                                onChange={this.handleUserLoginChange}
                                            />
                                        </InputGroup>
                                    </FormGroup>
                                    <div className="cg-section__form--action">
                                        <div className='cg-section__form--action-link'>
                                            <span className='cg-section__form--action-link-text'>New account:</span>
                                            <Button
                                                variant='link'
                                                size='sm'
                                                onClick={this.toggleSignInRegister}
                                            >Sign Up</Button>
                                        </div>
                                        <Button type="submit" className="cg-section__form--action-submit">Sign In</Button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    }
                    {!signIn &&
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
                                            <Button
                                                variant='link'
                                                size='sm'
                                                onClick={this.toggleSignInRegister}
                                            >Sign In</Button>
                                        </div>
                                        <Button type="submit" className="cg-section__form--action-submit">Register</Button>
                                    </div>
                                </Form>
                            </div>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state: SIState) => ({
    user: state.user,
    currentUser: state.currentUser,
});

export default connect(mapStateToProps, {registerUser, login})(SignIn);
