import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import Logout from "./Logout";
import CreateNewItem from "./CreateNewItem";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Nav.Link
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <i className="ms-sm-2 fs-3 text-primary fa-solid fa-user"></i>
  </Nav.Link>
));

const Navigation = () => {
  return (
    <Navbar bg="light" expand="sm" className="shadow-sm">
      <Container fluid="sm">
        <Navbar.Text className="cursor-pointer align-items-center d-flex">
          <CreateNewItem />{" "}
          <span className="text-primary opacity-50 d-inline-block ms-2 pb-1">
            {" "}
            postavi
          </span>
        </Navbar.Text>
        <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link>
              <Logout />
            </Nav.Link>

            <Dropdown align="end">
              <Dropdown.Toggle
                as={CustomToggle}
                id="dropdown-custom-components"
              />
              <Dropdown.Menu>
                <Dropdown.Item className="align-items-center justify-content-start d-flex" eventKey="1">
                <i className="me-4 text-primary --fs-5 fa-solid fa-screwdriver-wrench"></i>
                  podešavanja
                </Dropdown.Item>
                <Dropdown.Item className="align-items-center justify-content-start d-flex" eventKey="2">
                <i className="me-4 text-primary --fs-5 fa-solid fa-address-card"></i>
                  profil
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
