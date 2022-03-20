import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSection, SECTIONS } from "../features/sections/sections-slice";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigateToLogin = () =>
    dispatch(setSection(SECTIONS.login));

  return (
    <Navbar bg="light" expand="sm">
      <Container fluid="sm">
        <Navbar.Brand href="/">
          <i className="fs-2 text-primary fa-solid fa-house"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link onClick={navigateToLogin}>
              <i className="fs-2 text-primary fa-solid fa-circle-user"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
