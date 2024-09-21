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


export const GET_ALL_CHAT_ROOM = gql`
  query {
    getallChatRoom {
      id
      UserIdOne
      UserIdTwo
      interlocutorNameOne
      interlocutorNameTwo
    }
  }
`;


export const GET_ALL_MY_CHAT_ROOM = gql`
  query GetallMyChatRoom($UserId: Int!){
    getallMyChatRoom(UserId: $UserId) {
      id
      UserIdOne
      UserIdTwo
      interlocutorNameOne
      interlocutorNameTwo
    }
  }
`;


export const GET_TEAMS = gql`
  query {
    getTeams {
      id
      teamName
    }
  }
`;

export const GET_CHAT_ROOM = gql `
  query GetChatRoom($UserIdOne: Int!, $UserIdTwo: Int!) {
    getChatRoom(UserIdOne: $UserIdOne, UserIdTwo: $UserIdTwo) {
      id
      # interlocutorNameOne
      # interlocutorNameTwo
    }
  }
`;

// query{
//   getPrivateMessages(ChatRoomId:1){
//     MessageContent
//   }
// }
export const  GET_PRV_MESSAGE = gql`
  query GetPrivateMessages($ChatRoomId: Int!){
    getPrivateMessages(ChatRoomId: $ChatRoomId) {
      MessageContent
      senderName
    }
  }
`