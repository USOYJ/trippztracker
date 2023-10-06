import { gql } from '@apollo/client';

export const GetDestination = gql`
  query Query($destinationId: ID!) {
    destination(destinationId: $destinationId) {
      _id
      presentLocation
      destination
    }
  }
`;

export const ME = gql` 
  query Query {
    me {
      _id
      username
      email
      password
      destinations {
        _id
        presentLocation
        destination
      }
    }
  }
`;
