import React from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import Logout from "./Logout";
import CreateNewItem from "./CreateNewItem";
import { useDispatch, useSelector } from "react-redux";
import { setSection, SECTIONS } from "../features/sections/sections-slice";
import IconDashboard from "./IconDashboard";

// replace dropdown trigger
const UserToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Nav.Link
    ref={ref}
    onClick={(evt) => {
      evt.preventDefault();
      onClick(evt);
    }}
  >
    <i className="ms-sm-2 fs-3 text-primary fa-solid fa-user"></i>
  </Nav.Link>
));

const Navigation = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.section);

  const navigateToItemCreate = () =>
    dispatch(setSection(SECTIONS["item-create"]));
  const navigateToDashboard = () => dispatch(setSection(SECTIONS.dashboard));
  return (
    <Navbar bg="light" expand="sm" className="shadow-sm">
      <Container fluid="sm">
        {SECTIONS["item-create"] !== current ? (
          <Navbar.Text
            onClick={navigateToItemCreate}
            className="cursor-pointer align-items-center d-flex"
          >
            <CreateNewItem />
            <span className="cursor-pointer text-primary opacity-50 d-inline-block ms-2 pb-1">
              postavi
            </span>
          </Navbar.Text>
        ) : (
          <Navbar.Text
            onClick={navigateToDashboard}
            className="cursor-pointer align-items-center d-flex"
          >
            <IconDashboard />
          </Navbar.Text>
        )}

        <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Dropdown align="end">
              <Dropdown.Toggle
                as={UserToggle}
                id="dropdown-custom-components"
              />
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={navigateToItemCreate}
                  className="align-items-center justify-content-start d-flex"
                  eventKey="1"
                >
                  <i className="me-4 text-primary --fs-5 fa-solid fa-circle-plus"></i>
                  novi post
                </Dropdown.Item>
                <Dropdown.Item
                  className="align-items-center justify-content-start d-flex"
                  eventKey="2"
                >
                  <i className="me-4 text-primary --fs-5 fa-solid fa-address-card"></i>
                  profil
                </Dropdown.Item>
                <Dropdown.Item
                  className="align-items-center justify-content-start d-flex"
                  eventKey="1"
                >
                  <i className="me-4 text-primary --fs-5 fa-solid fa-screwdriver-wrench"></i>
                  podešavanja
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

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
