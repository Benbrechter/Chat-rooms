const {Chatroom, User} = require('../models')
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
   Query: {
    me: async (parent, args, context ) => {
            const user = await User.findById(context.user._id).populate('friends')
            return user
    },
    getAllUser: async () => {
      const user = await User.find()
      return user
    },
    getOneUser: async (parent, {username}, context) => {
      try{
   const user = await User.findOne({username})

      if(!user){
        console.log('no user found')
      }

      return user
    
      }catch(error){
        console.log(error)
      }
    },
    getAllChatrooms: async () => {
        const chatroom = await Chatroom.find()

        return chatroom 
    },
    getChatroom: async (parent, {id}, context) => {
        try{
            console.log(`Fetching chatroom with ID: ${id}`);
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
        addMessage: async (parent, { chatroomId, content, userId}, context) => {
            console.log('Context:', context);
            console.log('User:', context.user);
          try{
            //checks if user is authenticated
            if (!context.user) {
                throw AuthenticationError;
            }
            //finds the chatroom by Id
            const chatroom = await Chatroom.findById(chatroomId);
            if(!chatroom){
                throw new Error('Chatroom not found');
            }
             

            //created a new message variable
            const newMessage = {
                messageText: content,
                username: context.user.username,
                createdAt: new Date().toISOString()
            };
            //pushes the new message into the imbedded messages schema 
            chatroom.messages.push(newMessage);

            const updatedChatroom = await chatroom.save();

             if (!updatedChatroom) {
                throw new Error('Failed to save the updated chatroom');
            }

             return updatedChatroom;
            }catch (error) {
                console.error('Error in addMessage resolver:', error);
                throw error; // Throw the original error
              }
        },
        addChatroom: async (parent, args) => {
         try{
            const chatroom = await Chatroom.create({...args})

            return chatroom
         }catch(error){
            throw AuthenticationError
         }
        },
        updateUser: async (parent, args, context) => {
          if (context.user) {
            try {
              const updatedUser = await User.findByIdAndUpdate(
                context.user._id, 
                args, 
                { new: true }
              );
    
              if (!updatedUser) {
                throw new Error('User not found');
              }
    
              const token = signToken(updatedUser);
    
              return { token, user: updatedUser };
            } catch (error) {
              console.error('Error updating user:', error);
              throw new Error('Failed to update user');
            }
          }
    
          throw new AuthenticationError('You need to be logged in!');
        },
          addFriend: async (parent, { username, friendUsername }, context) => {
            try {
              // Ensure both userId and friendId are provided
              if (!username || !friendUsername) {
                throw new Error('Both username and friendUsername are required');
              }
      
              // Find both users by their IDs
              const user = await User.findOne({username});
              const friend = await User.findOne({username: friendUsername});
      
              if (!user) {
                throw new Error('User not found');
              }
      
              if (!friend) {
                throw new Error('Friend not found');
              }
      
              // Add friendId to user's friends list if not already added
              if (!user.friends.includes(friend._id)) {
                user.friends.push(friend._id);
                await user.save();
              }
      
              // Add userId to friend's friends list if not already added
              if (!friend.friends.includes(user._id)) {
                friend.friends.push(user._id);
                await friend.save();
              }
      
              // Return the updated user
              return user.populate('friends');
            } catch (error) {
              console.error(`Failed to add friend: ${error.message}`);
              throw new Error(`Failed to add friend: ${error.message}`);
            }
          },
    }
}

module.exports = resolvers