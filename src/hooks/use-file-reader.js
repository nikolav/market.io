import { useState } from "react";

// const readURL = file => {
//     return new Promise((res, rej) => {
//         const reader = new FileReader();
//         reader.onload = e => res(e.target.result);
//         reader.onerror = e => rej(e);
//         reader.readAsDataURL(file);
//     });
// };

function useFileReader() {
  let reader;

  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [url,     setUrl]     = useState(null);

  return [read, { error, loading, url }];

  //
  function read(file) {
    try {
      setLoading(true);
      reader = new FileReader();

      reader.addEventListener("error", loading_);
      reader.addEventListener("load", loading_);

      reader.readAsDataURL(file);
    } catch (error_) {
      setError(error_);
    } finally {
      setLoading(false);
    }
  }
  //
  function loading_(evt) {
    const reader_ = evt.target;

    if ("error" === evt.type) {
      setError(reader_.error);
    } else {
      setUrl(reader_.result);
    }

    reader_.removeEventListener("error", loading_);
    reader_.removeEventListener("load", loading_);
  }
}

export default useFileReader;
