import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Card, Table } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

import { refresh, editPost } from "../features/main/main-slice.js";
import { setSection, SECTIONS } from "../features/sections/sections-slice.js";

import ItemsDataRow from "./ItemsDataRow";
import Spinner from "./Spinner/Spinner";

import { Q_ITEMS_BY_USER } from "../graphql/queries/items-by-user.js";
import {M_ITEM_DROP} from "../graphql/queries/drop-item.js";

import sortItemsByDateDesc from "../util/sort-items-by-date-desc.js";

import iconEditPost from "../theme/etc/icon-edit-item.svg";
import iconRefresh from "../theme/etc/icon-refresh.svg";
import iconDelete from "../theme/etc/icon-delete-2.svg";
import iconEdit from "../theme/etc/icon-edit.svg";
import iconView from "../theme/etc/icon-view.svg";

import css from "./ItemsDataGrid.module.css";

const HEADER_TITLE_DEFAULT = "Moji oglasi";
const formatedHeader_ = (header) => String(header).substring(0, 24) + " ...";

const ItemsDataGrid = ({ user }) => {
  // user { _id, name, email }

  const dispatch = useDispatch();

  const [items, setItems] = useState(null);

  // https://www.apollographql.com/docs/react/data/queries#refetching
  const {
    error,
    loading,
    data,
    // pollInterval,
    refetch,
    // networkStatus
  } = useQuery(Q_ITEMS_BY_USER, {
    variables: { id: user._id },
    pollInterval: 45678,
    // notifyOnNetworkStatusChange: boolean;
    //    uses .networkStatus to flag query net status
  });

  useEffect(() => {
    if (data?.itemsByUser?.length)
      setItems((items_) => sortItemsByDateDesc(data.itemsByUser));
  }, [data, error, loading]);

  const { lastRefreshAt } = useSelector((state) => state.main);
  useEffect(() => {
    lastRefreshAt && refetch();
  }, [refetch, lastRefreshAt]);

  const [modalShow, setModalShow] = useState(null);
  const handleModalClose = () => setModalShow((_) => false);
  const handleModalOpen = () => setModalShow((_) => true);

  const [previewPost, setPreviewPost] = useState(null);
  const handlePreviewPost = (item) => {
    if (item) setPreviewPost((_) => item);
  };
  const handlePreview = (item) => {
    handlePreviewPost(item);
    handleModalOpen();
  };

  const [activePost, setActivePost] = useState(null);
  const handleActivePost = (item) => {
    if (item) setActivePost((_) => item);
  };
  const formatedHeader = () =>
    formatedHeader_(activePost?.title || HEADER_TITLE_DEFAULT);

  const appRefresh = (evt) => dispatch(refresh());
  
  const navigateToItemEdit = 
    () => dispatch(setSection(SECTIONS["item-edit"]));
  const handleEditPost   = evt => {
    if (activePost) {
      // cache post{} and navigate @edit
      dispatch(editPost(activePost));
      navigateToItemEdit();
    }
  };

  const [deleted, setDeleted]  = useState(null);
  const [m_postDrop, m_Status] = useMutation(M_ITEM_DROP);
  const deletePost = () => {
    if (!activePost?._id) return;
    m_postDrop({
      variables: {
        id: activePost?._id || null,
      },  
    });
  };
  useEffect(() => {

    if (
      !(m_Status.error || m_Status.loading) 
      && m_Status.data) 
    {

      // cache deleted post
      // trigger post deleted, notify, update
      setDeleted(_ => m_Status.data.dropItem);
      console.log("@ItemsDataGrid");
      console.log(m_Status.data);

    }
  }, [m_Status]);

  useEffect(() => {
    if (deleted) {
      setActivePost(_ => null);
      appRefresh();
    }
  }, [deleted]);

  return items ? (
    <div className="rounded-2 data-grid-items shadow-lg pb-1">
      <Card className="rounded-0 border-0">
        <Card.Header className="d-flex align-items-center justify-content-between bg-primary text-white border-bottom-0">
          <strong className="ps-1 pt-2 text-white fw-bold h4 text-primary">
              <img
                className="opacity-75 me-4"
                style={{ 
                  height: 32,
                  visibility: activePost ? "visible" : "hidden",
                }}
                src={iconEditPost}
                alt=""
              />
            {formatedHeader()}
          </strong>

          <div>
            {activePost && (
              <>
                <img
                  onClick={handlePreview.bind(null, activePost)}
                  className={`cursor-pointer ${css.iconEditPost}`}
                  style={{ height: 22 }}
                  src={iconView}
                  title="pogledaj"
                  alt=""
                />
                <img
                  onClick={handleEditPost}
                  className={`ms-4 cursor-pointer ${css.iconEditPost}`}
                  style={{ height: 22 }}
                  src={iconEdit}
                  title="izmeni"
                  alt=""
                />
                <img
                  onClick={deletePost}
                  className={`ms-4 cursor-pointer ${css.iconEditPost}`}
                  style={{ height: 22 }}
                  src={iconDelete}
                  title="obriši"
                  alt=""
                />
              </>
            )}
            <img
              onClick={appRefresh}
              className={`me-2 ms-4 cursor-pointer ${css.iconEditPost}`}
              style={{ height: 22 }}
              src={iconRefresh}
              title="osveži listu"
              alt=""
            />
          </div>
        </Card.Header>
        <Table className="mb-0" striped borderless hover>
          <thead className="text-primary fst-italic opacity-50">
            <tr>
              <th>🚩</th>
              <th className="ps-sm-4">oglas</th>
              <th className="ps-sm-4">postavljen</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <ItemsDataRow
                handleActivePost={handleActivePost}
                handlePreview={handlePreview}
                key={item._id}
                item={item}
              />
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal
        scrollable={true}
        fullscreen="sm-down"
        show={modalShow}
        onHide={handleModalClose}
      >
        <Modal.Body>
          <div className="d-flex flex-column">
            {previewPost?.image && (
              <img
                style={{
                  height: 128,
                  maxHeight: 128,
                  objectFit: "contain",
                }}
                className="img-fluid align-self-start"
                src={previewPost.image}
                alt=""
              />
            )}
            <div>
              <h2 className="mt-2">{previewPost?.title || ""}</h2>
              <p className="mt-2">{previewPost?.description || ""}</p>
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
    </div>
  ) : (
    <Spinner />
  );
};

export default ItemsDataGrid;
