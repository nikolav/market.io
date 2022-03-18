
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./app/store";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import "./theme/bootstrap.css";
import "bootstrap";

import App from "./App";

  const client = new ApolloClient({
    uri   : "http://localhost:3111/graphql",
    cache : new InMemoryCache(),
  });
  
  ReactDOM.render(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </Provider>,
    document.getElementById("root")
  );

