import React, { useContext } from 'react';
import  Auth  from '../../utils/auth';
import { Link } from 'react-router-dom';



function Profile() {


    // Use Auth.getProfile() to get user information from the token
    const userProfile = Auth.getProfile();
    console.log('User profile from token:', userProfile);
    
    return(
        <div className='profile-container'>
            <h1>Profile</h1>
            {Auth.loggedIn() ? (
                <div>
                    <img src="" alt="" />
                    <p>Welcome, {userProfile.data.username}</p>
                    <p>Bio: {userProfile.data.bio}</p>
                    <p>friends: {userProfile.data.friends.length}</p>
                    {/* Display more profile information here */}
                    <Link to={'/edit-user'}>
                    <button>Edit</button>
                    </Link>
                </div>
                
            ) : (
                <p>Please log in to view your profile.</p>
            )}
        </div>
    )
}

export default Profile