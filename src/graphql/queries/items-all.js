import { gql } from "@apollo/client";

export const Q_ITEMS_ALL = gql`
  query Q_ITEMS_ALL {
    items {
      _id
      title
      description
      image
      createdAt
      user {
        name
        email
      }
    }
  }
`;
