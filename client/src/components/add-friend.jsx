import { ADD_FRIEND} from "../utils/mutations"
import { useMutation  } from "@apollo/client"
import { useState, useContext} from 'react';
import UserContext from "../utils/useContext";

const AddFriend = function() {
    const [formState, setFormState] = useState({friendUsername: ''})
    const [ addFriend ] = useMutation(ADD_FRIEND)
    const { user } = useContext(UserContext)
    console.log(user)
    
    const handleChange = (event) => {
     const {name, value} = event.target;
     setFormState({
        ...formState,
        [name]: value
     });
    };

    const formSubmit = async (event) => {
     event.preventDefault();
     try{
      const {data} = await addFriend({
        variables: {
            username: user.username,
            friendUsername: formState.friendUsername
        },
      });
      console.log(data) 

      setFormState({friendUsername: ''})
     }catch(error){
      console.log('Error adding friend:', error)
     }
    }

    return(
        <div className = "form-container">
            <form onSubmit={formSubmit}>
                <input type="text"
                placeholder="Add friend"
                name="friendUsername"
                value={formState.friendUsername} 
                onChange={handleChange}/>
                <button type="submit">Sumbmit</button>
            </form>
        </div>
    )
}
export default AddFriend