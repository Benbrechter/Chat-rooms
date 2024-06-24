import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className = 'nav-bar'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar