import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/logo_edu.png';

const Header = () => {
    const activeStyle = {
        fontWeight: "bold",
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
                        <NavLink activeStyle={activeStyle} className="me-5 text-decoration-none text-secondary" to='/home'>Home</NavLink>
                        <NavLink activeStyle={activeStyle} className="me-3 text-decoration-none text-secondary" to='/contact'>Dashboard</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;