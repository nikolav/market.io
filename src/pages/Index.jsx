import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import GuestNavigation from "../components/GuestNavigation";
// import ItemsList from "../components/ItemsList";

const Index = () => {
  return (
    <>
      <GuestNavigation />
      <Container className="mt-5">
        <Row>
          {/* <ItemsList /> */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores
            id, repellat nisi ipsa dolorem nam, in alias consectetur, quae
            voluptatum quas fuga?
          </p>
        </Row>
      </Container>
    </>
  );
};

export default Index;
