import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import { useAuth } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';

// Auth components
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Onboarding from './components/auth/Onboarding';

// Dashboard components
import Dashboard from './components/dashboard/Dashboard';

// Tutor components
import TutorChat from './components/tutors/TutorChat';
import AiTutorsHub from './components/tutors/AiTutorsHub';

// Course components
import Courses from './components/courses/Courses';

// Assessment components
import Quiz from './components/assessment/Quiz';

// Gamification components
import Achievements from './components/gamification/Achievements';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public routes */}
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              
              {/* Protected routes */}
              <Route path="onboarding" element={
                <ProtectedRoute>
                  <Onboarding />
                </ProtectedRoute>
              } />
              
              <Route path="dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="aitutorhub" element={
                <ProtectedRoute>
                  <AiTutorsHub />
                </ProtectedRoute>
              } />
               <Route path="tutors" element={
                <ProtectedRoute>
                  <TutorChat />
                </ProtectedRoute>
              } />
              
              <Route path="courses" element={
                <ProtectedRoute>
                  <Courses />
                </ProtectedRoute>
              } />
              
              <Route path="quizzes/:quizId" element={
                <ProtectedRoute>
                  <Quiz />
                </ProtectedRoute>
              } />
              
              <Route path="achievements" element={
                <ProtectedRoute>
                  <Achievements />
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
