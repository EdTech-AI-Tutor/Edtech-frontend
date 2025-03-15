import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [learningGoals, setLearningGoals] = useState([]);
  const [assignedTutor, setAssignedTutor] = useState(null);
  const [courses, setCourses] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      // In a real app, you would fetch this data from an API
      const storedProfile = localStorage.getItem(`profile_${currentUser.id}`);
      if (storedProfile) {
        setUserProfile(JSON.parse(storedProfile));
      }
      
      const storedGoals = localStorage.getItem(`goals_${currentUser.id}`);
      if (storedGoals) {
        setLearningGoals(JSON.parse(storedGoals));
      }
      
      const storedTutor = localStorage.getItem(`tutor_${currentUser.id}`);
      if (storedTutor) {
        setAssignedTutor(JSON.parse(storedTutor));
      }
      
      const storedCourses = localStorage.getItem(`courses_${currentUser.id}`);
      if (storedCourses) {
        setCourses(JSON.parse(storedCourses));
      }
      
      const storedQuizzes = localStorage.getItem(`quizzes_${currentUser.id}`);
      if (storedQuizzes) {
        setQuizzes(JSON.parse(storedQuizzes));
      }
      
      const storedAchievements = localStorage.getItem(`achievements_${currentUser.id}`);
      if (storedAchievements) {
        setAchievements(JSON.parse(storedAchievements));
      }
    } else {
      // Reset state if user logs out
      setUserProfile(null);
      setLearningGoals([]);
      setAssignedTutor(null);
      setCourses([]);
      setQuizzes([]);
      setAchievements([]);
    }
    setLoading(false);
  }, [currentUser]);

  // Update user profile
  const updateProfile = (profileData) => {
    if (!currentUser) return false;
    
    const updatedProfile = { ...userProfile, ...profileData };
    localStorage.setItem(`profile_${currentUser.id}`, JSON.stringify(updatedProfile));
    setUserProfile(updatedProfile);
    return true;
  };

  // Set learning goals
  const updateLearningGoals = (goals) => {
    if (!currentUser) return false;
    
    localStorage.setItem(`goals_${currentUser.id}`, JSON.stringify(goals));
    setLearningGoals(goals);
    return true;
  };

  // Assign AI tutor
  const assignTutor = (tutor) => {
    if (!currentUser) return false;
    
    localStorage.setItem(`tutor_${currentUser.id}`, JSON.stringify(tutor));
    setAssignedTutor(tutor);
    return true;
  };

  // Add a course
  const addCourse = (course) => {
    if (!currentUser) return false;
    
    const updatedCourses = [...courses, course];
    localStorage.setItem(`courses_${currentUser.id}`, JSON.stringify(updatedCourses));
    setCourses(updatedCourses);
    return true;
  };

  // Add a quiz result
  const addQuizResult = (quiz) => {
    if (!currentUser) return false;
    
    const updatedQuizzes = [...quizzes, quiz];
    localStorage.setItem(`quizzes_${currentUser.id}`, JSON.stringify(updatedQuizzes));
    setQuizzes(updatedQuizzes);
    return true;
  };

  // Add an achievement
  const addAchievement = (achievement) => {
    if (!currentUser) return false;
    
    const updatedAchievements = [...achievements, achievement];
    localStorage.setItem(`achievements_${currentUser.id}`, JSON.stringify(updatedAchievements));
    setAchievements(updatedAchievements);
    return true;
  };

  const value = {
    userProfile,
    learningGoals,
    assignedTutor,
    courses,
    quizzes,
    achievements,
    updateProfile,
    updateLearningGoals,
    assignTutor,
    addCourse,
    addQuizResult,
    addAchievement,
    loading
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export default UserContext; 