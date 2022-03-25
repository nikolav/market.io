import React, { useEffect } from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
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
    <div className="mx-auto w-50">
      <Form onSubmit={ignore}>
        <InputGroup className="mb-3">
          <FormControl onChange={handleFileChange} type="file" />
          <InputGroup.Text>file.com</InputGroup.Text>
        </InputGroup>
      </Form>
    </div>
  );
};

export default InputUpload;
