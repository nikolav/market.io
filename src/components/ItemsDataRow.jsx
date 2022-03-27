import React from "react";

const ItemsDataRow = ({ item, index }) => {
  const { title, description, image, createdAt } = item;

  return (
    <tr>
      <td>{index}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{image}</td>
      <td>{createdAt}</td>
      <td>komande</td>
    </tr>
  );
};

export default ItemsDataRow;
