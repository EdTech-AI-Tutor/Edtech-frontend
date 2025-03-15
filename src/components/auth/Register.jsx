import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle, FaGithub, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import './Auth.css';

const Register = () => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await register(formData.email, formData.password, formData.fullName);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <FaGraduationCap size={32} color="#4f46e5" />
        </div>
        
        <div className="auth-header">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join our learning platform today</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="social-buttons">
            <button type="button" className="social-button">
              <FaGoogle /> Continue with Google
            </button>
            <button type="button" className="social-button">
              <FaGithub /> Continue with GitHub
            </button>
          </div>

          <div className="auth-divider">
            <span>or register with email</span>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder=" "
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
            <label className="form-label">Full Name</label>
          </div>

          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder=" "
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <label className="form-label">Email Address</label>
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-input"
              placeholder=" "
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              minLength="6"
            />
            <label className="form-label">Password</label>
          </div>

          <button 
            type="submit" 
            className="auth-button auth-button-primary"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?
          <Link to="/login" className="auth-link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 