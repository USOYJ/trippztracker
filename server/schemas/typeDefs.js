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
    location: String
    departure: String
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
    addDestination(location: String!, departure: String!): Destination
    addUser(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    removeDestination(destinationId: ID!): Destination
    updateDestination(destinationId: ID!, location: String, departure: String): Destination
  }
`;

module.exports = typeDefs;


