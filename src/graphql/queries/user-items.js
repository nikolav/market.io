
import { gql } from "@apollo/client";

export const Q_USER_ITEMS = gql`
  query Q_USER_ITEMS($id: ID!) {
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
