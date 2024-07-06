import { useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { QUERY_ONE_USER } from "../utils/queries"

function FriendProfile() {
  const { username } = useParams();

  const {loading, data, error }= useQuery(QUERY_ONE_USER, {
    variables: { username },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const userData = data?.getOneUser || [];
  
    return(
        <div className='profile-container'>
            <h1>{userData.username}'s Profile</h1>
                <div>
                    <img src="" alt="" />
                    <p>Your friend, {userData.username}</p>
                    <p>Bio: {userData.bio}</p>
                    {/* Display more profile information here */}
                   
                </div>
                
        </div>
    )
}

export default FriendProfile