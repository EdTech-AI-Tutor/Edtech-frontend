import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaChartLine, FaTrophy, FaCalendarAlt, FaUserGraduate, FaBrain, FaRocket, FaLightbulb, FaBell, FaStar, FaArrowRight, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import './Dashboard.css';
const Dashboard = () => {
  const { currentUser } = useAuth();
  const { 
    userProfile, 
    learningGoals, 
    assignedTutor, 
    courses, 
    quizzes, 
    achievements 
  } = useUser();
  
  const [completedCourses, setCompletedCourses] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  
  useEffect(() => {
    // Calculate dashboard metrics
    if (courses && courses.length > 0) {
      const completed = courses.filter(course => course.completed).length;
      setCompletedCourses(completed);
    }
    
    if (quizzes && quizzes.length > 0) {
      const total = quizzes.reduce((sum, quiz) => sum + quiz.score, 0);
      setAverageScore(Math.round(total / quizzes.length));
    }
    
    if (achievements && achievements.length > 0) {
      const points = achievements.reduce((sum, achievement) => sum + achievement.points, 0);
      setTotalPoints(points);
    }
  }, [courses, quizzes, achievements]);
  
  // Sample recommended courses
  const recommendedCourses = [
    {
      id: 'course1',
      title: 'Introduction to Algebra',
      subject: 'Mathematics',
      level: 'Beginner',
      duration: '4 weeks',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'course2',
      title: 'Basic Chemistry Concepts',
      subject: 'Science',
      level: 'Beginner',
      duration: '6 weeks',
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: 'course3',
      title: 'World History: Ancient Civilizations',
      subject: 'History',
      level: 'Intermediate',
      duration: '8 weeks',
      image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ];
  
  // Sample upcoming quizzes
  const upcomingQuizzes = [
    {
      id: 'quiz1',
      title: 'Algebra Fundamentals',
      subject: 'Mathematics',
      date: '2023-06-15',
      questions: 20
    },
    {
      id: 'quiz2',
      title: 'Chemical Reactions',
      subject: 'Science',
      date: '2023-06-18',
      questions: 15
    }
  ];
  
  // Sample recent achievements
  const recentAchievements = [
    {
      id: 'achievement1',
      title: 'First Course Completed',
      description: 'Completed your first course',
      points: 50,
      date: '2023-06-10',
      icon: <FaGraduationCap className="text-yellow-500" />
    },
    {
      id: 'achievement2',
      title: 'Perfect Score',
      description: 'Achieved 100% on a quiz',
      points: 100,
      date: '2023-06-08',
      icon: <FaTrophy className="text-yellow-500" />
    }
  ];
  
  // Sample data for dashboard
  const recentCourses = [
    {
      id: 1,
      title: 'Advanced Machine Learning',
      progress: 68,
      lastAccessed: '2 days ago',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Introduction to Quantum Physics',
      progress: 42,
      lastAccessed: '5 days ago',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Web Development Bootcamp',
      progress: 89,
      lastAccessed: 'Yesterday',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'AI Study Group Session',
      date: 'Tomorrow, 3:00 PM',
      type: 'Group Study'
    },
    {
      id: 2,
      title: 'Physics Quiz',
      date: 'Friday, 2:00 PM',
      type: 'Assessment'
    },
    {
      id: 3,
      title: 'Web Development Workshop',
      date: 'Saturday, 10:00 AM',
      type: 'Workshop'
    }
  ];

  const learningStats = [
    {
      title: 'Study Hours',
      value: '24h',
      change: '+12%',
      icon: <FaChartLine />,
      color: 'blue'
    },
    {
      title: 'Completed Lessons',
      value: '42',
      change: '+8',
      icon: <FaCheckCircle />,
      color: 'green'
    },
    {
      title: 'Quiz Score Avg',
      value: '92%',
      change: '+5%',
      icon: <FaBrain />,
      color: 'purple'
    },
    {
      title: 'Learning Streak',
      value: '15',
      change: '+3',
      icon: <FaRocket />,
      color: 'orange'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Data Structures & Algorithms',
      level: 'Intermediate',
      match: '95%',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Artificial Intelligence Ethics',
      level: 'Advanced',
      match: '87%',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <>
            {/* Learning Stats */}
            <div className="dashboard-stats mb-8">
              {learningStats.map((stat, index) => (
                <div className={`dashboard-stat-card dashboard-stat-${stat.color}`} key={index}>
                  <div className="dashboard-stat-icon">
                    {stat.icon}
                  </div>
                  <div className="dashboard-stat-info">
                    <h3 className="dashboard-stat-title">{stat.title}</h3>
                    <div className="dashboard-stat-value">{stat.value}</div>
                    <div className="dashboard-stat-change">{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Courses */}
            <div className="dashboard-section mb-8">
              <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">Continue Learning</h2>
                <Link to="/courses" className="dashboard-link">
                  View All Courses <FaArrowRight />
                </Link>
              </div>
              <div className="dashboard-courses">
                {recentCourses.map(course => (
                  <div className="dashboard-course-card" key={course.id}>
                    <div className="dashboard-course-image">
                      <img src={course.image} alt={course.title} />
                      <div className="dashboard-course-progress-wrapper">
                        <div 
                          className="dashboard-course-progress" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="dashboard-course-content">
                      <h3 className="dashboard-course-title">{course.title}</h3>
                      <div className="dashboard-course-meta">
                        <span>{course.progress}% complete</span>
                        <span>Last accessed: {course.lastAccessed}</span>
                      </div>
                      <Link to={`/courses/${course.id}`} className="dashboard-course-button">
                        Continue <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="dashboard-section mb-8">
              <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">Upcoming Events</h2>
                <Link to="/calendar" className="dashboard-link">
                  View Calendar <FaArrowRight />
                </Link>
              </div>
              <div className="dashboard-events">
                {upcomingEvents.map(event => (
                  <div className="dashboard-event-card" key={event.id}>
                    <div className="dashboard-event-icon">
                      <FaCalendarAlt />
                    </div>
                    <div className="dashboard-event-content">
                      <h3 className="dashboard-event-title">{event.title}</h3>
                      <div className="dashboard-event-meta">
                        <span className="dashboard-event-date">{event.date}</span>
                        <span className="dashboard-event-type">{event.type}</span>
                      </div>
                    </div>
                    <button className="dashboard-event-button">
                      <FaBell />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="dashboard-section">
              <div className="dashboard-section-header">
                <h2 className="dashboard-section-title">Recommended For You</h2>
                <Link to="/recommendations" className="dashboard-link">
                  View All <FaArrowRight />
                </Link>
              </div>
              <div className="dashboard-recommendations">
                {recommendations.map(item => (
                  <div className="dashboard-recommendation-card" key={item.id}>
                    <div className="dashboard-recommendation-image">
                      <img src={item.image} alt={item.title} />
                      <div className="dashboard-recommendation-match">{item.match} Match</div>
                    </div>
                    <div className="dashboard-recommendation-content">
                      <h3 className="dashboard-recommendation-title">{item.title}</h3>
                      <div className="dashboard-recommendation-level">{item.level}</div>
                      <Link to={`/courses/${item.id}`} className="dashboard-recommendation-button">
                        View Course <FaArrowRight />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'achievements':
        return (
          <div className="dashboard-achievements">
            <div className="dashboard-section-header mb-6">
              <h2 className="dashboard-section-title">Your Achievements</h2>
              <div className="dashboard-achievement-points">
                <FaStar className="text-yellow-500" />
                <span>250 Points Earned</span>
              </div>
            </div>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div className="dashboard-achievement-card" key={achievement.id}>
                  <div className="dashboard-achievement-icon">
                    {achievement.icon}
                  </div>
                  <div className="dashboard-achievement-content">
                    <h3 className="dashboard-achievement-title">{achievement.title}</h3>
                    <p className="dashboard-achievement-description">{achievement.description}</p>
                    <div className="dashboard-achievement-meta">
                      <span className="dashboard-achievement-points">+{achievement.points} pts</span>
                      <span className="dashboard-achievement-date">Earned on {achievement.date}</span>
                    </div>
                  </div>
                </div>
              ))}
              <div className="dashboard-achievement-card dashboard-achievement-locked">
                <div className="dashboard-achievement-icon">
                  <FaLightbulb className="text-gray-400" />
                </div>
                <div className="dashboard-achievement-content">
                  <h3 className="dashboard-achievement-title">Knowledge Seeker</h3>
                  <p className="dashboard-achievement-description">Complete 10 different courses</p>
                  <div className="dashboard-achievement-progress">
                    <div className="dashboard-achievement-progress-bar">
                      <div className="dashboard-achievement-progress-fill" style={{ width: '30%' }}></div>
                    </div>
                    <span>3/10 completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'tutor':
        return (
          <div className="dashboard-tutor">
            <div className="dashboard-tutor-card">
              <div className="dashboard-tutor-header">
                <div className="dashboard-tutor-avatar">
                  <img src={assignedTutor.image} alt={assignedTutor.name} />
                </div>
                <div className="dashboard-tutor-info">
                  <h2 className="dashboard-tutor-name">{assignedTutor.name}</h2>
                  <div className="dashboard-tutor-subject">{assignedTutor.subject} Specialist</div>
                  <div className="dashboard-tutor-rating">
                    <div className="dashboard-tutor-stars">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(assignedTutor.rating) ? "text-yellow-500" : "text-gray-300"} />
                      ))}
                    </div>
                    <span>{assignedTutor.rating}</span>
                  </div>
                </div>
              </div>
              <div className="dashboard-tutor-actions">
                <Link to="/chat" className="btn btn-primary">
                  Start Conversation
                </Link>
                <Link to="/schedule" className="btn btn-outline">
                  Schedule Session
                </Link>
              </div>
              <div className="dashboard-tutor-features">
                <div className="dashboard-tutor-feature">
                  <FaBook />
                  <span>Personalized Learning Path</span>
                </div>
                <div className="dashboard-tutor-feature">
                  <FaBrain />
                  <span>Adaptive Teaching Methods</span>
                </div>
                <div className="dashboard-tutor-feature">
                  <FaRocket />
                  <span>Real-time Problem Solving</span>
                </div>
              </div>
            </div>
            <div className="dashboard-tutor-history">
              <h3 className="dashboard-section-title">Recent Interactions</h3>
              <div className="dashboard-tutor-sessions">
                <div className="dashboard-tutor-session">
                  <div className="dashboard-tutor-session-date">Yesterday</div>
                  <div className="dashboard-tutor-session-title">Physics Problem Solving</div>
                  <div className="dashboard-tutor-session-duration">45 minutes</div>
                </div>
                <div className="dashboard-tutor-session">
                  <div className="dashboard-tutor-session-date">June 18, 2023</div>
                  <div className="dashboard-tutor-session-title">Quantum Mechanics Review</div>
                  <div className="dashboard-tutor-session-duration">60 minutes</div>
                </div>
                <div className="dashboard-tutor-session">
                  <div className="dashboard-tutor-session-date">June 15, 2023</div>
                  <div className="dashboard-tutor-session-title">Homework Assistance</div>
                  <div className="dashboard-tutor-session-duration">30 minutes</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ai-dashboard-container">
      {/* Welcome Banner */}
      <div className="ai-dashboard-welcome">
        <div className="ai-dashboard-welcome-content">
          <h1>Welcome back, {currentUser?.name || 'Student'}!</h1>
          <p>Continue your learning journey with personalized AI tutoring.</p>
        </div>
        {assignedTutor && (
          <div className="ai-dashboard-welcome-tutor">
            <div className="ai-dashboard-welcome-tutor-avatar">
              <img src={assignedTutor.image} alt={assignedTutor.name} />
            </div>
            <div className="ai-dashboard-welcome-tutor-info">
              <div className="ai-dashboard-welcome-tutor-label">Your AI Tutor</div>
              <div className="ai-dashboard-welcome-tutor-name">{assignedTutor.name}</div>
            </div>
            <Link to="/chat" className="ai-dashboard-btn ai-dashboard-btn-primary ai-dashboard-btn-sm">
              Chat Now
            </Link>
          </div>
        )}
      </div>

      {/* Dashboard Navigation */}
      <div className="ai-dashboard-tabs">
        <button 
          className={`ai-dashboard-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FaChartLine />
          <span>Overview</span>
        </button>
        <button 
          className={`ai-dashboard-tab ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          <FaTrophy />
          <span>Achievements</span>
        </button>
        <button 
          className={`ai-dashboard-tab ${activeTab === 'tutor' ? 'active' : ''}`}
          onClick={() => setActiveTab('tutor')}
        >
          <FaUserGraduate />
          <span>AI Tutor</span>
        </button>
      </div>

      {/* Dashboard Content */}
      <div className="ai-dashboard-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Dashboard; 