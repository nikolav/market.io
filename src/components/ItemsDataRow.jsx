import React from "react";

import css from "./ItemsDataRow.module.css";

const ItemsDataRow = ({ item, handlePreview, handleActivePost }) => {
  const { _id, title, description, image, createdAt } = item;

  const previewItem = (item, evt) => handlePreview(item);
  const inputChange = (item, evt) => handleActivePost(item);
  
  return (
    <tr>
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
          className={`cursor-pointer ${css.title}`}>{title}</strong>
      </td>
      <td>{createdAt}</td>
    </tr>
  );
};

export default ItemsDataRow;
