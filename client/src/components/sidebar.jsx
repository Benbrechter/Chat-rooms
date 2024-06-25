import React from 'react';
import ChatroomIcon from './chatroom-icon'
import { Link, useNavigate  } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {QUERY_ALLCHATROOMS} from '../utils/queries'

function Sidebar() {
  //use navigation and link instead of conditional rendering
  const navigate = useNavigate();
  //we are assigning the variables to the use Query ALL Chatrooms 
  const { loading, data, error } = useQuery(QUERY_ALLCHATROOMS);
  const chatroomsData = data?.getAllChatrooms || [];
//loading and eror handeling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleChatroomClick = (chatroomId) => {
    // Navigate to the chatroom
    navigate(`/chatroom/${chatroomId}`);
    
    // You can add any additional actions here
    // For example, you might want to fetch chatroom data, update some state, etc.
    console.log(`Navigating to chatroom ${chatroomId}`);
  };

  return (
    <div className="side-bar">
      <ul>
        {/* giving each element a key is needed because it lets the computer know which element it is clicking*/}
        {chatroomsData.map((chatroom, index) => (
          <li key={chatroom.id || `chatroom-${index}` }>
            <Link 
              to={`/chatroom/${chatroom._id}`}
              className={location.pathname === `/chatroom/${chatroom._id}` ? 'active' : ''}
              onClick={() => handleChatroomClick(chatroom._id)}
            >
              {/* passing through the chatroom props so I can use the chatroom data to display each chat room name */}
              <ChatroomIcon chatroom={chatroom} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar

