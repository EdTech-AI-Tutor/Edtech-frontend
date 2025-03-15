import { useState, useEffect } from 'react';
import { FaTrophy, FaMedal, FaStar, FaGraduationCap, FaBook, FaChartLine, FaLock } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';
import './Achievements.css';

const Achievements = () => {
  const { achievements, addAchievement } = useUser();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sample achievements data - in a real app, this would be fetched from an API
  const allAchievements = [
    {
      id: 'achievement1',
      title: 'First Steps',
      description: 'Complete your first course',
      points: 50,
      category: 'courses',
      icon: <FaBook className="text-blue-500" />,
      unlocked: true,
      date: '2023-06-10'
    },
    {
      id: 'achievement2',
      title: 'Perfect Score',
      description: 'Get 100% on any quiz',
      points: 100,
      category: 'quizzes',
      icon: <FaStar className="text-yellow-500" />,
      unlocked: true,
      date: '2023-06-08'
    },
    {
      id: 'achievement3',
      title: 'Knowledge Seeker',
      description: 'Complete 5 courses',
      points: 200,
      category: 'courses',
      icon: <FaGraduationCap className="text-indigo-500" />,
      unlocked: false
    },
    {
      id: 'achievement4',
      title: 'Quiz Master',
      description: 'Complete 10 quizzes with a score of 80% or higher',
      points: 300,
      category: 'quizzes',
      icon: <FaTrophy className="text-yellow-500" />,
      unlocked: false
    },
    {
      id: 'achievement5',
      title: 'Consistent Learner',
      description: 'Study for 7 consecutive days',
      points: 150,
      category: 'activity',
      icon: <FaChartLine className="text-green-500" />,
      unlocked: true,
      date: '2023-06-05'
    },
    {
      id: 'achievement6',
      title: 'Subject Expert',
      description: 'Complete all courses in a subject',
      points: 500,
      category: 'courses',
      icon: <FaMedal className="text-purple-500" />,
      unlocked: false
    },
    {
      id: 'achievement7',
      title: 'Early Bird',
      description: 'Study before 8 AM for 5 days',
      points: 100,
      category: 'activity',
      icon: <FaStar className="text-orange-500" />,
      unlocked: false
    },
    {
      id: 'achievement8',
      title: 'Night Owl',
      description: 'Study after 10 PM for 5 days',
      points: 100,
      category: 'activity',
      icon: <FaStar className="text-indigo-500" />,
      unlocked: false
    }
  ];
  
  const [filteredAchievements, setFilteredAchievements] = useState(allAchievements);
  const [totalPoints, setTotalPoints] = useState(0);
  const [unlockedCount, setUnlockedCount] = useState(0);
  
  useEffect(() => {
    // Filter achievements based on selected category
    if (selectedCategory === 'all') {
      setFilteredAchievements(allAchievements);
    } else {
      setFilteredAchievements(allAchievements.filter(a => a.category === selectedCategory));
    }
    
    // Calculate total points and unlocked count
    const unlocked = allAchievements.filter(a => a.unlocked);
    setUnlockedCount(unlocked.length);
    setTotalPoints(unlocked.reduce((sum, a) => sum + a.points, 0));
  }, [selectedCategory]);
  
  const categories = [
    { id: 'all', label: 'All', icon: <FaTrophy /> },
    { id: 'courses', label: 'Courses', icon: <FaBook /> },
    { id: 'quizzes', label: 'Quizzes', icon: <FaChartLine /> },
    { id: 'activity', label: 'Activity', icon: <FaStar /> }
  ];
  
  const handleUnlockAchievement = (achievement) => {
    // In a real app, this would be triggered by actual user actions
    // This is just for demonstration purposes
    if (!achievement.unlocked) {
      const updatedAchievement = {
        ...achievement,
        unlocked: true,
        date: new Date().toISOString().split('T')[0]
      };
      
      // Update the UI
      setFilteredAchievements(prev => 
        prev.map(a => a.id === achievement.id ? updatedAchievement : a)
      );
      
      // Update the global state
      addAchievement(updatedAchievement);
      
      // Update stats
      setUnlockedCount(prev => prev + 1);
      setTotalPoints(prev => prev + achievement.points);
    }
  };
  
  return (
    <div className="py-8">
      <div className="container">
        <div className="achievements-header">
          <h1 className="achievements-title">Achievements & Badges</h1>
          <p>Earn points and unlock achievements as you progress through your learning journey.</p>
          
          <div className="stats-grid">
            <div className="stat-card stat-card-achievements">
              <div className="stat-icon">
                <FaTrophy />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Achievements</p>
                <p className="stat-value">{unlockedCount} / {allAchievements.length}</p>
              </div>
            </div>
            
            <div className="stat-card stat-card-points">
              <div className="stat-icon">
                <FaStar />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Points</p>
                <p className="stat-value">{totalPoints}</p>
              </div>
            </div>
            
            <div className="stat-card stat-card-level">
              <div className="stat-icon">
                <FaMedal />
              </div>
              <div className="stat-content">
                <p className="stat-label">Current Level</p>
                <p className="stat-value">
                  {totalPoints < 100 ? 'Beginner' : 
                   totalPoints < 300 ? 'Intermediate' : 
                   totalPoints < 600 ? 'Advanced' : 'Expert'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="category-filters">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-button ${
                  selectedCategory === category.id ? 'active' : ''
                }`}
              >
                <span>{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="achievements-grid">
          {filteredAchievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-card ${
                !achievement.unlocked ? 'achievement-locked' : 'achievement-unlocked'
              }`}
            >
              <div className="achievement-icon">
                {achievement.unlocked ? (
                  achievement.icon
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <FaLock className="text-gray-500" />
                  </div>
                )}
              </div>
              <div className="achievement-content">
                <h3 className="font-bold">{achievement.title}</h3>
                <p className="text-sm text-gray mt-1">{achievement.description}</p>
                <div className="flex justify-between mt-2">
                  <span className="text-xs font-medium text-primary">+{achievement.points} points</span>
                  {achievement.unlocked && (
                    <span className="text-xs text-gray">Unlocked: {achievement.date}</span>
                  )}
                </div>
              </div>
              
              {!achievement.unlocked && (
                <div className="card-footer">
                  <button 
                    onClick={() => handleUnlockAchievement(achievement)}
                    className="button button-secondary w-full text-center"
                  >
                    Unlock (Demo)
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="progress-section">
          <h2 className="text-xl font-bold mb-4">Progress to Next Level</h2>
          
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray">
                {totalPoints < 100 ? 'Beginner to Intermediate' : 
                 totalPoints < 300 ? 'Intermediate to Advanced' : 
                 totalPoints < 600 ? 'Advanced to Expert' : 'Expert'}
              </span>
              <span className="text-sm font-medium text-gray">
                {totalPoints < 100 ? `${totalPoints}/100` : 
                 totalPoints < 300 ? `${totalPoints}/300` : 
                 totalPoints < 600 ? `${totalPoints}/600` : `${totalPoints}/1000`}
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${totalPoints < 100 ? (totalPoints / 100) * 100 : 
                          totalPoints < 300 ? (totalPoints / 300) * 100 : 
                          totalPoints < 600 ? (totalPoints / 600) * 100 : 
                          (totalPoints / 1000) * 100}%` 
                }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray">
            {totalPoints < 100 ? 
              `Earn ${100 - totalPoints} more points to reach Intermediate level.` : 
             totalPoints < 300 ? 
              `Earn ${300 - totalPoints} more points to reach Advanced level.` : 
             totalPoints < 600 ? 
              `Earn ${600 - totalPoints} more points to reach Expert level.` : 
              `You've reached the highest level! Keep earning achievements to increase your total score.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Achievements; 