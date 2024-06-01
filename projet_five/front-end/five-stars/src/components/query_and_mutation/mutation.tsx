import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $username: String!
    $password: String!
  ) {
    creatUser(
      Firstname: $firstname
      Lastname: $lastname
      Pseudo: $username
      Password: $password
      Age: 25
    )
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(Username: $username, Password: $password){
      user{
        id
        pseudo
        firstname
        lastname
        password
      }
      accessToken
    }
  }
`;


export const CREATE_TEAM = gql`
  mutation CreateTeam($ownerId: Int!, $teamName: String!) {
    createTeam(OwnerId: $ownerId, TeamName: $teamName)
  }
`;


export const CREATE_CHAT_ROOM = gql`
  mutation CreatChatRoom($userIdOne: Int!, $userIdTwo: String!) {
    creatChatRoom(UserIdOne: $userIdOne, UserIdTwo: $userIdTwo)
  }
`;


