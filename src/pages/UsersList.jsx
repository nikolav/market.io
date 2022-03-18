import React from "react";

import { gql, useQuery } from "@apollo/client";

const UsersQuery = gql`
  query UsersQuery {
    users {
      name
    }
  }
`;

const UsersList = () => {
  const { loading, error, data } = useQuery(UsersQuery);

  return (
    <div>
      <h1 className="display-4">Users: </h1>
      <ul className="d-flex flex-column list-unstyled">
        {
        !(loading || error)
        && data.users.map((u) => (
          <li key={u.name}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
