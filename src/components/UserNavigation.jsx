import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logout from "./Logout";

const Navigation = () => {

  return (
    <Navbar bg="light" expand="sm" className="shadow-sm">
      <Container fluid="sm">
        <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <Logout />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
