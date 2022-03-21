import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Navigation from "../components/Navigation";

const About = () => {
  return (
    <div className="page-about">
      <Navigation />
      <Container fluid="sm">
        <Row>
          <Col>
            <h1 className="display-1">about</h1>
            <p className="lead">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Deserunt, itaque deleniti.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
              suscipit animi quidem ut officiis amet, sit, consectetur dolorem
              ad optio, atque est consequuntur? Illum numquam iure cupiditate
              blanditiis reprehenderit pariatur non mollitia expedita assumenda
              quaerat rem nisi nostrum alias, dolorum itaque. Eaque beatae unde,
              nostrum enim cum doloremque totam asperiores? Molestias
              reprehenderit quasi maxime asperiores.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
