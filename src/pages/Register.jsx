import React, { useState } from "react";
import { Form, Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";

import useCookieStorage, { JWTCOOKIE } from "../hooks/use-cookie-storage";
import { setUser, AUTH_REGISTER_URI } from "../features/auth/auth-slice";
import GuestNavigation from "../components/GuestNavigation";
import { SECTIONS, setSection } from "../features/sections/sections-slice";

const HEADER_MESSAGE_DEFAULT = "Registracija je obavezna za korišćenje usluga.";
const Register = () => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [headerMessage, setHeaderMessage] = useState(HEADER_MESSAGE_DEFAULT);

  const dispatch = useDispatch();
  const { handleCookie } = useCookieStorage();

  const navigateToLogin = () => dispatch(setSection(SECTIONS.login));
  const navigateToDashboard = () => dispatch(setSection(SECTIONS.dashboard));

  const runCredentials = (evt) => {
    if (!inputs.name || !inputs.email || !inputs.password || !inputs.password2)
      return setHeaderMessage("Niste popunili sva polja.");
    
    if (inputs.password < 2)
      return setHeaderMessage("Lozinka treba da ima bar 2 znaka.");
    
    if (inputs.password !== inputs.password2)
      return setHeaderMessage("Lozinke se ne poklapaju.");
    
    fetch(AUTH_REGISTER_URI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputs),
    })
      .then((res) => {
        return res.status === 201 ? res.json() : "";
      })
      .then((user) => {
        if (user) {
          handleCookie.set(JWTCOOKIE, `${user.token} ${user.token_refresh}`);
          dispatch(setUser(user));

          navigateToDashboard();
        }
      });
  };

  const ignore = (evt) => evt.preventDefault();
  const syncAuth = (evt) =>
    setInputs((inputs) => ({ ...inputs, [evt.target.name]: evt.target.value }));

  return (
    <>
      <GuestNavigation />
      <div className="d-flex justify-content-center mt-4">
        <Card className="shadow-sm" style={{ width: 388 }}>
          <Card.Header className="text-muted fst-italic text-center">
            {headerMessage}
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={ignore}>
              <Form.Group className="mb-3" controlId="user-register">
                <Form.Label>
                  Korisničko Ime{" "}
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
                  Email adresa{" "}
                  {0 === inputs.email.length && (
                    <span className="text-primary">*</span>
                  )}
                </Form.Label>
                <Form.Control
                  className="ps-5"
                  onChange={syncAuth}
                  name="email"
                  autoComplete="off"
                  type="email"
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-4" controlId="password-register">
                <Form.Label>
                  Lozinka
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
                  Potvrdi Lozinku
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
                    Prijava
                  </Button>
                  <Button
                    onClick={runCredentials}
                    variant="primary"
                    type="submit"
                  >
                    Registracija
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
