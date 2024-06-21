import {useState} from 'react'
import Sidebar from './sidebar'
import Home from './pages/home'
import Profile from './pages/profile'
import Chat from './pages/chat'

export default function PageContainer() {
    const [currentPage, setCurrentPage] = useState('Home')

    const renderPage = () => {
        if (currentPage === 'Home') {
            return <Home />;
        }
        if (currentPage === 'Profile') {
            return <Profile />;
        }
        if (currentPage === 'Chat') {
            return <Chat />;
        }

    };

    const handlePageChange = (page) => setCurrentPage(page);

    return(
        <div>
            {/* We are passing the currentPage from state and the function to update it */}
        <Sidebar currentPage={currentPage} handlePageChange={handlePageChange} />
            {/* Here we are calling the renderPage method which will return a component  */}
        <main>{renderPage()}</main> 
        </div>
    )
}