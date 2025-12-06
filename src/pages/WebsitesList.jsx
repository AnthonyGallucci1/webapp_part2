import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Link } from 'react-router-dom';
import './Websites.css';

export default function WebsitesList() {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' or 'unprotected'

  async function load() {
    try {
      const res = await api.get('/websites');
      setWebsites(res.data);
    } catch (err) {
      alert('Cannot load websites');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to remove this website?')) return;
    try {
      await api.delete(`/websites/${id}`);
      load();
    } catch (err) {
      alert('Delete failed');
    }
  }

  async function toggleProtection(website) {
    try {
      await api.put(`/websites/${website._id}`, {
        ...website,
        isProtected: !website.isProtected
      });
      load();
    } catch (err) {
      alert('Failed to update protection status');
    }
  }

  function getRiskBadgeClass(riskLevel) {
    switch (riskLevel) {
      case 'Low': return 'badge badge-low';
      case 'Medium': return 'badge badge-medium';
      case 'High': return 'badge badge-high';
      default: return 'badge';
    }
  }

  const filteredWebsites = websites.filter(website => {
    if (filter === 'unprotected') return !website.isProtected;
    return true;
  });

  if (loading) {
    return <div className="loading">Loading your websites...</div>;
  }

  return (
    <div className="websites-container">
      <div className="websites-header">
        <div>
          <h2>My Protected Websites</h2>
          <div className="filter-controls" style={{ marginTop: '1rem', display: 'flex', gap: '10px' }}>
            <button
              className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('all')}
            >
              All Websites
            </button>
            <button
              className={`btn btn-sm ${filter === 'unprotected' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilter('unprotected')}
            >
              Unprotected Only
            </button>
          </div>
        </div>
        <Link to="/websites/new" className="btn btn-primary">+ Add Website</Link>
      </div>

      {websites.length === 0 ? (
        <div className="empty-state">
          <p>You haven't added any websites yet.</p>
          <p>Add your first website to enable 2FA protection.</p>
          <Link to="/websites/new" className="btn btn-primary">Add Your First Website</Link>
        </div>
      ) : (
        <div className="websites-grid">
          {filteredWebsites.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
              <p>No websites match the current filter.</p>
            </div>
          ) : (
            filteredWebsites.map(website => (
              <div key={website._id} className="website-card">
                <div className="website-card-header">
                  <h3>{website.name}</h3>
                  <span className={getRiskBadgeClass(website.riskLevel)}>
                    {website.riskLevel} Risk
                  </span>
                </div>

                <div className="website-card-body">
                  <p className="website-url">
                    <a href={website.url} target="_blank" rel="noopener noreferrer">
                      {website.url}
                    </a>
                  </p>

                  <div className="protection-status">
                    <span className={website.isProtected ? 'status-protected' : 'status-unprotected'}>
                      {website.isProtected ? '2FA Enabled' : '2FA Disabled'}
                    </span>
                    <button
                      className={`btn btn-sm ${website.isProtected ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => toggleProtection(website)}
                    >
                      {website.isProtected ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>

                <div className="website-card-footer">
                  <Link to={`/websites/edit/${website._id}`} className="btn btn-secondary btn-sm">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(website._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
