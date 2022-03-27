import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, ButtonGroup, Card } from "react-bootstrap";

import GuestNavigation from "../components/GuestNavigation";
import { SECTIONS, setSection } from "../features/sections/sections-slice";
import { setUser, AUTH_LOGIN_URI } from "../features/auth/auth-slice";
import useCookieStorage, {JWTCOOKIE} from "../hooks/use-cookie-storage";

//
const Login = () => {

  const [auth, setAuth] = useState({
    email    : "",
    password : "",
  });

  const [fetchingAuth, setFetchingAuth] = useState(false);
  const [messageAuth, setMessageAuth]   = useState("Prijavi se na sistem.")

  const dispatch = useDispatch();
  const { handleCookie } = useCookieStorage();
  
  const navigateToRegister  = () => dispatch(setSection(SECTIONS.register));
  const navigateToDashboard = () => dispatch(setSection(SECTIONS.dashboard));

  const runCredentials = () => {

    const email_    = auth.email.trim();
    const password_ = auth.password.trim();

    if (!email_) {
      setMessageAuth("Niste uneli Email adresu.")
      return;
    }

    if (!password_) {
      setMessageAuth("Niste uneli lozinku.")
      return;
    }

    if (password_.length < 2) {
      setMessageAuth("Lozinka treba da ima bar 2 znakova.")
      return;
    }


    setFetchingAuth(true);

    fetch(AUTH_LOGIN_URI, {
      method  : "POST",
      headers : { "Content-Type": "application/json" },
      body    : JSON.stringify(auth),
    })
      .then(res => {
        if (!res.ok) {
          setFetchingAuth(false);
          setMessageAuth("Greška, korisnik nije u sistemu.");
          return "";
        }
        return res.json();
      })
      .then(user => {
        
        if (user) {
          
          dispatch(setUser(user));
          handleCookie.set(JWTCOOKIE, 
            `${user.token} ${user.token_refresh}`);

          setFetchingAuth(false);
          navigateToDashboard();
        }
      })
      .catch(error => {
        setMessageAuth("Greška, pokušajte ponovo.")
      })
      .finally(() => setFetchingAuth(false));

  };

  const syncAuth = (evt) =>
    setAuth((auth) => ({ ...auth, [evt.target.name]: evt.target.value }));
  const ignore = (evt) => evt.preventDefault();

  return (
    <>
      <GuestNavigation />
      <div className="d-flex justify-content-center mt-4">
        <Card className="shadow-sm" style={{ width: 388 }}>
          <Card.Header className="text-muted fst-italic text-center">
            {messageAuth}
          </Card.Header>
          <Card.Body className="p-4">
            <Form onSubmit={ignore} noValidate>
              <Form.Group className="mb-3" controlId="email-login">
                <Form.Label>
                  Email{" "}
                  {0 === auth.email.length && (
                    <span className="text-primary">*</span>
                  )}
                </Form.Label>
                <Form.Control
                  className="ps-5"
                  type="email"
                  name="email"
                  value={auth.email}
                  onChange={syncAuth}
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-4" controlId="password-login">
                <Form.Label>
                  Lozinka
                  {0 === auth.password.length && (
                    <span className="text-primary">*</span>
                  )}
                </Form.Label>
                <Form.Control
                  className="ps-5"
                  type="password"
                  name="password"
                  value={auth.password}
                  onChange={syncAuth}
                  autoComplete="off"
                />
              </Form.Group>

              <div className="d-grid">
                <ButtonGroup size="lg" className="mt-2">
                  <Button
                    disabled={fetchingAuth}
                    onClick={runCredentials}
                    variant="primary"
                    type="submit"
                  >
                    Prijava
                  </Button>
                  <Button
                    onClick={navigateToRegister}
                    variant="secondary"
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

export default Login;
