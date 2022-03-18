import React from "react";

import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query QUERY {
    items {
      title
      author {
        name
      }
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(QUERY);

  return (
    <div>
      <h1 className="display-4">Users: </h1>
      {!(loading || error) && <pre>{JSON.stringify(data.items, null, 2)}</pre>}
    </div>
  );
};

export default UsersList;
