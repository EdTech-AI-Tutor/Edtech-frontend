import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaMicrochip, FaCalculator, FaAtom, FaBook, 
  FaHistory, FaCode, FaLanguage, FaChartBar,
  FaDownload, FaQuestionCircle, FaPuzzlePiece
} from 'react-icons/fa';
import './AiTutorsHub.css';

const AiTutorsHub = () => {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const tutors = [
    {
      id: 1,
      name: "MathMaster AI",
      subject: "Mathematics",
      specialization: ["Algebra", "Calculus", "Geometry", "Statistics"],
      icon: <FaCalculator />,
      color: "#4f46e5",
      description: "Expert in breaking down complex mathematical concepts",
      rating: 4.8,
      studentsHelped: 1234,
      availableFeatures: ["Chat", "Practice Problems", "Video Explanations", "Notes"]
    },
    {
      id: 2,
      name: "ScienceGenius AI",
      subject: "Science",
      specialization: ["Physics", "Chemistry", "Biology"],
      icon: <FaAtom />,
      color: "#10b981",
      description: "Your guide through scientific concepts and experiments",
      rating: 4.9,
      studentsHelped: 987,
      availableFeatures: ["Chat", "Lab Simulations", "Quiz", "Study Material"]
    },
    {
      id: 3,
      name: "HistoryGuide AI",
      subject: "History",
      specialization: ["World History", "Ancient Civilizations", "Modern Era"],
      icon: <FaHistory />,
      color: "#f59e0b",
      description: "Making history come alive through interactive learning",
      rating: 4.7,
      studentsHelped: 756,
      availableFeatures: ["Chat", "Timeline Explorer", "Quiz", "Documents"]
    },
    {
      id: 4,
      name: "CodeMentor AI",
      subject: "Programming",
      specialization: ["Python", "JavaScript", "Java", "Web Development"],
      icon: <FaCode />,
      color: "#3b82f6",
      description: "Your coding companion for learning programming",
      rating: 4.9,
      studentsHelped: 1567,
      availableFeatures: ["Chat", "Code Practice", "Projects", "Documentation"]
    }
  ];

  return (
    <div className="tutors-hub-container">
      <div className="tutors-hub-header">
        <h1 className="tutors-hub-title">AI Tutors Hub</h1>
        <p className="tutors-hub-subtitle">
          Choose your specialized AI tutor and start learning
        </p>
      </div>

      {/* Subject Filter */}
      <div className="tutors-filter">
        <button 
          className={`filter-btn ${selectedSubject === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedSubject('all')}
        >
          All Subjects
        </button>
        {Array.from(new Set(tutors.map(tutor => tutor.subject))).map(subject => (
          <button
            key={subject}
            className={`filter-btn ${selectedSubject === subject ? 'active' : ''}`}
            onClick={() => setSelectedSubject(subject)}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Tutors Grid */}
      <div className="tutors-grid">
        {tutors
          .filter(tutor => selectedSubject === 'all' || tutor.subject === selectedSubject)
          .map(tutor => (
            <div key={tutor.id} className="tutor-card">
              <div className="tutor-card-header" style={{ background: tutor.color }}>
                <div className="tutor-icon">{tutor.icon}</div>
                <h3 className="tutor-name">{tutor.name}</h3>
                <p className="tutor-subject">{tutor.subject}</p>
              </div>

              <div className="tutor-card-content">
                <p className="tutor-description">{tutor.description}</p>
                
                <div className="tutor-stats">
                  <div className="stat">
                    <span className="stat-value">{tutor.rating}</span>
                    <span className="stat-label">Rating</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{tutor.studentsHelped}</span>
                    <span className="stat-label">Students</span>
                  </div>
                </div>

                <div className="tutor-specializations">
                  {tutor.specialization.map(spec => (
                    <span key={spec} className="specialization-tag">
                      {spec}
                    </span>
                  ))}
                </div>

                <div className="tutor-features">
                  <h4>Available Features:</h4>
                  <div className="features-grid">
                    {tutor.availableFeatures.map(feature => (
                      <div key={feature} className="feature-item">
                        {getFeatureIcon(feature)}
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="tutor-actions">
                  <Link to={`/chat/${tutor.id}`} className="action-btn chat-btn">
                    Start Chat
                  </Link>
                  <Link to={`/tutor/${tutor.id}`} className="action-btn explore-btn">
                    Explore Resources
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

// Helper function to get feature icons
const getFeatureIcon = (feature) => {
  switch (feature) {
    case 'Chat':
      return <FaMicrochip />;
    case 'Quiz':
      return <FaQuestionCircle />;
    case 'Notes':
    case 'Study Material':
    case 'Documentation':
      return <FaDownload />;
    case 'Practice Problems':
    case 'Code Practice':
      return <FaPuzzlePiece />;
    default:
      return <FaBook />;
  }
};

export default AiTutorsHub; 