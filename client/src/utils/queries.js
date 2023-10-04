import { gql } from '@apollo/client';

export const QUERY_DESTINATIONS = gql`
  query getDestinations {
    destinations {
      user {
        destinations {
          _id
          destination
          presentLocation
        }
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      destinations {
        _id
        destination
        presentLocation
      }
    }
  }
`;

export const QUERY_DESTINATION = gql`
  query getDestinations {
    destinations {
      _id
      destination
      presentLocation
    }
  }
`;

export const QUERY_SINGLE_DESTINATION = gql`
  query getSingleDestination($destinationId: ID!) {
    destination(destinationId: $destinationId) {
      _id
      destination
      presentLocation
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
