import React from "react";

import css from "./ItemsDataRow.module.css";

const ItemsDataRow = ({ item, index }) => {
  const { _id, title, description, image, createdAt } = item;

  const handleRadio = (_id, evt) => {};

  return (
    <tr>
      <td colSpan="row">
        <input
          className="bg-primary"
          onChange={handleRadio.bind(null, _id)}
          type="radio"
          name="post"
          id={title}
        />
      </td>
      <td>
        <strong className={`cursor-pointer ${css.title}`}>{title}</strong>
      </td>
      {/* <td>{description}</td>
      <td>{image}</td> */}
      <td>{createdAt}</td>
      {/* <td>komande</td> */}
    </tr>
  );
};

export default ItemsDataRow;
