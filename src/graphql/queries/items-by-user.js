
import {gql} from "@apollo/client";

export const Q_ITEMS_BY_USER = gql`
  query Q_ITEMS_BY_USER($id: ID!) {
    itemsByUser(user: $id) {
      _id
      title
      description
      image
      createdAt
    }
  }
`;
