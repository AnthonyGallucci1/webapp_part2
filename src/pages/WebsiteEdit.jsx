import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import './Websites.css';

export default function WebsiteEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: '',
    url: '',
    riskLevel: 'High',
    isProtected: false
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get(`/websites/${id}`);
        setForm({
          name: res.data.name || '',
          url: res.data.url || '',
          riskLevel: res.data.riskLevel || 'High',
          isProtected: res.data.isProtected || false
        });
      } catch (err) {
        alert('Failed to load website');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.put(`/websites/${id}`, form);
      navigate('/websites');
    } catch (err) {
      alert('Update failed');
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="website-form-container">
      <form onSubmit={handleSubmit} className="website-form">
        <h2>Edit Website</h2>

        <div className="form-group">
          <label htmlFor="name">Website Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g., My Blog"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="url">Website URL</label>
          <input
            type="url"
            id="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="riskLevel">Risk Level</label>
          <select
            id="riskLevel"
            name="riskLevel"
            value={form.riskLevel}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <span className="hint">Higher risk = stronger 2FA requirements</span>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="isProtected"
              checked={form.isProtected}
              onChange={handleChange}
            />
            <span>Enable 2FA Protection</span>
          </label>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Save Changes</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/websites')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
