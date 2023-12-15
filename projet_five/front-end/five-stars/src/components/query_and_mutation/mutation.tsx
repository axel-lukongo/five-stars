import { gql } from '@apollo/client';
export const CREATE_USER = gql`
  mutation CreateUser($firstname: String!, $lastname: String!, $username: String!, $password: String!) {
    creatUser(Firstname: $firstname, Lastname: $lastname, Pseudo: $username, Password: $password, Age: 25)
  }
`;
