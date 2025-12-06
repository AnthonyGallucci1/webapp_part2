import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken } from '../api/api';
import logo from '../assets/logo.png';
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
        <Link to="/" className="brand-link">
          <img src={logo} alt="Starshield Security Logo" className="navbar-logo" />
          <span className="brand-text">Starshield Security</span>
        </Link>
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
