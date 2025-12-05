import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Websites.css';

function WebsiteCreate() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    riskLevel: 'High',
    isProtected: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { name, url, riskLevel, isProtected } = formData;

  const onChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/websites', formData, {
        headers: { 'x-auth-token': token }
      });
      navigate('/websites');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to create website');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="website-form-container">
      <div className="website-form-card">
        <h2>Add Website for 2FA Protection</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Website Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              required
              placeholder="e.g., My Blog"
            />
          </div>

          <div className="form-group">
            <label htmlFor="url">Website URL</label>
            <input
              type="url"
              id="url"
              name="url"
              value={url}
              onChange={onChange}
              required
              placeholder="https://example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="riskLevel">Risk Level</label>
            <select
              id="riskLevel"
              name="riskLevel"
              value={riskLevel}
              onChange={onChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <p className="form-hint">Higher risk = stronger 2FA requirements</p>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isProtected"
                checked={isProtected}
                onChange={onChange}
              />
              <span>Enable 2FA Protection</span>
            </label>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Adding...' : 'Add Website'}
            </button>
            <Link to="/websites" className="btn-cancel">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WebsiteCreate;
