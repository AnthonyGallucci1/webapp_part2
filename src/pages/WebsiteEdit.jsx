import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Websites.css';

function WebsiteEdit() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    riskLevel: 'Medium',
    isProtected: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/websites/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setFormData({
          name: res.data.name,
          url: res.data.url,
          riskLevel: res.data.riskLevel,
          isProtected: res.data.isProtected
        });
      } catch (err) {
        setError('Failed to load website');
      } finally {
        setLoading(false);
      }
    };

    fetchWebsite();
  }, [id]);

  const { name, url, riskLevel, isProtected } = formData;

  const onChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/websites/${id}`, formData, {
        headers: { 'x-auth-token': token }
      });
      navigate('/websites');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to update website');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="website-form-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="website-form-container">
      <div className="website-form-card">
        <h2>Edit Website</h2>
        <p className="form-subtitle">Update the details of your protected website</p>

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
              placeholder="e.g., My Bank Account"
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
              <option value="Low">Low - Basic accounts</option>
              <option value="Medium">Medium - Important accounts</option>
              <option value="High">High - Financial/sensitive accounts</option>
            </select>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isProtected"
                checked={isProtected}
                onChange={onChange}
              />
              <span>2FA Protection Enabled</span>
            </label>
          </div>

          <div className="form-buttons">
            <Link to="/websites" className="btn btn-cancel">
              Cancel
            </Link>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WebsiteEdit;
