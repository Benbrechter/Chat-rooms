
function Sidebar({currentPage, handlePageChange}) {
    return (
      <div className="side-bar">
        <ul>
          <li>
            <a
              href="#home"
              onClick={() => handlePageChange('Home')}
              // This is a conditional (ternary) operator that checks to see if the current page is "Home"
              // If it is, we set the current page to 'nav-link-active', otherwise we set it to 'nav-link'
              className={currentPage === 'Home' ? 'nav-link active' : 'nav-link'}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#chat"
              onClick={() => handlePageChange('Chat')}
              // Check to see if the currentPage is `Chat`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
              className={currentPage === 'Chat' ? 'nav-link active' : 'nav-link'}
            >
              Chat
            </a>
          </li>
          <li >
            <a
              href="#profile"
              onClick={() => handlePageChange('Profile')}
              // Check to see if the currentPage is `Profile`, and if so we use the active link class from bootstrap. Otherwise, we set it to a normal nav-link
              className={currentPage === 'Profile' ? 'nav-link active' : 'nav-link'}
            >
              Profile
            </a>
          </li>
        </ul>
      </div>  
      );
}

export default Sidebar