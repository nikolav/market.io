import React, { useEffect } from "react";

import { gql, useQuery } from "@apollo/client";

const QUERY = gql`
  query QUERY {
    items {
      title
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(QUERY);

  return (
    <div>
      <h1 className="display-4">Users: </h1>
      {!(loading || error) && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default UsersList;
