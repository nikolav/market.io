import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./app/store";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import "./theme/bootstrap.css";
import "bootstrap";

import Root from "./Root";

const client = new ApolloClient({
  uri: "http://localhost:3112/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);
