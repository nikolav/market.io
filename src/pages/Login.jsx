import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, ButtonGroup, Card } from "react-bootstrap";
import { setUser } from "../features/auth/auth-slice";
// import useTokenStorage from "../hooks/use-token-storage";

const AUTH_URI = "http://localhost:3111/auth/login";



// 
const Login = () => {

  
  const [auth, setAuth] = useState({
    email    : "", 
    password : ""});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [token, setToken] 
  //   = useTokenStorage(".jwtrc");
  // const [token_refresh, setTokenRefresh] 
  //   = useTokenStorage(".jwtrc.refresh");

  const runCredentials = () => {

    if (!auth.email || !auth.password) 
      return;
    
    fetch(AUTH_URI, 
      {
        method  : "POST", 
        headers : { "Content-Type": "application/json" }, 
        body    : JSON.stringify(auth),
      })
      .then(res    => res.ok ? res.json() : null)
      .then(user   => {
        if (user) {

          // update tokens to route hard refresh
          // setToken(user.token);
          // setTokenRefresh(user.token_refresh);
          
          dispatch(setUser(user));
        }
      });
  };

  const navigateToRegister = ()  => navigate("/register");
  const syncAuth = evt => setAuth(auth => ({...auth, [evt.target.name]: evt.target.value}));
  const ignore = evt => evt.preventDefault();

  return (
    <div
      className="d-flex justify-content-center mt-4"
    >
      <Card className="shadow-sm"
        style={{ width: 360 }}
      >
        <Card.Header className="text-muted fst-italic text-center">
          Login to use all our services.
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={ignore} noValidate>

            <Form.Group className="mb-3" controlId="email-login">
              <Form.Label>Email {(0 === auth.email.length) && <span className="text-primary">*</span>}</Form.Label>
              <Form.Control
                className="ps-5"
                type="email" 
                name="email"
                value={auth.email}
                onChange={syncAuth}
                autoComplete="off" />
            </Form.Group>

            <Form.Group className="mb-3 mt-4" controlId="password-login">
              <Form.Label>Password {(0 === auth.password.length) && <span className="text-primary">*</span>}</Form.Label>
              <Form.Control 
                className="ps-5"
                type="password" 
                name="password"
                value={auth.password}
                onChange={syncAuth}
                autoComplete="off" />
            </Form.Group>

            {/* <Form.Group className="mb-3 mt-4 ms-2" controlId="rememberme">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group> */}

            <div className="d-grid">
              <ButtonGroup size="lg" className="mt-2">
                <Button 
                  onClick={runCredentials} 
                  variant="primary" 
                  type="submit">
                  Login
                </Button>
                <Button 
                  onClick={navigateToRegister} 
                  variant="secondary" 
                  className="--text-muted">
                  Sign up
                </Button>
              </ButtonGroup>
            </div>
          </Form>
        </Card.Body>
      </Card>
      
    </div>
  );
};

export default Login;
