import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Home from './pages/home';
import Profile from './pages/profile';
import Chat from './pages/chat';
import Login from './pages/login-page'
import EditUser from './edit-user'
import AddFriend from './add-friend';
import FriendProfile from './friend-profile';

//routes identifies all the routes possible on the page and assignes them a value
export default function PageContainer() {
  return (
      <div>
        <Navbar />
        <div className='page-container'>
          <Sidebar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chatroom/:id" element={<Chat />} />
              <Route path= '/login' element = {<Login/>}/>
              <Route path= '/edit-user' element = {<EditUser/>} />
              <Route path= '/add-friend"' element={ < AddFriend/>}/>
              <Route path='/friend/:username' element={ <FriendProfile/>}/>
              <Route path="*" element={<Navigate to="/" replace />} />
              
            </Routes>
          </main>
        </div>
      </div>
  );
}