import { gql } from '@apollo/client';
import axios from 'axios'; 


export const GET_WEATHER = gql`
  query GetWeather($presentLocation: String!) {
    getWeather(location: $presentLocation) {
      temperature
      conditions
    }
  }
`;


// Function to fetch weather data using the query
export async function fetchWeather(presentLocation) {
  try {
    const response = await axios.post('https://your-graphql-api-url.com/graphql', {
      query: GET_WEATHER,
      variables: {
        presentLocation: presentLocation,
      },
    });

    // Handle the response here, e.g., return data or log it
    return response.data.data.getWeather;
  } catch (error) {
    // Handle errors here
    console.error('GraphQL Error:', error);
    throw error;
  }
}
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

