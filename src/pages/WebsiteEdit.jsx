<<<<<<< HEAD
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
=======
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
>>>>>>> development
  }

  return (
    <div className="website-form-container">
<<<<<<< HEAD
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
=======
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
>>>>>>> development
