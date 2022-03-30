import React from "react";

const ButtonUpload = React.forwardRef(({ id, name, label, classNames, onChange }, fileRef) => {
  // classNames { label, input }
  
  return (
    <label
      className={`btn btn-secondary btn-lg d-inline-block ${classNames.label}`}
      htmlFor={id}
    >
      <span>{label}</span>
      <input
        ref={fileRef}
        id={id}
        name={name}
        onChange={onChange}
        type="file"
        className={`visually-hidden ${classNames.input}`}
      />
    </label>
  );
});

export default ButtonUpload;
