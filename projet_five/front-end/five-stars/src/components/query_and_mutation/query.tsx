import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query {
    getUsers {
      id
      firstname
      lastname
    }
  }
`;

// query{
//   getUser(id: 3){
//     lastname
//   }
// }


export const GET_USER = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      lastname
      pseudo
    }
  }
`;

export const GET_PROFILE_USER = gql`
  query GetUser($id: Int!) {
    getUser(id: $id) {
      lastname
      firstname
      pseudo
    }
  }
`;
