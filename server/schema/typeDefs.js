const {gql} = require('apollo-server-express')

const typeDefs = gql`
type User {
_id: ID
username: String!
email: String!
password: String!
friends: [User]
bio: String
profilePicture: String
}

type Chatroom {
_id: ID
title: String!
img: string
users; [User]
messages: [Message]
}

type Message {
_id: ID 
messageText: String!
createdAt: String
}

type Auth {
    token: ID
    user: User
  }

type Query {
    me: User 
    getAllUser: [User]
    getAllMessages: [Message]

} 

 type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, email: String!, password: String!): Auth
    addMessage(messageText: String!): Message
}
`

module.exports = typeDefs;