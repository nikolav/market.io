import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";



const Navigation = () => {

  const navigate = useNavigate();
  const navigateToLogin    = () => navigate("/login");
  const navigateToRegister = () => navigate("/register");

  return (
    <Navbar bg="light" expand="sm" className="--bg">
      <Container fluid="sm">
        <Navbar.Brand href="/"><i className="fs-2 text-primary fa-solid fa-house"></i></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={navigateToLogin}><i className="fs-2 text-primary fa-solid fa-circle-user"></i></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;


