const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    destinations: [Destination]!
  }

  type Destination {
    _id: ID
    presentLocation: String
    destination: String
  }

  type AuthPayload {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    destinations: [Destination]
    destination(destinationId: ID!): Destination
  }

  type Mutation {
    addDestination( presentLocation: String!,  destination: String!): Destination
    addUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    removeDestination(destinationId: ID!): Destination
    updateDestination(destinationId: ID!, presentLocation: String,  destination: String): Destination
  }
`;

module.exports = typeDefs;

