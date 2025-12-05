import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await axios.post('/api/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', res.data.token);
      navigate('/websites');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-container" id="main-content">
      <div className="auth-card" role="region" aria-labelledby="signin-title">
        <h1 id="signin-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <div className="error-message" role="alert" aria-live="polite">{error}</div>}

        <form onSubmit={onSubmit} aria-label="Sign in form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
=======
import api, { setAuthToken } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      const token = res.data.token;
      setAuthToken(token);
      navigate('/websites');
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to manage your protected websites</p>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            onChange={update}
            value={form.email}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            onChange={update}
            value={form.password}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
>>>>>>> development

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
<<<<<<< HEAD
      </div>
    </main>
  );
}

export default SignIn;
=======
      </form>
    </div>
  );
}
>>>>>>> development
