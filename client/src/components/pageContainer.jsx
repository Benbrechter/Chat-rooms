import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Home from './pages/home';
import Profile from './pages/profile';
import Chat from './pages/chat';

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
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}