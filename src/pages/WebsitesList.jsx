import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Websites.css';

function WebsitesList() {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/websites', {
        headers: { 'x-auth-token': token }
      });
      setWebsites(res.data);
    } catch (err) {
      setError('Failed to load websites');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this website?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/websites/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setWebsites(websites.filter(w => w._id !== id));
    } catch (err) {
      setError('Failed to delete website');
    }
  };

  const toggleProtection = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`/api/websites/${id}`,
        { isProtected: !currentStatus },
        { headers: { 'x-auth-token': token } }
      );
      setWebsites(websites.map(w => w._id === id ? res.data : w));
    } catch (err) {
      setError('Failed to update protection status');
    }
  };

  const getRiskBadgeClass = (level) => {
    switch (level) {
      case 'Low': return 'risk-low';
      case 'Medium': return 'risk-medium';
      case 'High': return 'risk-high';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="websites-container">
        <div className="loading">Loading websites...</div>
      </div>
    );
  }

  return (
    <main className="websites-container" id="main-content" role="main">
      <div className="websites-header">
        <h1>My Protected Websites</h1>
        <Link to="/websites/new" className="btn-add" aria-label="Add a new website">
          + Add Website
        </Link>
      </div>

      {error && <div className="error-message" role="alert" aria-live="polite">{error}</div>}

      {websites.length === 0 ? (
        <div className="empty-state">
          <h3>No websites yet</h3>
          <p>Add your first website to start protecting it with 2FA.</p>
          <Link to="/websites/new" className="btn-primary">
            Add Your First Website
          </Link>
        </div>
      ) : (
        <div className="websites-grid">
          {websites.map((website) => (
            <div key={website._id} className="website-card">
              <div className="website-header">
                <h3>{website.name}</h3>
                <span className={`risk-badge ${getRiskBadgeClass(website.riskLevel)}`}>
                  {website.riskLevel} Risk
                </span>
              </div>

              <div className="website-body">
                <a href={website.url} target="_blank" rel="noopener noreferrer" className="website-url">
                  {website.url}
                </a>

                <div className="website-status">
                  <span className={`status-label ${!website.isProtected ? 'disabled' : ''}`}>
                    {website.isProtected ? '2FA Enabled' : '2FA Disabled'}
                  </span>
                  <button
                    className={`status-toggle ${website.isProtected ? 'active' : ''}`}
                    onClick={() => toggleProtection(website._id, website.isProtected)}
                    aria-label={`${website.isProtected ? 'Disable' : 'Enable'} 2FA protection for ${website.name}`}
                  >
                    {website.isProtected ? 'Disable' : 'Enable'}
                  </button>
                </div>

                <div className="website-actions">
                  <Link to={`/websites/edit/${website._id}`} className="btn-edit" aria-label={`Edit ${website.name}`}>
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(website._id)}
                    className="btn-delete"
                    aria-label={`Remove ${website.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default WebsitesList;
