import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
