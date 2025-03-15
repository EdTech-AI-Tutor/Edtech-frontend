import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaRobot, FaChartLine, FaBook, FaTrophy, FaCheck, FaLightbulb, FaUsers, FaLaptop, FaBrain, FaStar, FaUserGraduate, FaAward, FaGlobe, FaArrowRight, FaCertificate, FaQuoteLeft } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();
  
  // Stats data
  const stats = [
    { value: '98%', label: 'Student Satisfaction', icon: <FaStar /> },
    { value: '15K+', label: 'Active Students', icon: <FaUsers /> },
    { value: '200+', label: 'Expert Instructors', icon: <FaUserGraduate /> },
    { value: '50+', label: 'Countries Reached', icon: <FaGlobe /> }
  ];
  
  // Features data
  const features = [
    {
      icon: <FaGraduationCap />,
      title: 'Expert-Led Courses',
      description: 'Learn from industry professionals with real-world experience and proven teaching methods.',
      link: '/courses'
    },
    {
      icon: <FaLaptop />,
      title: 'Interactive Learning',
      description: 'Engage with hands-on projects, quizzes, and collaborative exercises that reinforce concepts.',
      link: '/demo'
    },
    {
      icon: <FaUsers />,
      title: 'Community Support',
      description: 'Join a thriving community of learners and instructors for networking and collaboration.',
      link: '/community'
    },
    {
      icon: <FaChartLine />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics and personalized recommendations.',
      link: '/dashboard'
    },
    {
      icon: <FaBook />,
      title: 'Comprehensive Library',
      description: 'Access a vast collection of resources, including videos, articles, and downloadable materials.',
      link: '/resources'
    },
    {
      icon: <FaCertificate />,
      title: 'Recognized Certification',
      description: 'Earn industry-recognized certificates to showcase your skills and boost your career.',
      link: '/certificates'
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      content: "This platform completely transformed my learning experience. The AI tutors provided personalized guidance that helped me grasp complex concepts I had been struggling with for months.",
      name: "Sarah Johnson",
      role: "Computer Science Student",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      rating: 5
    },
    {
      content: "As a working professional, I needed a flexible learning solution. This platform allowed me to study at my own pace while receiving quality instruction that was tailored to my learning style.",
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5
    },
    {
      content: "The adaptive learning paths were a game-changer for my daughter. She improved her math grades significantly within just two months of using the platform.",
      name: "Emily Rodriguez",
      role: "Parent",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      rating: 4
    }
  ];

  return (
    <div className="home">
      {/* Hero section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Transform Your Learning Experience with AI</h1>
          <p>Personalized education powered by artificial intelligence to help you master any subject at your own pace.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/demo" className="btn btn-secondary">Try Demo</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1597733336794-12d05021d510?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="AI Tutoring Platform" />
          <div className="hero-badge">AI-Powered Learning</div>
        </div>
      </section>

      {/* Stats section */}
      <section className="stats-section">
        <div className="stats">
          {stats.map((stat, index) => (
            <div className="stat" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features section */}
      <section className="features-section">
        <div className="features-title">
          <h2>Why Choose Our Platform</h2>
          <p>Discover the unique advantages that make our learning experience stand out from the rest</p>
        </div>
        <div className="features">
          {features.map((feature, index) => (
            <div className="feature" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <a href={feature.link} className="feature-link">
                Learn more <FaArrowRight />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials section */}
      <section className="testimonials-section">
        <div className="testimonials-title">
          <h2>What Our Students Say</h2>
          <p>Hear from learners who have transformed their educational journey with our platform</p>
        </div>
        <div className="testimonials">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial" key={index}>
              <p className="testimonial-content">{testimonial.content}</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img src={testimonial.avatar} alt={testimonial.name} />
                </div>
                <div className="testimonial-info">
                  <div className="testimonial-name">{testimonial.name}</div>
                  <div className="testimonial-role">{testimonial.role}</div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="cta-section">
        <div className="cta-background"></div>
        <div className="cta-container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Transform Your Learning Experience?</h2>
            <p className="cta-description">
              Join thousands of students who are already benefiting from our AI-powered educational platform. 
              Start your journey today and unlock your full learning potential.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary btn-lg">Get Started for Free</Link>
              <Link to="/pricing" className="btn btn-outline btn-lg">View Pricing Plans</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Slogan section */}
      <section className="slogan">
        <div className="slogan-content">
          <h2>Education is the passport to the future, for tomorrow belongs to those who prepare for it today.</h2>
          <p>- Malcolm X</p>
        </div>
      </section>
    </div>
  );
};

export default Home; 