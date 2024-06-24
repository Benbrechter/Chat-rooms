import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {QUERY_CHATROOM} from '../../utils/queries'

function Chat() {
    const { id } = useParams();
    console.log('Chatroom ID:', id);
  const {loading, data, error} = useQuery(QUERY_CHATROOM, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const chatroomData = data?.getChatroom || [];

  console.log(chatroomData)

  return (
    <div>
      <h1>Chatroom: {chatroomData.username}</h1>
      {/* Render chatroom details */}
      <div>
        {chatroomData.messages && chatroomData.messages.map((message, index) => (
          <div key={message.id || `message-${index}`}>
            <strong>{message.sender}: </strong>
            <p>{message.messageText}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chat