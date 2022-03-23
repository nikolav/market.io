import React from "react";
import { useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";

const Quser = gql`
  query Quser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      items {
        id
        title
        description
      }
    }
  }
`;
const Qall = gql`
  query Qall {
    users {
      id
      name
      email
      passwordHash
    }
  }
`;

const UsersList = () => {

  const { user } = useSelector(state => state.auth);

  const q  = useQuery(Quser, {variables: { id: user.id }});
  // const q2 = useQuery(Q2, { variables: { id } });

  return (
    <div>
      <h1 className="display-4">User: </h1>
      {/* {!(q2.loading || q2.error) && <pre>{JSON.stringify(q2.data, null, 2)}</pre>} */}
      {!(q.loading || q.error) && <pre>{JSON.stringify(q.data, null, 2)}</pre>}
    </div>
  );
};

export default UsersList;
