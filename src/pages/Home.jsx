import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="home-container">
      <div className="hero">
        <h1>Protect Your Websites with Starshield Security</h1>
        <p className="hero-subtitle">
          Add two-factor authentication to any website, even if it doesn't support it natively.
          Keep your accounts secure with our easy-to-use security protection service.
        </p>
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid #10b981', display: 'inline-block' }}>
          <p style={{ color: '#34d399', margin: 0, fontWeight: 'bold' }}>✨ New Feature: AI-Powered Risk Analysis is now live!</p>
        </div>


        {token ? (
          <Link to="/websites" className="btn btn-hero">Go to My Websites</Link>
        ) : (
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-hero">Get Started</Link>
            <Link to="/signin" className="btn btn-hero-secondary">Sign In</Link>
          </div>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
              <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
              <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
              <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
            </svg>
          </div>
          <h3>Easy Setup</h3>
          <p>Add any website in seconds. Just enter the URL and configure your protection level.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </div>
          <h3>Risk Assessment</h3>
          <p>Categorize websites by risk level to apply appropriate security measures.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h3>Instant Protection</h3>
          <p>Enable or disable 2FA protection for each website with a single click.</p>
        </div>
      </div>
    </div >
  );
}

export default Home;
