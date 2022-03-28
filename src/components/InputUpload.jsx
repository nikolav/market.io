import React, { useEffect } from "react";
import { Form } from "react-bootstrap";
import useFirebaseStorageUpload from "../hooks/use-firebase-storage-upload";

const InputUpload = () => {
  const { upload, status } = useFirebaseStorageUpload();

  useEffect(() => console.log(status.downloadURL), [status.downloadURL]);

  const handleFileChange = async ({ target }) => {
    const file = target.files[0];

    upload(file, `${Date.now()}--${file.name}`);
  };

  const ignore = (evt) => evt.preventDefault();
  return (
    <Form onSubmit={ignore}>
      <label className="btn btn-secondary btn-sm" htmlFor="marketio-file-upload">
        Izaberi
        <input
          onChange={handleFileChange}
          className="visually-hidden"
          type="file"
          name="marketio-file-upload"
          id="marketio-file-upload"
        />
      </label>
    </Form>
  );
};

export default InputUpload;
