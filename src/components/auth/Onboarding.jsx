import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaGraduationCap, FaBook, FaLightbulb, FaChalkboardTeacher } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const Onboarding = () => {
  const { currentUser } = useAuth();
  const { updateProfile, updateLearningGoals, assignTutor } = useUser();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Step 1: Learning goals
  const [selectedGoals, setSelectedGoals] = useState([]);
  
  // Step 2: Strengths and weaknesses
  const [strengths, setStrengths] = useState([]);
  const [weaknesses, setWeaknesses] = useState([]);
  
  // Step 3: Learning style
  const [learningStyle, setLearningStyle] = useState('');
  
  // Step 4: Subject preferences
  const [subjects, setSubjects] = useState([]);
  
  const goals = [
    { id: 'improve_grades', label: 'Improve my grades' },
    { id: 'learn_new_skills', label: 'Learn new skills' },
    { id: 'prepare_for_exams', label: 'Prepare for exams' },
    { id: 'advance_career', label: 'Advance my career' },
    { id: 'personal_growth', label: 'Personal growth' },
    { id: 'help_with_homework', label: 'Help with homework' },
  ];
  
  const strengthOptions = [
    { id: 'problem_solving', label: 'Problem Solving' },
    { id: 'critical_thinking', label: 'Critical Thinking' },
    { id: 'memorization', label: 'Memorization' },
    { id: 'creativity', label: 'Creativity' },
    { id: 'communication', label: 'Communication' },
    { id: 'organization', label: 'Organization' },
  ];
  
  const weaknessOptions = [
    { id: 'procrastination', label: 'Procrastination' },
    { id: 'test_anxiety', label: 'Test Anxiety' },
    { id: 'time_management', label: 'Time Management' },
    { id: 'focus', label: 'Maintaining Focus' },
    { id: 'note_taking', label: 'Note Taking' },
    { id: 'understanding_complex_topics', label: 'Understanding Complex Topics' },
  ];
  
  const learningStyles = [
    { id: 'visual', label: 'Visual', icon: FaBook, description: 'You learn best through images, diagrams, and visual aids.' },
    { id: 'auditory', label: 'Auditory', icon: FaChalkboardTeacher, description: 'You learn best through listening and verbal explanations.' },
    { id: 'reading_writing', label: 'Reading/Writing', icon: FaGraduationCap, description: 'You learn best through reading and writing information.' },
    { id: 'kinesthetic', label: 'Kinesthetic', icon: FaLightbulb, description: 'You learn best through hands-on activities and practical exercises.' },
  ];
  
  const subjectOptions = [
    { id: 'math', label: 'Mathematics' },
    { id: 'science', label: 'Science' },
    { id: 'english', label: 'English' },
    { id: 'history', label: 'History' },
    { id: 'computer_science', label: 'Computer Science' },
    { id: 'foreign_languages', label: 'Foreign Languages' },
    { id: 'arts', label: 'Arts' },
    { id: 'business', label: 'Business' },
  ];
  
  const handleGoalToggle = (goalId) => {
    if (selectedGoals.includes(goalId)) {
      setSelectedGoals(selectedGoals.filter(id => id !== goalId));
    } else {
      setSelectedGoals([...selectedGoals, goalId]);
    }
  };
  
  const handleStrengthToggle = (strengthId) => {
    if (strengths.includes(strengthId)) {
      setStrengths(strengths.filter(id => id !== strengthId));
    } else {
      setStrengths([...strengths, strengthId]);
    }
  };
  
  const handleWeaknessToggle = (weaknessId) => {
    if (weaknesses.includes(weaknessId)) {
      setWeaknesses(weaknesses.filter(id => id !== weaknessId));
    } else {
      setWeaknesses([...weaknesses, weaknessId]);
    }
  };
  
  const handleSubjectToggle = (subjectId) => {
    if (subjects.includes(subjectId)) {
      setSubjects(subjects.filter(id => id !== subjectId));
    } else {
      setSubjects([...subjects, subjectId]);
    }
  };
  
  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleComplete = async () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setLoading(true);
    
    try {
      // Update user profile with onboarding information
      updateProfile({
        learningStyle,
        strengths,
        weaknesses,
        subjects,
        onboardingCompleted: true,
      });
      
      // Update learning goals
      updateLearningGoals(selectedGoals);
      
      // Assign an AI tutor based on preferences
      // In a real app, this would be more sophisticated
      const primarySubject = subjects[0] || 'general';
      assignTutor({
        id: `tutor_${primarySubject}`,
        name: `AI Tutor for ${primarySubject.charAt(0).toUpperCase() + primarySubject.slice(1)}`,
        subject: primarySubject,
        expertise: subjects,
      });
      
      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const isNextDisabled = () => {
    switch (step) {
      case 1:
        return selectedGoals.length === 0;
      case 2:
        return strengths.length === 0 || weaknesses.length === 0;
      case 3:
        return !learningStyle;
      case 4:
        return subjects.length === 0;
      default:
        return false;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step - 1) * 33.33}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step 1: Learning Goals */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What are your learning goals?</h2>
              <p className="text-gray-600 mb-6">Select all that apply to you.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {goals.map((goal) => (
                  <div 
                    key={goal.id}
                    onClick={() => handleGoalToggle(goal.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedGoals.includes(goal.id) 
                        ? 'border-indigo-600 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={selectedGoals.includes(goal.id)}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="ml-3 text-gray-800">{goal.label}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 2: Strengths and Weaknesses */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What are your strengths and weaknesses?</h2>
              <p className="text-gray-600 mb-6">This helps us personalize your learning experience.</p>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Strengths (select at least one)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strengthOptions.map((strength) => (
                    <div 
                      key={strength.id}
                      onClick={() => handleStrengthToggle(strength.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        strengths.includes(strength.id) 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={strengths.includes(strength.id)}
                          onChange={() => {}}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-gray-800">{strength.label}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Areas to Improve (select at least one)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {weaknessOptions.map((weakness) => (
                    <div 
                      key={weakness.id}
                      onClick={() => handleWeaknessToggle(weakness.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        weaknesses.includes(weakness.id) 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          checked={weaknesses.includes(weakness.id)}
                          onChange={() => {}}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-3 text-gray-800">{weakness.label}</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Step 3: Learning Style */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What's your preferred learning style?</h2>
              <p className="text-gray-600 mb-6">This helps us tailor content to your preferences.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {learningStyles.map((style) => {
                  const Icon = style.icon;
                  return (
                    <div 
                      key={style.id}
                      onClick={() => setLearningStyle(style.id)}
                      className={`p-6 border rounded-lg cursor-pointer transition-all ${
                        learningStyle === style.id 
                          ? 'border-indigo-600 bg-indigo-50' 
                          : 'border-gray-300 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center">
                        <Icon className={`h-10 w-10 mb-3 ${learningStyle === style.id ? 'text-indigo-600' : 'text-gray-500'}`} />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{style.label}</h3>
                        <p className="text-sm text-gray-600">{style.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Step 4: Subject Preferences */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Which subjects are you interested in?</h2>
              <p className="text-gray-600 mb-6">Select all that apply to you.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {subjectOptions.map((subject) => (
                  <div 
                    key={subject.id}
                    onClick={() => handleSubjectToggle(subject.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      subjects.includes(subject.id) 
                        ? 'border-indigo-600 bg-indigo-50' 
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        checked={subjects.includes(subject.id)}
                        onChange={() => {}}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="ml-3 text-gray-800">{subject.label}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Step 5: Summary */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Perfect! We're all set.</h2>
              <p className="text-gray-600 mb-6">
                Based on your preferences, we've created a personalized learning experience for you.
              </p>
              
              <div className="bg-indigo-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-medium text-indigo-800 mb-4">Your Learning Profile</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">Learning Goals:</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-700">
                      {selectedGoals.map((goalId) => (
                        <li key={goalId}>
                          {goals.find(g => g.id === goalId)?.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">Learning Style:</h4>
                    <p className="mt-1 text-gray-700">
                      {learningStyles.find(s => s.id === learningStyle)?.label}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-indigo-700">Subjects:</h4>
                    <ul className="mt-1 list-disc list-inside text-gray-700">
                      {subjects.map((subjectId) => (
                        <li key={subjectId}>
                          {subjectOptions.find(s => s.id === subjectId)?.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6">
                Your AI tutor is ready to help you achieve your learning goals. Let's get started!
              </p>
            </div>
          )}
          
          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaArrowLeft className="mr-2" /> Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 5 ? (
              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className={`flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 ${
                  isNextDisabled() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? 'Processing...' : 'Get Started'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding; 