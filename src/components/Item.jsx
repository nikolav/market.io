import React from "react";
import { Card } from "react-bootstrap";
import css from "./Item.module.css";

import formatedDate from "../util/formated-date.js";

const Item = ({ item }) => {
  const { _id, title, description, image, createdAt } = item;

  return (
    <Card className={`my-4 border-5 ${css.card}`}>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-top-0">
        <div
          style={{ fontSize: "81%" }}
          className="d-flex justify-content-end text-muted"
        >
          {formatedDate(createdAt)}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Item;
