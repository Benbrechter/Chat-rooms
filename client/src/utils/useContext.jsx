import React, { createContext, useState, useEffect } from 'react';
import AuthService from './auth'; // Ensure the correct path to auth

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    profilePicture: ''
  });

  useEffect(() => {
    if (AuthService.loggedIn()) {
      const profile = AuthService.getProfile();
      console.log('Profile:', profile);
      setUser({
        username: profile.username,
        email: profile.email,
        profilePicture: profile.profilePicture
      });
    }
  }, []);

  const login = (idToken) => {
    AuthService.login(idToken);
    const profile = AuthService.getProfile();
    setUser({
      username: profile.username,
      email: profile.email,
      profilePicture: profile.profilePicture
    });
  };

  const logout = () => {
    AuthService.logout();
    setUser({
      username: '',
      email: '',
      profilePicture: ''
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;