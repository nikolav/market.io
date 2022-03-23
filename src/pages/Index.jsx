import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import GuestNavigation from "../components/GuestNavigation";
import ItemsList from "../components/ItemsList";

const Index = () => {
  return (
    <>
      <GuestNavigation />
      <Container className="mt-5">
        <Row>
          <ItemsList />
        </Row>
      </Container>
    </>
  );
};

export default Index;
