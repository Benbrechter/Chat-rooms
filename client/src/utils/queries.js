import {gql} from '@apollo/client';

export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    email
    password
    friends {
      _id
      username
      email
      password
      bio
      profilePicture
    }
    bio
    profilePicture
  }
}
`
export const QUERY_CHATROOM = gql`
query GetChatroom($id: ID!) {
  getChatroom(id: $id) {
    _id
    title
    img
    users {
      _id
      username
      email
      password
      friends {
        _id
        username
        email
        password
        bio
        profilePicture
      }
      bio
      profilePicture
    }
    messages {
      _id
      messageText
      username
      createdAt
    }
  }
}
`
export const QUERY_ALLCHATROOMS = gql`
query GetAllChatrooms {
  getAllChatrooms {
    _id
    title
    img
    users {
      _id
      username
      email
      password
      friends {
        _id
        username
        email
        password
        bio
        profilePicture
      }
      bio
      profilePicture
    }
    messages {
      _id
      messageText
      username
      createdAt
    }
  }
}
`