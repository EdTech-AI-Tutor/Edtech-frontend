import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaUser, FaSignOutAlt, FaBook, FaChartLine, FaTrophy, FaBars } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <FaGraduationCap className="h-8 w-8" />
          <span>EduAI</span>
        </Link>
        
        {/* Desktop menu */}
        <div className="navbar-menu">
          {currentUser ? (
            <>
              <Link to="/dashboard">
                <FaChartLine className="mr-1" /> Dashboard
              </Link>
              <Link to="/aitutorhub">
                <FaChartLine className="mr-1" /> Ai tutorHub
              </Link>
              <Link to="/tutors">
                <FaUser className="mr-1" /> AI Tutors
              </Link>
              <Link to="/courses">
                <FaBook className="mr-1" /> Courses
              </Link>
              <Link to="/achievements">
                <FaTrophy className="mr-1" /> Achievements
              </Link>
            </>
          ) : (
            <>
              <Link to="/about">About</Link>
              <Link to="/features">Features</Link>
              <Link to="/pricing">Pricing</Link>
            </>
          )}
        </div>
        
        {/* Auth buttons */}
        <div className="navbar-auth">
          {currentUser ? (
            <button 
              onClick={handleLogout}
              className="button button-secondary"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="button button-secondary">Login</Link>
              <Link to="/register" className="button button-primary">Register</Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FaBars />
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="container py-4">
          <div className="flex flex-col gap-4">
            {currentUser ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaChartLine className="mr-2" /> Dashboard
                </Link>
                <Link 
                  to="/tutors" 
                  className="flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUser className="mr-2" /> AI Tutors
                </Link>
                <Link 
                  to="/courses" 
                  className="flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaBook className="mr-2" /> Courses
                </Link>
                <Link 
                  to="/achievements" 
                  className="flex items-center text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTrophy className="mr-2" /> Achievements
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center text-white"
                >
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className="text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  to="/features" 
                  className="text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link 
                  to="/pricing" 
                  className="text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link 
                  to="/login" 
                  className="button button-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="button button-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 