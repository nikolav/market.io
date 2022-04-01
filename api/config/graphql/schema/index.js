
const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type User {
        _id: ID!
        name: String!
        email: String!
        createdAt: String
        items: [Item!]!
    }
    type Item {
        _id: ID!
        title: String!
        description: String
        image: String
        createdAt: String
        updatedAt: String
        user: User!
    }

    type Query {
        users: [User!]!
        user(_id:ID!): User
        items: [Item!]!
        item(_id:ID!): Item
        itemsByUser(user:ID!): [Item!]!
        countUsers: Int!
        countItems: Int!
        countUserItems(_id:ID!): Int!
        searchItems(term: String!): [Item!]!
    }
    type Mutation {
        createItem(user: ID!, title: String!, description: String, image: String): Item!
        editItem(post:ID!, title: String!, description: String, image: String): Item
        dropItem(_id:ID!): Item
    }

`);
