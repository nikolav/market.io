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

import classes from "./ItemEdit.module.css";

import useFileReader from "../hooks/use-file-reader";
import iconItemEditOrange from "../theme/etc/icon-edit-item-orange.svg";
import iconViewPrimary from "../theme/etc/icon-view-primary.svg";
import iconDeleteWhiteShadowSm from "../theme/etc/icon-delete-white-shadow-sm.svg";
import iconRefreshCloud from "../theme/etc/icon-refresh-cloud.svg";

import imageHelpEdit01 from "../theme/etc/help-edit-post-step-01.jpg";
import imageHelpEdit02 from "../theme/etc/help-edit-post-step-02.jpg";
import imageHelpEdit03 from "../theme/etc/help-edit-post-step-03.jpg";
import imageHelpEdit04 from "../theme/etc/help-edit-post-step-04.jpg";
import imageHelpEdit05 from "../theme/etc/help-edit-post-step-05.jpg";
import imageHelpEdit06 from "../theme/etc/help-edit-post-step-06.jpg";
import imageHelpEdit07 from "../theme/etc/help-edit-post-step-07.jpg";

import useFirebaseStorageUpload from "../hooks/use-firebase-storage-upload";

import { useMutation } from "@apollo/client";
import { M_ITEM_EDIT } from "../graphql/queries/edit-post.js";

const ERROR_WRONG_FILE_TYPE = "Izaberite sliku (jpg, png)";
const DEFAULT_HEADER_MESSAGE = "Izmeni oglas";

const formatHeaderMessage = (header) => `${String(header).substring(0, 32)}...`;
const isImage = (path) => /jpe?g|png|gif|svg/i.test(path);

// no end slash !
const UPLOAD_PATH_STORAGE = "etc/app-upload";

const formatUploadPath = (filename) =>
  `${UPLOAD_PATH_STORAGE}/${Date.now()}.${filename}`;

// @c
const ItemEdit = () => {
  const { user } = useSelector((state) => state.auth);
  const { post } = useSelector((state) => state.main);

  // @todo
  // load post from state
  const [inputs, setInputs] = useState({
    title: "",
    file: null, // file{}
    description: "",
  });

  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    setInputs((_) => ({
      title: post.current.title,
      description: post.current.description,
    }));

    setImageSrc((_) => post.current?.image || null);
  }, []);

  const [headerMessage, setHeaderMessage] = useState(DEFAULT_HEADER_MESSAGE);

  const [modalShow, setModalShow] = useState(false);
  const handleModalClose = () => setModalShow((_) => false);
  const handleModalShow = () => setModalShow((_) => true);

  const [read, { url }] = useFileReader();

  const dispatch = useDispatch();
  const navigateToDashboard = () => dispatch(setSection(SECTIONS.dashboard));

  const syncInputs = (evt) =>
    setInputs((_) => ({ ..._, [evt.target.name]: evt.target.value }));

  const syncFile = (evt) => {
    const file = evt.target.files[0];

    // accept images only
    if (!isImage(Object(file).type))
      return setHeaderMessage(ERROR_WRONG_FILE_TYPE);

    read(file);
    setHeaderMessage(formatHeaderMessage(file.name));
    setInputs((_) => ({ ..._, file }));
  };

  useEffect(() => {
    if (url) setImageSrc((_) => url);
  }, [url]);

  const fileRef = React.createRef();
  const resetFileInput = () => (fileRef.current.value = null);

  const clearUploadImage = (evt) => {
    setInputs((_) => ({ ..._, file: null }));
    resetFileInput();
    setImageSrc((_) => null);
    setHeaderMessage(DEFAULT_HEADER_MESSAGE);
  };

  const { openGallery } = useFancyboxGallery();
  const oglasiHelp = [
    {
      src: imageHelpEdit01,
      caption:
        "Sa liste oglasa na glavnoj strani birate oglas koji želite da promenite...",
    },
    {
      src: imageHelpEdit02,
      caption: "Otvara se strana za izmene. Naslov može sadržati i Vaše kontak informacije.",
    },
    {
      src: imageHelpEdit03,
      caption: "Sadržaj može da ide sa dodatnim kontaktima za povratnu komunikaciju...",
    },
    {
      src: imageHelpEdit04,
      caption: "Ovde može da ide i nova slika ako stara ne odgovara...",
    },
    {
      src: imageHelpEdit05,
      caption:
        "Pre izmena obavezno proverite da li je sve kako treba...",
    },
    {
      src: imageHelpEdit06,
      caption:
        "Ako ste zadovolnji sačuvajte izmene i sačekajte povratne informacije od sistema...",
    },
    {
      src: imageHelpEdit07,
      caption:
        "Nakon toga novi oglas je odmah vidljiv, i pojaviće se na listi sa Vašim oglasima. 👍🏼😎",
    },
  ];

  const {
    upload,
    status: { error, state, progress, downloadURL },
  } = useFirebaseStorageUpload();

  // flags edit sccess
  const [postSaved, setPostSaved] = useState(null);

  // post{} to request update
  const [postUpdate, setPostUpdate] = useState(null);
  const handleSubmit = (evt) => {
    evt.preventDefault();

    // if image is edited upload new image
    //   get url + db save
    // if image is not updated skip to db save

    if (inputs.file)
      return upload(inputs.file, formatUploadPath(inputs.file.name));

    setPostUpdate((_) => ({
      post: post.current._id,
      title: inputs.title,
      image: post.current?.image || "",
      description: inputs?.description || "",
    }));
  };

  const [editPost, editPostStatus] = useMutation(M_ITEM_EDIT);

  useEffect(() => {
    if (!error && 100 === progress && downloadURL)
      setPostUpdate((_) => ({
        post: post.current._id,
        title: inputs.title,
        image: downloadURL,
        description: inputs.description,
      }));
  }, [error, state, progress, downloadURL]);

  useEffect(() => {
    if (!postUpdate) return;
    editPost({ variables: { ...postUpdate } });
  }, [postUpdate, editPost]);

  const [toastSuccess, setToastSuccess] = useState(false);
  const toastSuccessOpen = () => setToastSuccess((_) => true);
  const toastSuccessClose = () => setToastSuccess((_) => false);

  useEffect(() => {
    setPostSaved((_) => false);
    if (
      !(editPostStatus.error || editPostStatus.loading) &&
      editPostStatus.data
    ) {
      // post saved, show success toast
      setPostSaved((_) => true);
      // console.log(editPostStatus.data.editItem);
    }
  }, [editPostStatus]);

  useEffect(() => {
    if (postSaved) toastSuccessOpen();
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
                    src={iconItemEditOrange}
                    alt="izmeni"
                  />
                  <span className="opacity-50 ms-3 pb-1">{headerMessage}</span>
                </h4>
                <FormCreatePostControls
                  onClick={{
                    x: navigateToDashboard,
                    help: (evt) => {
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
                            <img
                              style={{ height: 20 }}
                              src={iconViewPrimary}
                              alt=""
                            />
                          </Button>
                        </ButtonGroup>

                        <Button
                          size="lg"
                          className="ms-auto pe-4 d-flex align-items-center"
                          type="submit"
                          variant="primary"
                        >
                          <img
                            style={{
                              width: 33,
                            }}
                            className="me-3 img-fluid"
                            src={iconRefreshCloud}
                            alt=""
                          />{" "}
                          Sačuvaj
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
                            👌🏼 Oglas je uspešno sačuvan.
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
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ItemEdit;
