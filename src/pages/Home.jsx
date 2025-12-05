import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const token = localStorage.getItem('token');

  return (
<<<<<<< HEAD
    <main className="home-container" role="main" id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <h1 id="hero-title">Protect Your Websites with Starshield Security</h1>
=======
    <div className="home-container">
      <div className="hero">
        <h1>Protect Your Websites with Starshield Security</h1>
>>>>>>> development
        <p className="hero-subtitle">
          Add two-factor authentication to any website, even if it doesn't support it natively.
          Keep your accounts secure with our easy-to-use security protection service.
        </p>
        {token ? (
          <Link to="/websites" className="btn btn-hero">Go to My Websites</Link>
        ) : (
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-hero">Get Started</Link>
            <Link to="/signin" className="btn btn-hero-secondary">Sign In</Link>
          </div>
        )}
<<<<<<< HEAD
      </section>

      <section className="features" aria-label="Features">
        <article className="feature-card">
          <div className="feature-icon" aria-hidden="true">+</div>
          <h3>Easy Setup</h3>
          <p>Add any website in seconds. Just enter the URL and configure your protection level.</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon" aria-hidden="true">*</div>
          <h3>Risk Assessment</h3>
          <p>Categorize websites by risk level to apply appropriate security measures.</p>
        </article>
        <article className="feature-card">
          <div className="feature-icon" aria-hidden="true">!</div>
          <h3>Instant Protection</h3>
          <p>Enable or disable 2FA protection for each website with a single click.</p>
        </article>
      </section>
    </main>
=======
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">+</div>
          <h3>Easy Setup</h3>
          <p>Add any website in seconds. Just enter the URL and configure your protection level.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">*</div>
          <h3>Risk Assessment</h3>
          <p>Categorize websites by risk level to apply appropriate security measures.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">!</div>
          <h3>Instant Protection</h3>
          <p>Enable or disable 2FA protection for each website with a single click.</p>
        </div>
      </div>
    </div>
>>>>>>> development
  );
}

export default Home;
