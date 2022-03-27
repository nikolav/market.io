import React from "react";
import { useSelector } from "react-redux";
import { gql, useQuery, useMutation } from "@apollo/client";

const Quser = gql`
  query Quser($id: ID!) {
    user(_id: $id) {
      _id
      name
      email
      createdAt
      items {
        _id
        title
        description
        image
        createdAt
      }
    }
  }
`;

const M_createItem = gql`

  mutation M_createItem($t: String!, $u: ID!) {
    createItem(title: $t, user: $u) {
      _id
    }
  }

`;

const UsersList = () => {

  const { user } = useSelector(state => state.auth);

  const q  = useQuery(Quser, { variables: { id: user._id }});
  const [addItem, { data }]  = useMutation(M_createItem);

  return (
    <div>
      <button onClick={() => 
        addItem({variables: {u: user._id, t: String(Math.random())}})}
      >add</button>
      <h1 className="display-4">User: </h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {!(q.loading || q.error) && <pre>{JSON.stringify(q.data, null, 2)}</pre>}
    </div>
  );
};

export default UsersList;
