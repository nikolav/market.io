import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  Toast,
  ToastContainer,
} from "react-bootstrap";
import useFancyboxGallery from "../hooks/use-fancybox-gallery";
import ButtonUpload from "../components/ButtonUpload/ButtonUpload";
import FormCreatePostControls from "../components/FormCreatePostControls/FormCreatePostControls";

// import Spinner from "../components/Spinner/Spinner";

import classes from "./ItemCreate.module.css";

import useFileReader from "../hooks/use-file-reader";

import iconCreateItem from "../theme/etc/icon-post-create.svg";
import iconDeleteWhiteShadowSm from "../theme/etc/icon-delete-white-shadow-sm.svg";
import iconCloudUpload from "../theme/etc/icon-cloud-upload.svg";
import iconViewPrimary from "../theme/etc/icon-view-primary.svg";

import imageUploadHelpStep01 from "../theme/etc/post-help-step-01.jpg";
import imageUploadHelpStep02 from "../theme/etc/post-help-step-02.jpg";
import imageUploadHelpStep03 from "../theme/etc/post-help-step-03.jpg";
import imageUploadHelpStep04 from "../theme/etc/post-help-step-04.jpg";
import imageUploadHelpStep05 from "../theme/etc/post-help-step-05.jpg";

import useFirebaseStorageUpload from "../hooks/use-firebase-storage-upload";

import { useMutation } from "@apollo/client";
import { Q_ITEM_CREATE } from "../graphql/queries/create-post.js";

const ERROR_WRONG_FILE_TYPE = "Izaberite sliku ( jpg, png, ... )";
const DEFAULT_HEADER_MESSAGE = "Novi oglas";

const formatHeaderMessage = (header) => `${String(header).substring(0, 32)}...`;
const isImage = (path) => /jpe?g|png|gif|svg/i.test(path);

// no end slash !
const UPLOAD_PATH_STORAGE = "etc/app-upload";

const formatUploadPath = (filename) =>
  `${UPLOAD_PATH_STORAGE}/${Date.now()}.${filename}`;

