import {gql} from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
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
    token
  }
}
`
export const UPDATE_USER = gql`
mutation UpdateUser {
  updateUser {
    _id
    username
    email
    password
    bio
    profilePicture
    friends {
      _id
      username
      email
      password
      bio
      profilePicture
    }
  }
}
`
export const LOGIN = gql`
mutation Login($username: String!, $email: String!, $password: String!) {
  login(username: $username, email: $email, password: $password) {
    user {
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
    token
  }
}
`
export const ADD_CHATROOM = gql`
mutation AddChatroom($title: String!) {
  addChatroom(title: $title) {
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

export const ADD_MESSAGE = gql`
mutation AddMessage($chatroomId: ID!, $content: String!) {
  addMessage(chatroomId: $chatroomId, content: $content) {
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
export const ADD_FRIEND = gql`
mutation AddFriend($username: String, $friendUsername: String) {
  addFriend(username: $username, friendUsername: $friendUsername) {
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