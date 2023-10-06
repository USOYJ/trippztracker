import { gql } from '@apollo/client';

export const Get_Destination = gql`
query Query($destinationId: ID!) {
  destination(destinationId: $destinationId) {
    _id
    location
    departure
  }
}`

export const ME = gql ` 
query Query {
  me {
    _id
    username
    email
    password
    destinations {
      _id
      location
      departure
    }
  }
}`