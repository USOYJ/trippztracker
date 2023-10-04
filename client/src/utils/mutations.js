import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_DESTINATION = gql`
  mutation addDestination($destinationText: String!) {
    addDestination(destinationText: $destinationText) {
      _id
      presentLocation
      destination
    }
  }
`;

export const UPDATE_DESTINATION = gql`
  mutation updateDestination($destinationId: ID!, $destinationText: String!) {
    updateDestination(destinationId: $destinationId, destinationText: $destinationText) {
      _id
      presentLocation
      destination
    }
  }
`;

export const REMOVE_DESTINATION = gql`
  mutation removeDestination($destinationId: ID!) {
    removeDestination(destinationId: $destinationId) {
      _id
      presentLocation
      destination
    }
  }
`;
