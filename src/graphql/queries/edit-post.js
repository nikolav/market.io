import { gql } from "@apollo/client";

// editItem(user:ID!, title: String!, description: String, image: String): Item
export const M_ITEM_EDIT = gql`
  mutation M_ITEM_EDIT(
    $post: ID!
    $title: String!
    $description: String
    $image: String
  ) {
    editItem(
      post: $post
      title: $title
      description: $description
      image: $image
    ) {
      _id
      title
      description
      image
      createdAt
      updatedAt
    }
  }
`;
