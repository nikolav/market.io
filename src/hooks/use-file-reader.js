import { useState } from "react";


// 1. create FileReader{}
// 2. add status listeners
// 3. @load|@error signal
// 4. cleanup
function useFileReader() {
  let reader;

  const [error,   setError]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [url,     setUrl]     = useState(null);

  return [read, { error, loading, url }];

  // 
  function read(file) {
    try {
      reset_();
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
  function reset_ () {
    setError(null);
    setLoading(false);
    setUrl(null);
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

    setLoading(false);
  }

}

export default useFileReader;
