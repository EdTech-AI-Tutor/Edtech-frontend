import { FaGraduationCap, FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Logo and description */}
          <div>
            <div className="footer-logo">
              <FaGraduationCap className="h-8 w-8" />
              <span>EduAI</span>
            </div>
            <p className="mb-4 text-gray">
              Revolutionizing education with AI-powered personalized learning experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray">
                <FaTwitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray">
                <FaFacebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray">
                <FaInstagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray">
                <FaLinkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          {/* Quick links */}
          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/tutors">AI Tutors</Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="footer-heading">Resources</h3>
            <ul className="footer-links">
              <li>
                <Link to="/blog">Blog</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/support">Support</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="footer-heading">Contact Us</h3>
            <p className="mb-2 text-gray">Email: info@eduai.com</p>
            <p className="mb-2 text-gray">Phone: +1 (123) 456-7890</p>
            <p className="text-gray">
              123 Education Street<br />
              Learning City, LC 12345
            </p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} EduAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 