const db = require('./connections');
const { User, Chatroom} = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    await cleanDB('User', 'users')
    await cleanDB('Chatroom', 'chat-rooms')

    const ChatRoom = await Chatroom.insertMany([
        {
         title: 'Chatroom 1',
         messages: [
            {messageText: 'Does anyone want to work with me? Please help me land a job. I hate sending emails and this is my place to vent rn rip rip'},
            {messageText: 'Does anyone want to work with me? Please help me land a job. I hate sending emails and this is my place to vent rn rip rip'}]
        },
        {
            title: 'Chatroom2',
            messages: [
            {messageText: 'Example example please take this burden off my hands I am trying to be productive but yet I fail to do so'},
            {messageText: 'How the fuck do I call these with the correct room I have to create a route that will alolow me to do so'}       
            ]
        },
        {
            title: 'Chatroom3',
            messages: [
            {messageText: 'I think I will use conditional rendering and assaign a state to each room'},
            {messageText: 'The rom will be a componet for sure that makes everything easier to work with'}
            ]
        }
    ])
    console.log('chatroom seeded')

    await User.create({
      username: 'benbeejammin',
      email: 'example@email.com',
      password: 'password',
      bio: 'I am totally cool and I design and build applications'
    });

    await User.create({
        username: "BobDylan",
        email: 'bob@Dylan.com',
        password: 'password123',
        bio: 'This is the real Bob Dylan'
    });

    console.log('Users Created')

    process.exit();
}) 