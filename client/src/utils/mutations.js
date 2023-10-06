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
mutation Mutation($location: String!, $departure: String!) {
  addDestination(location: $location, departure: $departure) {
    _id
    location
    departure
  }
}
`;

export const UPDATE_DESTINATION = gql`
  mutation updateDestination($destinationId: ID!, $location: String!, $departure: String!) {
    updateDestination(thoughtId: $destinationId, location: $location, departure: $departure) {
      _id
      location
      departure
    }
  }
`;

export const REMOVE_DESTINATION = gql`
  mutation removeDestination($destinationId: ID!) {
    removeDestination(destinationId: $destinationId) {
      _id
      location
      departure
    }
  }
`;



