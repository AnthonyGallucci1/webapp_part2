import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/signin');
          return;
        }

        // Decode token to get user info (basic decode)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));

        setUser({ id: payload.user.id });
      } catch (err) {
        console.error('Error loading profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <span>U</span>
        </div>
        <h2>My Profile</h2>

        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">User ID</span>
            <span className="info-value">{user?.id || 'N/A'}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Account Status</span>
            <span className="info-value status-active">Active</span>
          </div>
        </div>

        <button onClick={handleLogout} className="btn btn-logout">
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Profile;
