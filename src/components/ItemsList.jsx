import React from "react";
import { Col } from "react-bootstrap";
import Item from "./Item";

const ItemsList = () => {
  return (
    <>
      {Array.from("i".repeat(20)).map((node, i) => {
        return (
          <Col key={i} className="mt-4" xs={12} sm={6} lg={4}>
            <Item />
          </Col>
        );
      })}
    </>
  );
};

export default ItemsList;