// @c
const ItemCreate = () => {
  const { user } = useSelector((state) => state.auth);

  const [inputs, setInputs] = useState({
    title: "",
    file: null, // file{}
    description: "",
  });

  const [headerMessage, setHeaderMessage] = useState(DEFAULT_HEADER_MESSAGE);
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
    if (!isImage(Object(file).type))
      return setHeaderMessage(ERROR_WRONG_FILE_TYPE);

    read(file);
    setHeaderMessage(formatHeaderMessage(file.name));
    setInputs((state_) => ({ ...state_, file }));
  };

  useEffect(() => {
    if (url) setImageSrc(url);
  }, [url]);

  const fileRef = React.createRef();
  const resetFileInput = () => (fileRef.current.value = null);

  const clearUploadImage = (evt) => {
    setInputs((old) => ({ ...old, file: null }));
    resetFileInput();
    setImageSrc(null);
    setHeaderMessage(DEFAULT_HEADER_MESSAGE);
  };

  const { openGallery } = useFancyboxGallery();

  const oglasiHelp = [
    {
      src: imageUploadHelpStep01,
      caption:
        "Naslov treba da bude kratak i precizan da bi se lako pojavio u pretrazi.",
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
      caption:
        "Ako ste zadovoljni, ovde postavljate oglas. Nakon postavljanja odmah je otvoren za pretragu i pregled.",
    },
  ];

  const {
    upload,
    status: { error, state, progress, downloadURL },
  } = useFirebaseStorageUpload();

  const [postSaved, setPostSaved] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // 1. upload image 1st
    // 2. on success save db record
    // 3. notify user
    upload(inputs.file, formatUploadPath(inputs.file.name));
  };

  const [createPost, createPostStatus] = useMutation(Q_ITEM_CREATE);

  useEffect(() => {
    if (!error && 100 === progress && downloadURL) {
      createPost({
        variables: {
          user: user._id,
          title: inputs.title,
          image: downloadURL,
          description: inputs.description,
        },
      });
    }
  }, [error, state, progress, downloadURL]);

  const [toastSuccess, setToastSuccess] = useState(false);
  const toastSuccessOpen = () => setToastSuccess((_) => true);
  const toastSuccessClose = () => setToastSuccess((_) => false);

  useEffect(() => {
    setPostSaved((_) => false);
    if (
      !(createPostStatus.error || createPostStatus.loading) &&
      createPostStatus.data
    ) {
      // post saved, show success toast
      setPostSaved((_) => true);
      console.log(createPostStatus.data.createItem);
    }
  }, [createPostStatus]);

  useEffect(() => {
    if (postSaved) {
      toastSuccessOpen();
    }
  }, [postSaved]);

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
                      height: 32,
                    }}
                    src={iconCreateItem}
                    alt="postavi oglas"
                  />
                  <span className="opacity-50 ms-3 pb-1">{headerMessage}</span>
                </h4>
                <FormCreatePostControls
                  onClick={{
                    x: navigateToDashboard,
                    help: (evt) => {
                      evt.preventDefault();
                      return openGallery(oglasiHelp, {
                        Toolbar: {
                          display: [
                            { id: "counter", position: "left" },
                            "close",
                          ],
                        },
                      });
                    },
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
                className="ps-2 pb-2"
              >
                <div
                  className={`position-relative ${classes.uploadImageContainer}`}
                >
                  {imageSrc && (
                    <span
                      className={`position-absolute cursor-pointer p-2 top-0 end-0 ${classes.uploadImageClear}`}
                    >
                      <img
                        onClick={clearUploadImage}
                        style={{
                          width: 25,
                        }}
                        className="cursor-pointer img-fluid"
                        src={iconDeleteWhiteShadowSm}
                        alt=""
                      />
                    </span>
                  )}
                  {imageSrc && (
                    <Card.Img
                      style={{
                        objectFit: "cover",
                      }}
                      className={`upload-image --rounded-0 h-100 --img-thumbnail ${classes.uploadImage}`}
                      variant="top"
                      src={imageSrc}
                    />
                  )}
                </div>

                <div>
                  <Card.Body className="px-md-4">
                    <Form
                      className={classes.formNovOglas}
                      onSubmit={handleSubmit}
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
                        <ButtonGroup>
                          <ButtonUpload
                            ref={fileRef}
                            id="file"
                            name="file"
                            onChange={syncFile}
                            classNames={{ label: "me-auto" }}
                            >
                            <i className="fs-2 text-primary fa-solid fa-camera-retro"></i>
                          </ButtonUpload>
                          <Button
                            onClick={handleModalShow}
                            type="button"
                            variant="secondary"
                          >
                            <img style={{ height: 20 }} src={iconViewPrimary} alt="" />
                          </Button>
                        </ButtonGroup>
                        <Button
                          size="lg"
                          className="ms-auto d-flex align-items-center"
                          type="submit"
                          variant="primary"
                        >
                          <img
                            style={{
                              width: 33,
                            }}
                            className="me-3 img-fluid"
                            src={iconCloudUpload}
                            alt=""
                          />{" "}
                          Postavi oglas
                        </Button>
                      </Stack>
                    </Form>
                    <ToastContainer
                      className={classes.toastSuccess}
                      position="top-center"
                    >
                      <Toast
                        autohide={true}
                        style={{
                          width: 480,
                          maxWidth: "90%",
                        }}
                        show={toastSuccess}
                        onClose={toastSuccessClose}
                      >
                        <Toast.Header className="p-3" closeButton={false}>
                          <strong className="text-center d-inline-block fs-5 ms-2">
                            🥳👏🏼 Uspešno ste postavili oglas.
                          </strong>
                          <i
                            onClick={toastSuccessClose}
                            className="opacity-75 ms-auto p-2 fs-4 cursor-pointer text-primary fa-solid fa-xmark"
                          ></i>
                        </Toast.Header>
                      </Toast>
                    </ToastContainer>
                    <Modal
                      scrollable={true}
                      fullscreen="sm-down"
                      show={modalShow}
                      onHide={handleModalClose}
                    >
                      {/* <Modal.Header className="justify-content-center border-bottom-0">
                        <Modal.Title>Moj Oglas</Modal.Title>
                      </Modal.Header> */}
                      <Modal.Body>
                        <div className="d-flex flex-column">
                          {imageSrc && (
                            <img
                              style={{
                                maxHeight: 256,
                                objectFit: "contain",
                              }}
                              className="img-fluid align-self-start"
                              src={imageSrc}
                              alt=""
                            />
                          )}
                          <div>
                            <h2 className="mt-2">{inputs.title}</h2>
                            <p className="mt-2">{inputs.description}</p>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer className="border-top-0">
                        <Button
                          className="px-4"
                          size="lg"
                          variant="secondary"
                          onClick={handleModalClose}
                        >
                          OK
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
                </div>
              </div>

              {/* <Card.Footer className="border-top-0 bg-white text-center">
                new
              </Card.Footer> */}
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <Spinner /> */}
    </div>
  );
};

export default ItemCreate;
