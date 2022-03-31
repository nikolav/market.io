import React from "react";
import { Card } from "react-bootstrap";
import css from "./Item.module.css";

const Item = ({item}) => {

  const { _id, title, description, image, createdAt } = item;
  
  return (
    <>
      <Card className={`my-4 border-5 ${css.card}`}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <p>{description}</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
            incidunt dolores quidem illo similique, adipisci laborum ut earum
            rem illum minima quos, doloremque perferendis eos, pariatur
            voluptates quo eveniet sed!
          </p>
        </Card.Body>
        <Card.Footer className="">
          <div
            style={{ fontSize: "81%" }}
            className="d-flex align-items-center justify-content-end text-muted"
          >
            {createdAt}
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Item;
