import React from "react";

import css from "./ItemsDataRow.module.css";
import formatedDate from "../util/formated-date.js";

import { imagePreload } from "../util/image-preload.js";

const formatedTitle 
  = title => String(title).substring(0, 48);

const ItemsDataRow = ({ item, handlePreview, handleActivePost }) => {
  const { _id, title, description, image, createdAt } = item;

  const previewItem = (item, evt) => handlePreview(item);
  const inputChange = (item, evt) => handleActivePost(item);
  
  return (
    <tr
      onMouseEnter={imagePreload.bind(null, image)}
    >
      <td colSpan="row">
        <input
          onChange={inputChange.bind(null, item)}
          className={css.radio}
          type="radio"
          name="post"
          id={title}
        />
      </td>
      <td>
        <strong
          onClick={previewItem.bind(null, item)}
          className={`cursor-pointer ${css.title}`}>{formatedTitle(title)}</strong>
      </td>
      <td>{formatedDate(createdAt)}</td>
    </tr>
  );
};

export default ItemsDataRow;
