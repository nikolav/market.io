
import { useState } from "react";


// MAX_COOKIE_LENGTH ~4k
export const CONFIG = {
  domain   : null,
  path     : "/",
  expires  : 30, // days
  Secure   : null,
  SameSite : "Strict",
};

function useCookieStorage(config = null) {

  config = { ...CONFIG, ...(config || {}) };


  const [cookie, setCookieRepo] = useState(() => {
    return document.cookie 
      ? eachCookie(function (key, value) { this[key] = value; })
      : {};
  });
  
  return { 
    cookie, 
    manage: {
      set: setCookie, 
      rm : removeCookie,
    }};


  //
  function setCookie(name, value) {
    if (name && value) {
      value += "";
      // run single async batch
      setTimeout(() => {
        setDocumentCookie(name, value);
        setCookieRepo(cookie => ({ ...cookie, [name]: value }));
      });
    }
  }
  function setDocumentCookie(name, value, opts = config) {
    const ttl = new Date(Date.now() + 86400000 * parseFloat(opts.expires));

    document.cookie = ([
      name, "=", encodeURIComponent(value),
      opts.domain   ? ";domain="   + opts.domain     : "",
      opts.path     ? ";path="     + opts.path       : "",
      opts.expires  ? ";expires="  + ttl.toUTCString() : "",
      opts.Secure   ? ";Secure"                        : "",
      opts.SameSite ? ";SameSite=" + opts.SameSite   : "",
    ]).join("");
  }
  function removeCookie (name) {
    if (name in cookie) {
      // run single async batch
      setTimeout(() => {
        setDocumentCookie(name, "", { expires: -1 });
        setCookieRepo(cookie => {
          let newCookie = { ...cookie };
          delete newCookie[name];
          return newCookie;
        });
      });
    }
  }
  
}

export default useCookieStorage;


//
function eachCookie(callback, context = {}) {
  ("" + document.cookie)
    .split(/\s*;\s*/g)
    .forEach(parts => {
      let [key, value] = parts.split("=");
      callback.call(context, key, decodeURIComponent(value));
    });

  return context;
}
