const {gql} = require('apollo-server-express')

const typeDefs = gql`
type User {
_id: ID!
username: String
email: String
password: String
friends: [User]
bio: String
profilePicture: String
}

type Chatroom {
_id: ID!
title: String
img: String
users: [User]
messages: [Message]
}

type Message {
_id: ID!
messageText: String!
username: String
createdAt: String
}

type Auth {
    token: ID
    user: User
  }

type Query {
    me: User 
    getAllUser: [User]
    getAllChatrooms: [Chatroom]
    getChatroom(id: ID!): Chatroom
    getOneUser(username: String): User

} 

 type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, email: String!, password: String!): Auth
    addMessage(chatroomId: ID!, content: String!, userId: ID): Chatroom
    addChatroom(title: String!): Chatroom
    updateUser(username: String, email: String, password: String, friends: [String], bio: String, profilePicture: String):Auth
    addFriend(username: String!, friendUsername: String!): User
}
`

module.exports = typeDefs;