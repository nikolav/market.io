import React, { useState } from "react";
import { Form, Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";

import useCookieStorage, {JWTCOOKIE} from "../hooks/use-cookie-storage";
import { setUser, AUTH_REGISTER_URI } from "../features/auth/auth-slice";
import GuestNavigation from "../components/GuestNavigation";
import { SECTIONS, setSection } from "../features/sections/sections-slice";

const Register = () => {
  const [inputs, setInputs] = useState({
    name      : "",
    email     : "",
    password  : "",
    password2 : "",
  });

  const dispatch = useDispatch();
  const { handleCookie } = useCookieStorage();
  
  const navigateToLogin     = () => dispatch(setSection(SECTIONS.login));
  const navigateToDashboard = () => dispatch(setSection(SECTIONS.dashboard));

  const runCredentials = (evt) => {
    if (!inputs.name || !inputs.email || !inputs.password) return;

    fetch(AUTH_REGISTER_URI, {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify(inputs),
    })
      .then((res) => {
        return res.status === 201 ? res.json() : "";
      })
      .then(user => {

        if (user) {
          
          dispatch(setUser(user));
          handleCookie.set(JWTCOOKIE, 
            `${user.token} ${user.token_refresh}`);
          
          navigateToDashboard();
        }
      });
  };

  const ignore = (evt)   => evt.preventDefault();
  const syncAuth = (evt) => setInputs((inputs) => ({ ...inputs, [evt.target.name]: evt.target.value }));

  return (
    <>
    <GuestNavigation />
      <div className="d-flex justify-content-center mt-4">
        <Card className="shadow-sm" style={{ width: 360 }}>
          <Card.Header className="text-muted fst-italic text-center">
            Register for more...
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={ignore}>
              <Form.Group className="mb-3" controlId="user-register">
                <Form.Label>
                  Username{" "}
                  {0 === inputs.name.length && (
                    <span className="text-primary">*</span>
                  )}
                </Form.Label>
                <Form.Control
                  className="ps-5"
                  onChange={syncAuth}
                  name="name"
                  autoComplete="off"
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email-register">
                <Form.Label>
                  Email address{" "}
                  {0 === inputs.email.length && (
                    <span className="text-primary">*</span>
                  )}
                </Form.Label>
                <Form.Control
                  className="ps-5"
                  onChange={syncAuth}
                  name="email"
                  autoComplete="off"
                  type="text"
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-4" controlId="password-register">
                <Form.Label>
                  Password{" "}
                  {0 === inputs.password.length && (
                    <span className="text-primary">*</span>
                  )}
                </Form.Label>
                <Form.Control
                  className="ps-5"
                  onChange={syncAuth}
                  name="password"
                  autoComplete="off"
                  type="password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="password2-register">
                <Form.Label>
                  Confirm Password{" "}
                  {0 === inputs.password2.length && (
                    <span className="text-primary">*</span>
                  )}
                </Form.Label>
                <Form.Control
                  className="ps-5"
                  onChange={syncAuth}
                  name="password2"
                  autoComplete="off"
                  type="password"
                />
              </Form.Group>

              <div className="d-grid">
                <ButtonGroup size="lg" className="mt-2">
                  <Button
                    onClick={navigateToLogin}
                    variant="secondary"
                    className="--text-muted"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={runCredentials}
                    variant="primary"
                    type="submit"
                  >
                    Sign up
                  </Button>
                </ButtonGroup>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Register;
