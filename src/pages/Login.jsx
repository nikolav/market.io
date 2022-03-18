import React from "react";
import { Link }  from "react-router-dom";
import { Form, Button, ButtonGroup, Card } from "react-bootstrap";

const Login = () => {
  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Card className="shadow-sm"
        style={{ width: 360 }}
      >
        <Card.Header className="text-muted fst-italic text-center">
          Login use all our services.
        </Card.Header>
        <Card.Body className="p-4">
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username <span className="text-primary">*</span></Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address <span className="text-primary">*</span></Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group> */}

            <Form.Group className="mb-3 mt-4" controlId="password">
              <Form.Label>Password <span className="text-primary">*</span></Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="password2">
              <Form.Label>Confirm Password  <span className="text-primary">*</span></Form.Label>
              <Form.Control type="password" placeholder="Confirm password" />
            </Form.Group> */}

            <Form.Group className="mb-3 mt-4 ms-2" controlId="rememberme">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <div className="d-grid">
              <ButtonGroup size="lg">
                <Button variant="primary" type="submit">
                  Login
                </Button>
                <Button variant="secondary" className="--text-muted">
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
