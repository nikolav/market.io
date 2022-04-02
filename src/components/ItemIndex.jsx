import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";

import iconSearchPrimary from "../theme/etc/icon-search-primary.svg";
import "./ItemIndex.css";

import formatedDate from "../util/formated-date.js";
import { imagePreload } from "../util/image-preload";

const ItemIndex = ({ item }) => {
  const { _id, title, description, image, createdAt, user } = item;

  const [modalShow, setModalShow] = useState(null);
  const handleModalClose = () => setModalShow((_) => false);
  const handleModalOpen = () => setModalShow((_) => true);

  const previewPost = (evt) => handleModalOpen();
  return (
    <Card
      onMouseEnter={imagePreload.bind(null, image)}
      className={`border-5 postCard`}
    >
      <Card.Body>
        <Card.Title className="d-flex align-items-start justify-content-between">
          <h2>{title}</h2>
          <img
            onClick={previewPost}
            className="postView"
            src={iconSearchPrimary}
            alt=""
          />
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-top-0">
        <div className="opacity-50 d-flex align-items-end justify-content-between">
          {user.name}
          <small>{formatedDate(createdAt)}</small>
        </div>
      </Card.Footer>

      <Modal
        scrollable={true}
        fullscreen="sm-down"
        show={modalShow}
        onHide={handleModalClose}
      >
        <Modal.Body className="scrollbar-primary">
          <div className="d-flex flex-column">
            {image && (
              <img
                style={{
                  height: 192,
                  maxHeight: 192,
                  objectFit: "contain",
                }}
                className="img-fluid align-self-start"
                src={image}
                alt=""
              />
            )}
            <div>
              <h2 className="mt-2">{title}</h2>
              <p className="mt-2">{description || ""}</p>
              <p className="mt-3 pb-0 mb-0 text-muted fst-italic">
                <small>{formatedDate(createdAt)}</small>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-between border-top-1">
          <p>
            <strong>{user.name}</strong>
            <em>
              {" "}
              &lt;
              <a href={`mailto:${user.email}`} target="_blank" rel="noreferrer">
                {user.email}
              </a>
              &gt;
            </em>
          </p>
          <Button
            className=""
            size="lg"
            variant="secondary"
            onClick={handleModalClose}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default ItemIndex;
