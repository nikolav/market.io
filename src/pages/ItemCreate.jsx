import React, { useEffect, useState } from "react";
import UserNavigation from "../components/UserNavigation";
import {
  ButtonGroup,
  Button,
  Stack,
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import ButtonUpload from "../components/ButtonUpload/ButtonUpload";

// import InputUpload from "../components/InputUpload";
// import Spinner from "../components/Spinner/Spinner";

import classes from "./ItemCreate.module.css";
import useFileReader from "../hooks/use-file-reader";

const imgsrc =
  "https://cdn.pixabay.com/photo/2015/10/13/23/51/krka-987021_960_720.jpg";

// form handlers
const ignore = (evt) => evt.preventDefault();
const formatHeaderMessage = 
  header => `${String(header).substring(0, 23)}...`;

// @c
const ItemCreate = () => {
  const [inputs, setInputs] = useState({
    title       : "",
    file        : null, // file{}
    description : "",
  });
  const [headerMessage, setHeaderMessage] = useState("header");

  const [imageSrc, setImageSrc] = useState(null);
  const [read, { url }] = useFileReader();

  const syncInputs = (evt) =>
    setInputs((state_) => ({ ...state_, [evt.target.name]: evt.target.value }));

  const syncFile = (evt) => {
    const file = evt.target.files[0];

    // accepts images only
    if (!/jpe?g|png|gif|svg/i.test(file.type))
      return setHeaderMessage("Izaberite sliku ( jpg, png, ... )");
    
    setHeaderMessage(formatHeaderMessage(file.name));
    setInputs((state_) => ({ ...state_, file }));
    read(file);
  };

  useEffect(() => {
    if (url) setImageSrc(url);
  }, [url]);

  console.log(inputs);

  return (
    <div className={classes.pageItemCreate}>
      <UserNavigation />
      <Container>
        <Row>
          <Col xs={12} lg={{ offset: 1, span: 10 }}>
            <Card className="--shadow-sm overflow-hidden">
              <Card.Header className="text-end">{headerMessage}</Card.Header>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "4fr 6fr",
                  minHeight: 345,
                  maxHeight: 480,
                }}
              >
                <div>
                  <Card.Img
                    style={{
                      objectFit: "cover",
                    }}
                    className={`--rounded-0 h-100 img-thumbnail ${classes.uploadImage}`}
                    variant="top"
                    src={imageSrc || imgsrc}
                  />
                </div>

                <div>
                  <Card.Body className="px-md-4">
                    <Form
                      className={classes.formNovOglas}
                      style={
                        {
                          // height: "100%",
                        }
                      }
                      onSubmit={ignore}
                    >
                      {/* naslov */}
                      <FloatingLabel label="Naslov">
                        <Form.Control
                          onChange={syncInputs}
                          id="title"
                          name="title"
                          value={inputs.title}
                          placeholder="Naslov"
                          type="text"
                        />
                      </FloatingLabel>

                      {/* text oglasa */}
                      <FloatingLabel label="Detalji">
                        <Form.Control
                          onChange={syncInputs}
                          id="title"
                          name="description"
                          value={inputs.description}
                          className="mt-4"
                          placeholder="Tekst oglasa"
                          style={{ minHeight: 198 }}
                          as="textarea"
                        />
                      </FloatingLabel>

                      {/* kontrole */}
                      <Stack className="mt-4 mb-2 w-100" direction="horizontal">
                        <ButtonUpload
                          id="file"
                          name="file"
                          onChange={syncFile}
                          label="Slika..."
                          classNames={{ label: "me-auto" }}
                        />
                        <div>
                          <ButtonGroup size="lg" className="ms-auto">
                            <Button type="button" variant="secondary">
                              Pregled
                            </Button>
                            <Button type="button" variant="primary">
                              Postavi oglas
                            </Button>
                          </ButtonGroup>
                        </div>
                      </Stack>
                    </Form>
                  </Card.Body>
                </div>
              </div>

              <Card.Footer className="text-center">
                {/* <InputUpload />  */}
                postavi novi oglasi
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <Spinner /> */}
    </div>
  );
};

export default ItemCreate;
