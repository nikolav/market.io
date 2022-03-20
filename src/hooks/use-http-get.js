import { useEffect, useState } from "react";

const useHttpGet = ({ url }) => {
  const [response, setResponse] = useState(() => ({
    loading: 0,
    error: null,
    data: null,
    url,
  }));

  useEffect(() => {
    const fetch_ = async () => {
      try {

        setResponse((r) => ({ ...r, loading: 1 }));

        const response = await fetch(url);

        // if (!response.ok) return;
        const data = await response.json();

        setResponse((r) => ({ ...r, data }));
      } catch (error) {

        setResponse((r) => ({ ...r, error }));
      } finally {
        
        setResponse((r) => ({ ...r, loading: 0 }));
      }
    };

    fetch_();
  }, [url]);

  return response;
};

export default useHttpGet;
