import { gql } from "@apollo/client";

export const Q_TEXT_SEARCH = gql`
  query Q_TEXT_SEARCH($term: String!) {
    searchItems(term: $term) {
      _id
      title
      description
      image
      createdAt
      updatedAt
      user {
        name
        email
      }
    }
  }
`;
