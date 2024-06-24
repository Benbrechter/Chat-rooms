import React from 'react';
import ChatroomIcon from './chatroom-icon'
import { Link, useNavigate  } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import {QUERY_ALLCHATROOMS} from '../utils/queries'

function Sidebar() {
  const navigate = useNavigate();
  const { loading, data, error } = useQuery(QUERY_ALLCHATROOMS);
  const chatroomsData = data?.getAllChatrooms || [];

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
        {chatroomsData.map((chatroom, index) => (
          <li key={chatroom.id || `chatroom-${index}` }>
            <Link 
              to={`/chatroom/${chatroom._id}`}
              className={location.pathname === `/chatroom/${chatroom._id}` ? 'active' : ''}
              onClick={() => handleChatroomClick(chatroom._id)}
            >
              <ChatroomIcon chatroom={chatroom} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar

