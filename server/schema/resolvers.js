const {Chatroom, User} = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
   Query: {
    me: async (parent, args, context ) => {
        if(context.user){
            const user = await User.findById(context.user._id).populate('friends')
            return user
        }
        throw AuthenticationError
    },
    getAllUser: async () => {
      const user = await User.find()
      return user
    },
    getAllChatrooms: async () => {
        const chatroom = await Chatroom.find()

        return chatroom 
    },
    getChatroom: async (parent, {id}, context) => {
        try{
            const chatroom = await Chatroom.findById(id);
            
            if(!chatroom){
                throw new Error('chatroom not found')
            }

            return chatroom

        }catch(error){
            throw new Error(`failed to get chatroom`)
        }
    }
    },

    Mutation: {
        addUser: async (parent, {username, email, password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);
    
            return {token, user};
        },
        login: async (parent, {username, email, password}) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
              throw AuthenticationError;
            }  
            
            const correctPw = await user.isCorrectPassword(password);
    
            if (!correctPw) {
                throw AuthenticationError
              }
              const token = signToken(user);
              return {token, user} 
    
        },
        addMessage: async (parent, { chatroomId, content, userId }, context) => {
          try{
            //checks if user is authenticated
            if (!content.user) {
                throw new AuthenticationError('you must be loggged in');
            }
            //finds the chatroom by Id
            const chatroom = await Chatroom.findById(chatroomId);
            
            if(!chatroom){
                throw new Error('Chatroom not found');
            }
            //created a new message variable
            const newMessage = {
                content,
                sender: userId || context.user._id,
                createdAt: new Date()
            };
            //pushes the new message into the imbedded messages schema 
            chatroom.messages.push(newMessage);

            await chatroom.save();
            return chatroom

          }catch(error){
            throw new Error('failed to add message')
          }
        },
        addChatroom: async (parent, context, args) => {
            if(context.user){
                const chatroom = await Chatroom.create({...args})

                return chatroom
            }
            throw AuthenticationError
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
      
            throw AuthenticationError;
          }
    }
}

module.exports = resolvers