import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaCheck, FaTimes, FaClock, FaArrowRight, FaArrowLeft, FaRedo } from 'react-icons/fa';
import { useUser } from '../../context/UserContext';

const Quiz = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { addQuizResult } = useUser();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  
  // Sample quiz data - in a real app, this would be fetched from an API
  useEffect(() => {
    // Simulate API call to fetch quiz data
    setTimeout(() => {
      const sampleQuiz = {
        id: quizId || 'quiz1',
        title: 'Algebra Fundamentals',
        subject: 'Mathematics',
        description: 'Test your knowledge of basic algebraic concepts',
        timeLimit: 600, // 10 minutes in seconds
        questions: [
          {
            id: 'q1',
            text: 'What is the value of x in the equation 2x + 5 = 13?',
            type: 'multiple-choice',
            options: [
              { id: 'a', text: '3' },
              { id: 'b', text: '4' },
              { id: 'c', text: '5' },
              { id: 'd', text: '6' }
            ],
            correctAnswer: 'b'
          },
          {
            id: 'q2',
            text: 'Simplify the expression: 3(2x - 4) + 5',
            type: 'multiple-choice',
            options: [
              { id: 'a', text: '6x - 7' },
              { id: 'b', text: '6x - 12 + 5' },
              { id: 'c', text: '6x - 7' },
              { id: 'd', text: '6x + 5' }
            ],
            correctAnswer: 'c'
          },
          {
            id: 'q3',
            text: 'If f(x) = 2x² + 3x - 5, what is f(2)?',
            type: 'multiple-choice',
            options: [
              { id: 'a', text: '9' },
              { id: 'b', text: '11' },
              { id: 'c', text: '13' },
              { id: 'd', text: '15' }
            ],
            correctAnswer: 'a'
          },
          {
            id: 'q4',
            text: 'Solve for x: 3x - 7 = 8',
            type: 'multiple-choice',
            options: [
              { id: 'a', text: 'x = 3' },
              { id: 'b', text: 'x = 5' },
              { id: 'c', text: 'x = 7' },
              { id: 'd', text: 'x = 15/3' }
            ],
            correctAnswer: 'b'
          },
          {
            id: 'q5',
            text: 'Which of the following is a quadratic equation?',
            type: 'multiple-choice',
            options: [
              { id: 'a', text: 'y = 3x + 2' },
              { id: 'b', text: 'y = x³ - 4' },
              { id: 'c', text: 'y = x² - 5x + 6' },
              { id: 'd', text: 'y = 2^x' }
            ],
            correctAnswer: 'c'
          }
        ]
      };
      
      setQuiz(sampleQuiz);
      setTimeLeft(sampleQuiz.timeLimit);
      setLoading(false);
    }, 1000);
  }, [quizId]);
  
  // Timer countdown
  useEffect(() => {
    if (loading || quizCompleted || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [loading, quizCompleted, timeLeft]);
  
  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerId
    });
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    if (!quiz) return;
    
    // Calculate score
    let correctAnswers = 0;
    quiz.questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);
    
    // Save quiz result
    addQuizResult({
      id: `result_${Date.now()}`,
      quizId: quiz.id,
      title: quiz.title,
      subject: quiz.subject,
      score: finalScore,
      date: new Date().toISOString(),
      timeSpent: quiz.timeLimit - timeLeft
    });
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const handleRetakeQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setQuizCompleted(false);
    setTimeLeft(quiz.timeLimit);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-700">Quiz not found</p>
          <button 
            onClick={() => navigate('/quizzes')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }
  
  if (quizCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{quiz.title} - Results</h1>
              <p className="text-gray-600">{quiz.subject}</p>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6 mb-8 text-center">
              <h2 className="text-2xl font-bold text-indigo-800 mb-2">Your Score</h2>
              <div className="text-5xl font-bold text-indigo-600 mb-4">{score}%</div>
              <p className="text-gray-700">
                You answered {quiz.questions.filter(q => selectedAnswers[q.id] === q.correctAnswer).length} out of {quiz.questions.length} questions correctly.
              </p>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Question Review</h3>
              
              <div className="space-y-6">
                {quiz.questions.map((question, index) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mr-3 ${
                        selectedAnswers[question.id] === question.correctAnswer 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {selectedAnswers[question.id] === question.correctAnswer ? (
                          <FaCheck className="h-4 w-4" />
                        ) : (
                          <FaTimes className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                        <p className="mt-1 text-gray-700">{question.text}</p>
                        
                        <div className="mt-3 space-y-2">
                          {question.options.map(option => (
                            <div 
                              key={option.id} 
                              className={`p-2 rounded ${
                                option.id === question.correctAnswer 
                                  ? 'bg-green-100 border border-green-300' 
                                  : option.id === selectedAnswers[question.id] && option.id !== question.correctAnswer
                                    ? 'bg-red-100 border border-red-300'
                                    : 'bg-gray-50 border border-gray-200'
                              }`}
                            >
                              <div className="flex items-center">
                                <div className="h-4 w-4 mr-2">
                                  {option.id === question.correctAnswer && (
                                    <FaCheck className="text-green-600" />
                                  )}
                                  {option.id === selectedAnswers[question.id] && option.id !== question.correctAnswer && (
                                    <FaTimes className="text-red-600" />
                                  )}
                                </div>
                                <span>{option.text}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Back to Dashboard
              </button>
              
              <button 
                onClick={handleRetakeQuiz}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                <FaRedo className="mr-2" /> Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const currentQ = quiz.questions[currentQuestion];
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600">{quiz.subject}</p>
            </div>
            
            <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-full">
              <FaClock className="text-indigo-600 mr-2" />
              <span className="font-medium text-indigo-800">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{currentQuestion + 1} of {quiz.questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Question {currentQuestion + 1}: {currentQ.text}
            </h2>
            
            <div className="space-y-3">
              {currentQ.options.map(option => (
                <div 
                  key={option.id}
                  onClick={() => handleAnswerSelect(currentQ.id, option.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedAnswers[currentQ.id] === option.id 
                      ? 'border-indigo-600 bg-indigo-50' 
                      : 'border-gray-300 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                      selectedAnswers[currentQ.id] === option.id 
                        ? 'border-indigo-600 bg-indigo-600' 
                        : 'border-gray-400'
                    }`}>
                      {selectedAnswers[currentQ.id] === option.id && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                    <span className="ml-3 text-gray-800">{option.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button 
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`flex items-center px-4 py-2 border rounded-md ${
                currentQuestion === 0 
                  ? 'border-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FaArrowLeft className="mr-2" /> Previous
            </button>
            
            {currentQuestion < quiz.questions.length - 1 ? (
              <button 
                onClick={handleNextQuestion}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button 
                onClick={handleSubmitQuiz}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <div className="flex flex-wrap justify-center gap-2 max-w-md">
            {quiz.questions.map((q, index) => (
              <button 
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentQuestion === index 
                    ? 'bg-indigo-600 text-white' 
                    : selectedAnswers[q.id] 
                      ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' 
                      : 'bg-white text-gray-700 border border-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz; 