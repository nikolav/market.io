import { useEffect, useState } from "react";

const useHttpCheckStatus = (url) => {
  
  const [creds, setCreds] = useState({
    email        : null, 
    password     : null
  });

  const [status, setStatus] = useState(() => ({
    error   : null, 
    loading : null,
    data    : null }));

  useEffect(() => {
    
    const fetch_ = async () => {
      
      try {

        setStatus(s => ({...s, error: null, loading: true, data: null}));

        const response = await fetch(url, {
            method  : "POST", 
            headers : { "Content-Type": "application/json" }, 
            body    : JSON.stringify(creds) });

        if (!response.ok)
          return setStatus(s => 
            ({...s, error: response, data: null}));
        
        const data = await response.json();

        setStatus(s => ({...s, error: null, data}));

      } catch (error) {
        setStatus(s => ({...s, error, data: null}));
      } finally {
        setStatus(s => ({...s, loading: false}));
      }
    };

    if (creds.email && creds.password)
      fetch_();

  }, [url, creds]);

  return [status, setCreds];
};

export default useHttpCheckStatus;
