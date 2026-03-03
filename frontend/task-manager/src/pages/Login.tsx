import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authContext) return;
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isRegistering) {
        await axios.post('http://localhost:5000/api/users/register', { name, email, password });
        setSuccess('Account created! You can now sign in.');
        setIsRegistering(false);
        setName('');
        setPassword('');
      } else {
        await authContext.login(email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsRegistering(!isRegistering);
    setError('');
    setSuccess('');
    setName('');
    setPassword('');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        * { box-sizing: border-box; }

        .login-shell {
          min-height: 100vh;
          background: #0a0e1a;
          background-image:
            radial-gradient(ellipse 50% 60% at 80% 20%, rgba(232,201,126,0.07) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at 15% 85%, rgba(78,100,200,0.05) 0%, transparent 60%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .login-wrapper {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 560px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }

        /* Left panel */
        .login-left {
          flex: 1;
          background: linear-gradient(150deg, #0f1628 0%, #141b2e 100%);
          padding: 50px 44px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
        }

        .login-left::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 240px;
          height: 240px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232,201,126,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-left::after {
          content: '';
          position: absolute;
          bottom: -60px;
          left: -60px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(78,100,200,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .login-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .login-logo-mark {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #e8c97e 0%, #c9942a 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 16px;
          color: #0a0e1a;
        }

        .login-brand-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #f0ede8;
          letter-spacing: -0.02em;
        }

        .login-brand-name span { color: #e8c97e; }

        .login-left-content {
          padding: 20px 0;
        }

        .login-left-tagline {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.1rem);
          font-weight: 800;
          color: #f0ede8;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin-bottom: 16px;
        }

        .login-left-tagline em {
          font-style: italic;
          color: #e8c97e;
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
        }

        .login-left-description {
          font-size: 0.88rem;
          color: rgba(240,237,232,0.35);
          line-height: 1.65;
          font-weight: 300;
          max-width: 280px;
        }

        .login-left-features {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .login-feature {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: rgba(240,237,232,0.4);
          font-weight: 400;
        }

        .login-feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e8c97e;
          flex-shrink: 0;
          opacity: 0.6;
        }

        /* Right panel - form */
        .login-right {
          width: 400px;
          background: rgba(15, 18, 32, 0.98);
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-left: 1px solid rgba(255,255,255,0.06);
        }

        .login-form-eyebrow {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #e8c97e;
          margin-bottom: 10px;
        }

        .login-form-title {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 1.7rem;
          color: #f0ede8;
          letter-spacing: -0.03em;
          margin-bottom: 30px;
          line-height: 1.1;
        }

        .form-group {
          margin-bottom: 14px;
        }

        .form-group label {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(240,237,232,0.35);
          margin-bottom: 7px;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 9px;
          color: rgba(240,237,232,0.9);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 400;
          outline: none;
          transition: all 0.2s ease;
        }

        .form-input::placeholder { color: rgba(240,237,232,0.2); }

        .form-input:focus {
          border-color: rgba(232,201,126,0.4);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(232,201,126,0.06);
        }

        .form-input.entering {
          animation: formFieldIn 0.3s ease forwards;
        }

        @keyframes formFieldIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .error-message {
          padding: 10px 14px;
          background: rgba(232,80,80,0.1);
          border: 1px solid rgba(232,80,80,0.25);
          border-radius: 8px;
          color: #e85050;
          font-size: 0.83rem;
          font-weight: 400;
          margin-bottom: 16px;
          line-height: 1.4;
        }

        .success-message {
          padding: 10px 14px;
          background: rgba(78,205,132,0.1);
          border: 1px solid rgba(78,205,132,0.25);
          border-radius: 8px;
          color: #4ecd84;
          font-size: 0.83rem;
          font-weight: 400;
          margin-bottom: 16px;
        }

        .submit-btn {
          width: 100%;
          padding: 13px;
          margin-top: 8px;
          background: linear-gradient(135deg, #e8c97e 0%, #c9942a 100%);
          border: none;
          border-radius: 9px;
          color: #0a0e1a;
          font-family: 'Syne', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(232,201,126,0.25);
          filter: brightness(1.05);
        }

        .submit-btn:active { transform: translateY(0); }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn-loader {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(10,14,26,0.3);
          border-top-color: #0a0e1a;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          vertical-align: middle;
          margin-right: 8px;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .switch-mode-link {
          margin-top: 22px;
          text-align: center;
          font-size: 0.83rem;
          color: rgba(240,237,232,0.3);
        }

        .switch-mode-link button {
          background: none;
          border: none;
          color: #e8c97e;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.83rem;
          font-weight: 500;
          padding: 0;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.15s;
        }

        .switch-mode-link button:hover { opacity: 0.75; }

        /* Responsive */
        @media (max-width: 720px) {
          .login-left { display: none; }
          .login-right { width: 100%; }
          .login-wrapper { max-width: 440px; border-radius: 16px; }
        }

        @media (max-width: 480px) {
          .login-shell { padding: 16px; align-items: flex-start; padding-top: 40px; }
          .login-wrapper { border-radius: 14px; }
          .login-right { padding: 36px 28px; }
        }
      `}</style>

      <div className="login-shell">
        <div className="login-wrapper">
          {/* Left decorative panel */}
          <div className="login-left">
            <div className="login-brand">
              <div className="login-logo-mark">T</div>
              <span className="login-brand-name">Task<span>Flow</span></span>
            </div>

            <div className="login-left-content">
              <div className="login-left-tagline">
                Stay focused,<br />
                <em>ship faster.</em>
              </div>
              <p className="login-left-description">
                A clean, distraction-free workspace to manage everything on your plate — from solo sprints to team deliverables.
              </p>
            </div>

            <div className="login-left-features">
              {['Track tasks in real-time', 'Simple status management', 'Built for focused work'].map(f => (
                <div key={f} className="login-feature">
                  <div className="login-feature-dot" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          {/* Right form panel */}
          <div className="login-right">
            <div className="login-form-eyebrow">{isRegistering ? 'Create account' : 'Welcome back'}</div>
            <div className="login-form-title">{isRegistering ? 'Get started' : 'Sign in'}</div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form onSubmit={handleSubmit} noValidate>
              {isRegistering && (
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    className="form-input entering"
                    type="text"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  className="form-input"
                  type="password"
                  placeholder={isRegistering ? 'Create a password' : 'Enter your password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading && <span className="submit-btn-loader" />}
                {loading ? 'Please wait...' : isRegistering ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <div className="switch-mode-link">
              {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
              <button type="button" onClick={switchMode}>
                {isRegistering ? 'Sign in' : 'Register'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;