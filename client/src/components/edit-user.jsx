import { useMutation, useQuery } from "@apollo/client"
import { useContext, useState } from 'react';
import { UPDATE_USER} from "../utils/mutations"
import { QUERY_ME } from '../utils/queries'
import Auth from "../utils/auth"

export default function UpdateUser(){
    const [formState , setFormState] = useState({ bio: "" });
    //we need to refetch because the data is persisting through the json webtoken
    const { refetch } = useQuery(QUERY_ME);
    const [updateUser] = useMutation(UPDATE_USER,  {
        refetchQueries: [{ query: QUERY_ME }],
      });

    const handleChange = (event) => {
        const{name, value} = event.target;
        setFormState(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFormSubmit = async (event) =>{
       event.preventDefault();
       try{
        //we grab the data from the updated user
        //the bio and username we get from state 
       const { data } = await updateUser({
       variables: {
       bio: formState.bio,
       username: formState.username
       },
       });
       console.log(data)

       if (data.updateUser.token) {
        Auth.login(data.updateUser.token);
        }
        await refetch();
        //reset state to '' so we can change it again4523
       setFormState({ bio: ''})
       }catch(error){
        console.log(error)
       } 
    }



    return(
        <form action="submit" className="form-container" onSubmit={handleFormSubmit}>
            <label htmlFor=""> Change Username</label>
            <input   type="text"
            placeholder='username'
            name = 'username'
            value = {formState.username}
            onChange={handleChange}/>
            <label htmlFor="">Change Bio</label>
            <textarea   type="text"
            placeholder='bio'
            name = 'bio'
            value = {formState.bio}
            onChange={handleChange}></textarea>
            <button type="submit">Submit</button>
        </form>
    )
}