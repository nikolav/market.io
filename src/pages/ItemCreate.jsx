import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSection, SECTIONS } from "../features/sections/sections-slice";

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
  Modal,
} from "react-bootstrap";
import useFancyboxGallery from "../hooks/use-fancybox-gallery";
import ButtonUpload from "../components/ButtonUpload/ButtonUpload";
import FormCreatePostControls from "../components/FormCreatePostControls/FormCreatePostControls";

// import InputUpload from "../components/InputUpload";
// import Spinner from "../components/Spinner/Spinner";

import classes from "./ItemCreate.module.css";
import useFileReader from "../hooks/use-file-reader";
import iconEditItem from "../theme/etc/icon-edit-item.svg";

import imageUploadHelpStep01 from "../theme/etc/post-help-step-01.jpg";
import imageUploadHelpStep02 from "../theme/etc/post-help-step-02.jpg";
import imageUploadHelpStep03 from "../theme/etc/post-help-step-03.jpg";
import imageUploadHelpStep04 from "../theme/etc/post-help-step-04.jpg";
import imageUploadHelpStep05 from "../theme/etc/post-help-step-05.jpg";

const imgsrc =
  "https://cdn.pixabay.com/photo/2015/10/13/23/51/krka-987021_960_720.jpg";
const imageErrorWrongType = "Izaberite sliku ( jpg, png, ... )";

// form handlers
const ignore = (evt) => evt.preventDefault();
const formatHeaderMessage = (header) => `${String(header).substring(0, 45)}...`;

// @c
const ItemCreate = () => {
  const [inputs, setInputs] = useState({
    title: "",
    file: null, // file{}
    description: "",
  });
  const [headerMessage, setHeaderMessage] = useState("oglas");

  const [imageSrc, setImageSrc] = useState(null);

  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow((s) => false);
  const handleModalShow = () => setModalShow((s) => true);

  const [read, { url }] = useFileReader();

  const dispatch = useDispatch();
  const navigateToDashboard = () => dispatch(setSection(SECTIONS.dashboard));

  const syncInputs = (evt) =>
    setInputs((state_) => ({ ...state_, [evt.target.name]: evt.target.value }));

  const syncFile = (evt) => {
    const file = evt.target.files[0];

    // accept images only
    if (!/jpe?g|png|gif|svg/i.test(file.type))
      return setHeaderMessage(imageErrorWrongType);

    setHeaderMessage(formatHeaderMessage(file.name));
    setInputs((state_) => ({ ...state_, file }));
    read(file);
  };

  useEffect(() => {
    if (url) setImageSrc(url);
  }, [url]);

  const { openGallery } = useFancyboxGallery();

  console.log(inputs);

  return (
    <div className={classes.pageItemCreate}>
      <UserNavigation />
      <Container>
        <Row>
          <Col xs={12} lg={{ offset: 1, span: 10 }}>
            <Card className="rounded-0 border-0 shadow-lg overflow-hidden">
              <Card.Header className="border-bottom-0 d-flex justify-content-between align-items-center bg-white">
                <h4 className="d-flex align-items-center text-primary p-0 m-0">
                  <img
                    style={{
                      height: 18,
                    }}
                    src={iconEditItem}
                    alt="postavi oglas"
                  />
                  <span className="opacity-50 ms-3 pb-1">{headerMessage}</span>
                </h4>
                <FormCreatePostControls
                  onClick={{
                    x: navigateToDashboard,
                    help: (evt) =>
                      openGallery(
                        [
                          {
                            src: imageUploadHelpStep01,
                            caption: "Naslov treba da bude kratak i precizan da bi se lako pojavio u pretrazi.",
                          },
                          {
                            src: imageUploadHelpStep02,
                            caption: "Sadržaj oglasa može da bude opširan i da sadrži ključne reči.",
                          },
                          {
                            src: imageUploadHelpStep03,
                            caption: "Ovde izaberite prateću sliku koja ide uz vaš oglas.",
                          },
                          {
                            src: imageUploadHelpStep04,
                            caption: "Proverite kako će izgledati ceo oglas pre nego ga postavite.",
                          },
                          {
                            src: imageUploadHelpStep05,
                            caption: "Ako ste zadovoljni, ovde postavljate oglas. Nakon postavljanja odmah je otvoren za pretragu i pregled.",
                          },
                        ],
                        {
                          Toolbar: {
                            display: [
                              { id: "counter", position: "left" },
                              "close",
                            ],
                          },
                        }
                      ),
                  }}
                />
              </Card.Header>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "4fr 6fr",
                  minHeight: 345,
                  maxHeight: 422,
                }}
                className="ps-2"
              >
                <div>
                  <Card.Img
                    style={{
                      objectFit: "cover",
                    }}
                    className={`--rounded-0 h-100 --img-thumbnail ${classes.uploadImage}`}
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
                            <Button
                              onClick={handleModalShow}
                              type="button"
                              variant="secondary"
                            >
                              Pregled
                            </Button>
                            <Button type="button" variant="primary">
                              Postavi oglas
                            </Button>
                          </ButtonGroup>
                        </div>
                      </Stack>
                    </Form>

                    <Modal
                      scrollable={true}
                      fullscreen="sm-down"
                      show={modalShow}
                      onHide={handleModalClose}
                    >
                      <Modal.Header className="justify-content-center border-bottom-0">
                        <Modal.Title>Moj Oglas</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Repellendus dicta neque maxime veniam, sunt
                          itaque nobis adipisci iusto autem similique, ab totam
                          nam qui nesciunt eveniet rerum illum. Labore, illum?
                        </p>
                        <p>
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Repellendus dicta neque maxime veniam, sunt
                          itaque nobis adipisci iusto autem similique, ab totam
                          nam qui nesciunt eveniet rerum illum. Labore, illum?
                        </p>
                      </Modal.Body>
                      <Modal.Footer className="border-top-0">
                        <Button
                          className="px-4"
                          size="lg"
                          variant="secondary"
                          onClick={handleModalClose}
                        >
                          Hvala
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
                </div>
              </div>

              <Card.Footer className="border-top-0 bg-white text-center">
                {/* <InputUpload />  */}
                new
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
