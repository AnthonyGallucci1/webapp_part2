import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1>Starshield Security</h1>
        <p className="tagline">Secure Authentication for Every Website</p>

        <div className="profile-section">
          <h2>About This Project</h2>
          <p>
            Starshield Security provides two-factor authentication protection for websites
            that don't natively support it. Add an extra layer of security to
            your favorite websites with our easy-to-use service.
          </p>
        </div>

        <div className="profile-section">
          <h2>Team</h2>
          <ul className="team-list">
            <li>Anthony Gallucci</li>
            <li>Naomi Murai</li>
            <li>Dang Huy Cao</li>
          </ul>
        </div>

        <div className="profile-actions">
          <Link to="/websites" className="btn btn-primary">Manage Websites</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
