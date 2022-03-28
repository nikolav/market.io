import React from "react";

const ButtonUpload = ({ id, name, label, classNames, onChange }) => {
  // classNames { label, input }
  return (
    <label
      className={`btn btn-secondary btn-lg d-inline-block ${classNames.label}`}
      htmlFor={id}
    >
      <span>{label}</span>
      <input
        id={id}
        name={name}
        onChange={onChange}
        type="file"
        className={`visually-hidden ${classNames.input}`}
      />
    </label>
  );
};

export default ButtonUpload;
