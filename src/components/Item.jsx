import React from "react";
import { Card } from "react-bootstrap";

const Item = () => {
  return (
    <>
      <Card>
        <Card.Body>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt incidunt
          dolores quidem illo similique, adipisci laborum ut earum rem illum
          minima quos, doloremque perferendis eos, pariatur voluptates quo
          eveniet sed!
        </Card.Body>
        <Card.Footer>
            <div
            style={{fontSize: "81%"}}
            className="d-flex align-items-center justify-content-end text-muted">
              Lorem, ipsum dolor.
            </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Item;
