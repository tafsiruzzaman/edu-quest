import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import logo from '../../images/logo_edu.png';
import './Header.css';

const Header = () => {
    const {user, logOut} = useAuth();
    const activeStyle = {
        fontWeight: "bold",
        color: "#ff7f47"
    }
    return (
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Container>
                <Navbar.Brand>
                    <NavLink to="/">
                        <img
                            src={logo}
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                            alt="React Bootstrap logo"
                        />
                    </NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="nav-links">
                    <Nav className="me-auto">
                        
                    </Nav>
                    <Nav>
                        {
                            user.email && 
                            <NavLink activeStyle={activeStyle} className="me-3 mt-2 text-decoration-none text-secondary" to='/dashboard'>Dashboard</NavLink>
                        }
                        {
                            user.email ? 
                            <div className="btn-colour">
                                <Button onClick={logOut} variant="rounded-0 text-white ms-3 px-3">
                                    <i className="fas fa-sign-in-alt"></i> Sign Out
                                </Button>
                            </div>
                            :
                            <NavLink to="/signin" className="btn-colour">
                                <Button variant="rounded-0 text-white px-3">
                                    <i className="fas fa-sign-in-alt"></i> Sign In
                                </Button>
                            </NavLink>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;