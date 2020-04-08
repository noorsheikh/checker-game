import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CurrentUserState } from '../../reducers/auth';

interface HProps {
  currentUser: CurrentUserState;
  history?: any;
}

interface HState {
  currentUser: CurrentUserState;
}

class Home extends React.Component<HProps, HState> {
  render() {
    const { currentUser } = this.props.currentUser;
    console.log(currentUser);
    return (
      <Navbar collapseOnSelect expand='lg' className="navbar">
        <Container>
            <Navbar.Brand className="navbar__logo" as={NavLink} to='/'>Checker Game</Navbar.Brand>
            <Navbar.Toggle area-controls='responsive-navbar-nav' />
            <Navbar.Collapse className='navbar__auth-nav justify-content-end' id='responsive-navbar-nav'>
                <Nav>
                  {currentUser?.isLoggedIn ?
                    <React.Fragment>
                      <Nav.Link>Welcome { currentUser?.firstName ?? `${currentUser?.username}` }</Nav.Link>
                      <Nav.Link className='navbar__auth-nav--item'>
                          Logout
                      </Nav.Link>
                    </React.Fragment>
                  :
                    <React.Fragment>
                      <Nav.Link as={NavLink} className='navbar__auth-nav--item' to='/sign-in' exact>
                          Sign In
                      </Nav.Link>
                      <Nav.Link as={NavLink} className='navbar__auth-nav--item' to='/sign-up' exact>
                          Sign Up
                      </Nav.Link>
                    </React.Fragment>
                  }
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

const mapStateToProps = (state: HState) => ({
  currentUser: state.currentUser,
});

export default connect(mapStateToProps, null)(Home);
