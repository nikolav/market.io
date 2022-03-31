import React from "react";

const ButtonUpload = React.forwardRef(({ id, name, classNames, onChange, children }, fileRef) => {
  // classNames { label, input }
  
  return (
    <label
      className={`btn btn-secondary btn-lg ${classNames.label}`}
      htmlFor={id}
    >
      {children}
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
