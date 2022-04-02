import { gql } from "@apollo/client";

export const Q_COUNT_USER_ITEMS = gql`
  query Q_COUNT_USER_ITEMS($user: ID!) {
    countUserItems(user: $user)
  }
`;
