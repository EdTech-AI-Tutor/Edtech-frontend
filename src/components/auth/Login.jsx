import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaFacebook, FaGithub } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setErrors({
        email: 'Please fill in all fields',
        password: 'Please fill in all fields'
      });
      return;
    }
    
    try {
      setErrors({});
      setLoading(true);
      
      // In a real app, this would make an API call
      // For demo purposes, we'll just simulate a successful login
      const success = login({
        id: '1',
        email: formData.email,
        name: 'Demo User',
      });
      
      if (success) {
        navigate('/onboarding');
      } else {
        setErrors({
          email: 'Failed to log in',
          password: 'Failed to log in'
        });
      }
    } catch (err) {
      setErrors({
        email: 'Failed to log in',
        password: 'Failed to log in'
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-banner">
        <div className="auth-banner-content">
          <div className="auth-banner-logo">EduTech AI</div>
          <h1 className="auth-banner-title">
            Welcome back to your learning journey
          </h1>
          <p className="auth-banner-text">
            Continue your personalized learning experience with AI-powered tutoring and interactive courses.
          </p>
        </div>
        <div className="auth-banner-footer">
          © 2024 EduTech AI. All rights reserved.
        </div>
      </div>

      <div className="auth-form-container">
        <div className="auth-form-header">
          <h2 className="auth-form-title">Sign in to your account</h2>
          <p className="auth-form-subtitle">
            Start learning with personalized AI tutoring
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-social-buttons">
            <button type="button" className="auth-social-button">
              <FaGoogle /> Continue with Google
            </button>
            <button type="button" className="auth-social-button">
              <FaGithub /> Continue with GitHub
            </button>
          </div>

          <div className="auth-divider">
            <span>or continue with email</span>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Email address</label>
            <input
              type="email"
              className={`auth-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && (
              <div className="auth-error-message">{errors.email}</div>
            )}
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className={`auth-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            {errors.password && (
              <div className="auth-error-message">{errors.password}</div>
            )}
          </div>

          <Link to="/forgot-password" className="auth-forgot-password">
            Forgot password?
          </Link>

          <button type="submit" className="auth-submit-button" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?
          <Link to="/register" className="auth-footer-link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 