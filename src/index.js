import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./app/store";

// https://www.apollographql.com/docs/react/get-started#2-initialize-apolloclient
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import "./index.css";
import "./theme/bootstrap.css";
import "bootstrap";

import Root from "./Root";

import {
  QueryClientProvider,
  QueryClient,
  useQuery,
  queryCache,
} from "react-query";
function App() {
  const qry = useQuery(
    "items",
    () => fetch("https://nikolav.rs/api/data").then(res => res.json()),
    {

    }
  );

  return <pre>{JSON.stringify(qry, null, 2)}</pre>;
}

const client = new ApolloClient({
  uri: "http://localhost:3112/graphql",
  cache: new InMemoryCache(),
});

// #directly
// client.query({ query })
//   .then(res => handle(res));

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Root />
    </ApolloProvider>
  </Provider>,
  document.getElementById("root")
);

// const qclient = new QueryClient();
// ReactDOM.render(
//   <QueryClientProvider client={qclient}>
//     <App />
//   </QueryClientProvider>,
//   document.getElementById("root")
// );
