import { Link } from 'react-router-dom';
import Auth from '../utils/auth'

function Navbar() {
  return (
    <nav className = 'nav-bar'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to = "/login">Login</Link></li>
      </ul>
      {Auth.loggedIn() ? (
        <div className='add-friends'>
          <Link to = '/add-friend'>Add Friends?</Link>
        </div>
      ) : (
        <div></div>
      )}
    </nav>
  );
}

export default Navbar