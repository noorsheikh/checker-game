import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const handleUserLogout = () => {
  window.sessionStorage.removeItem('persist:root');
  window.location.reload();
};

interface HProps {
  isLoggedIn: boolean;
  firstname: string;
  username: string;
}

const Header: React.FC<HProps> = (props: HProps) => {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand className="navbar__logo" as={NavLink} to="/home">
          Checker Game
        </Navbar.Brand>
        <Navbar.Toggle area-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="navbar__auth-nav justify-content-end" id="responsive-navbar-nav">
          <Nav>
            {props.isLoggedIn ? (
              <React.Fragment>
                <Nav.Link>Welcome {props.firstname ?? `${props.username}`}</Nav.Link>
                <Nav.Link className="navbar__auth-nav--item" onClick={handleUserLogout}>
                  Logout
                </Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link as={NavLink} className="navbar__auth-nav--item" to="/sign-in" exact>
                  Sign In
                </Nav.Link>
                <Nav.Link as={NavLink} className="navbar__auth-nav--item" to="/sign-up" exact>
                  Sign Up
                </Nav.Link>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
