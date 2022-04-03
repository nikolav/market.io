import React, { useState, useEffect, useCallback } from "react";
import { Navbar, Nav, Container, Form, InputGroup } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { setSection, SECTIONS } from "../features/sections/sections-slice";
import { search } from "../features/main/main-slice.js";

import useFancyboxGallery from "../hooks/use-fancybox-gallery.js";
import q from "nikolav-q";
import css from "./GuestNavigation.module.css";

const Navigation = () => {
  const [term, setTerm] = useState("");

  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.section);

  const navigateToLogin = () => dispatch(setSection(SECTIONS.login));
  const navigateToAbout = () => dispatch(setSection(SECTIONS.about));
  const navigateToIndex = () => dispatch(setSection(SECTIONS.index));

  const ignore = (evt) => {
    evt.preventDefault();
  };

  const syncInput = (evt) => {
    setTerm((_) => evt.target.value);
  };
  const setSearchTerm = (value) => dispatch(search(value));
  const setSearchTermDebounced = useCallback(
    q.func.debounce(setSearchTerm, 892),
    []
  );
  useEffect(() => {
    setSearchTermDebounced(term);
  }, [term]);

  const {openGallery} = useFancyboxGallery();
  const displayHelpVideo = () => {
    return openGallery([
      {
        src  : 'https://youtu.be/aLi9AHSZJdI', 
        type : 'iframe',
      },
    ])
  };
  return (
    <>
      <div className="push-down"></div>
      <Navbar
        fixed="top"
        bg="light"
        expand="sm"
        className={`shadow-sm ${css.navbarGuest}`}
      >
        <Container fluid="sm">
          <Navbar.Brand onClick={navigateToIndex}>
            <i className="d-none d-sm-inline-block fs-3 cursor-pointer text-primary fa-solid fa-house"></i>
          </Navbar.Brand>
          <Navbar.Text className="cursor-pointer" onClick={navigateToIndex}>
            <strong className="brand-name ms-0 ms-sm-1 text-primary opacity-50">
              oglasi.io
            </strong>
          </Navbar.Text>
          <Navbar.Toggle className="ms-auto" aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {SECTIONS.index === current && (
                <Form
                  onSubmit={ignore}
                  style={{ height: "2em", marginTop: 10 }}
                  className="form-item-search d-flex me-4 opacity-50"
                >
                  <InputGroup className="">
                    <Form.Control
                      value={term}
                      onChange={syncInput}
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
              <Nav.Link
                rel="noreferrer noopener"
                target="_blank"
                href="https://github.com/nikolav/market.io"
                className="cursor-pointer"
              >
                <i className="cursor-pointer ms-sm-2 fs-3 text-primary fa-brands fa-github"></i>
              </Nav.Link>
              <Nav.Link
                onClick={displayHelpVideo}
               className="cursor-pointer opacity-25">
                <i className="cursor-pointer ms-sm-2 fs-3 text-primary fa-solid fa-circle-question"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
