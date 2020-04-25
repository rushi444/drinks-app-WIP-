import { gql } from 'apollo-boost';

export const GET_DRINKS_QUERY = gql`
  query {
    recipes {
      id
      name
      numberOfLikes
      imageUrl
      createdBy {
        name
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      name
      email
    }
  }
`;

export const LOGIN = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        name
      }
      token
    }
}
`

export const ME_QUERY = gql`
  query {
    me {
      id
      name
    }
  }
`;