import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, ButtonGroup, Card } from "react-bootstrap";
import { setUser } from "../features/auth/auth-slice";

// 
const Login = () => {

  const [auth, setAuth] = useState({
    email    : "", 
    password : ""});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkCredentials = () => {

    if (!auth.email || !auth.password) 
      return;
    
    fetch("http://localhost:3111/auth/login", 
      {
        method  : "POST", 
        headers : { "Content-Type": "application/json" }, 
        body    : JSON.stringify(auth),
      })
      .then(res    => res.ok ? res.json() : null)
      .then(data   => dispatch(setUser(data)))
      .catch(error => console.dir(error));
  };

  const navigateToRegister = ()  => navigate("/register");
  const syncAuth = evt => setAuth(auth => ({...auth, [evt.target.name]: evt.target.value}));
  const ignore = evt => evt.preventDefault();
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="shadow-sm"
        style={{ width: 360 }}
      >
        <Card.Header className="text-muted fst-italic text-center">
          Login to use all our services.
        </Card.Header>
        <Card.Body className="p-4">
          <Form onSubmit={ignore} noValidate>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email {(0 === auth.email.length) && <span className="text-primary">*</span>}</Form.Label>
              <Form.Control
                className="ps-5"
                type="text" 
                name="email"
                value={auth.email}
                onChange={syncAuth}
                placeholder="✉" />
            </Form.Group>

            <Form.Group className="mb-3 mt-4" controlId="password">
              <Form.Label>Password {(0 === auth.password.length) && <span className="text-primary">*</span>}</Form.Label>
              <Form.Control 
                className="ps-5"
                type="email" 
                name="password"
                value={auth.password}
                onChange={syncAuth}
                placeholder="🔑" />
            </Form.Group>

            <Form.Group className="mb-3 mt-4 ms-2" controlId="rememberme">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <div className="d-grid">
              <ButtonGroup size="lg">
                <Button 
                  onClick={checkCredentials} 
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
