import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          <Link to="/" className="navbar-brand" aria-label="Starshield Security - Home">
            Starshield Security
          </Link>

          <div className="navbar-links" role="menubar">
            {token ? (
              <>
                <Link to="/websites" className="nav-link" role="menuitem">My Websites</Link>
                <Link to="/profile" className="nav-link" role="menuitem">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="nav-link btn-logout"
                  role="menuitem"
                  aria-label="Sign out of your account"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="nav-link" role="menuitem">Sign In</Link>
                <Link to="/signup" className="nav-link btn-signup" role="menuitem">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
=======
import { setAuthToken } from '../api/api';
import './NavBar.css';

export default function NavBar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  function handleSignOut() {
    setAuthToken(null);
    navigate('/');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Starshield Security</Link>
      </div>
      <div className="navbar-links">
        {token ? (
          <>
            <Link to="/websites" className="nav-link">My Websites</Link>
            <Link to="/profile" className="nav-link">About</Link>
            <button onClick={handleSignOut} className="nav-btn">Sign Out</button>
          </>
        ) : (
          <>
            <Link to="/signup" className="nav-link">Sign Up</Link>
            <Link to="/signin" className="nav-btn nav-btn-primary">Sign In</Link>
          </>
        )}
      </div>
    </nav>
  );
}
>>>>>>> development
