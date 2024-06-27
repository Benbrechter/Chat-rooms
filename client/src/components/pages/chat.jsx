import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {QUERY_CHATROOM} from '../../utils/queries'
import {ADD_MESSAGE} from '../../utils/mutations'
import { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';

function Chat() {
  //use params allows you to use the params in the search bar this is where the id is stored
    const { id } = useParams();
    //assigning the variables to the query with a variable ID
  const {loading, data, error} = useQuery(QUERY_CHATROOM, {
    variables: { id },
  });
  const [formState, setFormState] = useState({messageText: '',username: ''});
  const [addMessage] = useMutation(ADD_MESSAGE);

  const handleChange = (event) => {
    const{name, value} = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try{
      await addMessage({
        variables: {
          chatroomId: id,
          content: formState.messageText,
          userId: useContext.userId
        },
      });

      setFormState({ messageText: '', username: '' });
    }catch(error){
      console.log(error)
    }
  }

  //loading and error handeling
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const chatroomData = data?.getChatroom || [];
 

  return (
    <div>
      <h1>{chatroomData.title}</h1>
      {/* need to render chatroom details */}
      <div>
        {chatroomData.messages && chatroomData.messages.map((message, index) => (
          <div key={message.id || `message-${index}`}>
            <h3>{message.username}: </h3>
            <p>{message.messageText}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
      <input
      type="text"
      placeholder='message'
      name = 'messageText'
      value = {formState.messageText}
      onChange={handleChange}
       />
      <button type='submit'>enter</button>
      </form>
    </div>
  );
}

export default Chat