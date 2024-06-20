const {Message, User} = require('../models')
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
    getAllMessages: async () => {
        const message = await Message.find()
        return message
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
        addMessage: async (parent, args, context) => {
            if(context.user){
                const message = await Message.create({...args})
                return message
            }
            throw AuthenticationError
        }
    }
}

module.exports = resolvers