import { gql } from "@apollo/client";

export const Q_ITEM_CREATE = gql`
  mutation Q_ITEM_CREATE(
    $user: ID!
    $title: String!
    $description: String
    $image: String
  ) {
    createItem(
      user: $user
      title: $title
      description: $description
      image: $image
    ) {
      _id
      createdAt
    }
  }
`;
