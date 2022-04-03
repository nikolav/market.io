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

// import {
//   QueryClientProvider,
//   QueryClient,
//   useQuery,
//   useMutation, // can set options; { onSuccess -> use queryCache{} to invalidate/update cache }
//   usePaginatedQuery, // keep old data until new is fetching { .resolvedData .latestData{.nextPageOffset}}
//   useInfiniteQuery,
//   queryCache,
// } from "react-query";

const client = new ApolloClient({
  // uri: "http://localhost:3112/graphql",
  uri: "http://127.0.0.1:3112/graphql",
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

// const qclient = new QueryClient();
// ReactDOM.render(
//   <QueryClientProvider client={qclient}>
//     <App />
//   </QueryClientProvider>,
//   document.getElementById("root")
// );

// function App() {

//   const QUERY_CONFIG = {
//     // how oftern to refresh data
//     staleTime: 12345,

//     // ttl for cached/hiden query
//     // for memcached data thats not displaying
//     cacheTime: 5 * 60 * 1000,

//     // how many times to retry failed query
//     retry: 2, // number | boolean | 0

//     // // enable dependent queries
//     // // dependent queries start in .isIdle state
//     enabled: true, // boolean

//     // use existing query data seed
//     initialData: [], // any

//     //   queryCache { 
//       //   .getQueryData() 
//       //   .setQueryData() 
//       //   .invalidateQueries() 
//       //   .prefetchQuery() 
//       // }
//     // initialData: () => queryCache.getQueryData("posts"),
//     // show initial data but fetch asap
//     initialStale: true,

//     // poll interval [ms]
//     refetchInterval: 22222,
//   };


//   const qry = useQuery(
//     // binds a name to query dataset
//     // for optimal data caching bind one name to a resource for multilple instances sourcing the same data
//     // "users",
//     ["users", "admin"],

//     () => fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) => res.json()),

//     QUERY_CONFIG
//   );

//   return <pre>{JSON.stringify(qry, null, 2)}</pre>;
// }
