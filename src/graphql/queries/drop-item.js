
import { gql } from "@apollo/client";

export const M_ITEM_DROP = gql`
  mutation M_ITEM_DROP ($id: ID!) {
    dropItem (_id: $id) {
        _id
        title
        description
        image
        createdAt
    }
  }
`;
