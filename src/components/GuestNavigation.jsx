import React from "react";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { setSection, SECTIONS } from "../features/sections/sections-slice";

const Navigation = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.section);

  const navigateToLogin = () => dispatch(setSection(SECTIONS.login));
  const navigateToAbout = () => dispatch(setSection(SECTIONS.about));
  const navigateToIndex = () => dispatch(setSection(SECTIONS.index));

  return (
    <Navbar bg="light" expand="sm" className="shadow-sm">
      <Container fluid="sm">
        <Navbar.Brand onClick={navigateToIndex}>
          <i className="d-none d-sm-inline-block fs-3 cursor-pointer text-primary fa-solid fa-house"></i>
        </Navbar.Brand>
        <Navbar.Text className="cursor-pointer" onClick={navigateToIndex}>
          <span className="brand-name ms-0 ms-sm-1 d-inline-block text-primary opacity-50">
            oglasi.io
          </span>
        </Navbar.Text>
        <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {SECTIONS.index === current && (
              <Form
                style={{ height: "2em", marginTop: 10 }}
                className="form-item-search d-flex me-4 opacity-50"
              >
                <InputGroup className="">
                  <Form.Control
                    id="input-search"
                    className="ps-5 bg-transparent border-primary"
                    type="text"
                  />
                </InputGroup>
              </Form>
            )}

            <Nav.Link onClick={navigateToAbout}>
              <i className="fs-3 text-primary fa-solid fa-circle-info"></i>
            </Nav.Link>
            <Nav.Link onClick={navigateToLogin}>
              <i className="ms-sm-2 fs-3 text-primary fa-solid fa-circle-user"></i>
            </Nav.Link>
            <Nav.Link className="cursor-pointer opacity-25">
              <i className="cursor-pointer ms-sm-2 fs-3 text-primary fa-solid fa-circle-question"></i>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
