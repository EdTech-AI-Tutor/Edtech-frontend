import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaClock, FaStar, FaChalkboardTeacher, FaFilter, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import './Courses.css';

const Courses = () => {
  const { currentUser } = useAuth();
  const { courses } = useUser();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState([]);
  
  // Sample courses data - in a real app, this would come from the API
  const allCourses = [
    {
      id: 'course1',
      title: 'Introduction to Algebra',
      description: 'Learn the fundamentals of algebra, including equations, inequalities, and functions.',
      subject: 'Mathematics',
      level: 'Beginner',
      duration: '4 weeks',
      lessons: 12,
      instructor: 'AI Math Tutor',
      rating: 4.8,
      enrolled: 1245,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      progress: 0
    },
    {
      id: 'course2',
      title: 'Basic Chemistry Concepts',
      description: 'Explore the fundamental principles of chemistry, including atoms, molecules, and reactions.',
      subject: 'Science',
      level: 'Beginner',
      duration: '6 weeks',
      lessons: 18,
      instructor: 'AI Science Tutor',
      rating: 4.6,
      enrolled: 987,
      image: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      progress: 0
    },
    {
      id: 'course3',
      title: 'World History: Ancient Civilizations',
      description: 'Discover the fascinating history of ancient civilizations, including Egypt, Greece, and Rome.',
      subject: 'History',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 24,
      instructor: 'AI History Tutor',
      rating: 4.9,
      enrolled: 1567,
      image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      progress: 0
    },
    {
      id: 'course4',
      title: 'Introduction to Programming with Python',
      description: 'Learn the basics of programming using Python, one of the most popular and versatile languages.',
      subject: 'Computer Science',
      level: 'Beginner',
      duration: '10 weeks',
      lessons: 30,
      instructor: 'AI Programming Tutor',
      rating: 4.7,
      enrolled: 2345,
      image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      progress: 0
    },
    {
      id: 'course5',
      title: 'Advanced Calculus',
      description: 'Dive deep into calculus concepts including limits, derivatives, integrals, and series.',
      subject: 'Mathematics',
      level: 'Advanced',
      duration: '12 weeks',
      lessons: 36,
      instructor: 'AI Math Tutor',
      rating: 4.5,
      enrolled: 876,
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      progress: 0
    },
    {
      id: 'course6',
      title: 'English Literature: Shakespeare',
      description: 'Explore the works of William Shakespeare, including his plays and sonnets.',
      subject: 'English',
      level: 'Intermediate',
      duration: '8 weeks',
      lessons: 24,
      instructor: 'AI English Tutor',
      rating: 4.8,
      enrolled: 1098,
      image: 'https://images.unsplash.com/photo-1506880135364-e28660dc35fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
      progress: 0
    }
  ];
  
  // Categories for filtering
  const categories = [
    { id: 'all', label: 'All Subjects' },
    { id: 'Mathematics', label: 'Mathematics' },
    { id: 'Science', label: 'Science' },
    { id: 'History', label: 'History' },
    { id: 'Computer Science', label: 'Computer Science' },
    { id: 'English', label: 'English' }
  ];
  
  // Levels for filtering
  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'Beginner', label: 'Beginner' },
    { id: 'Intermediate', label: 'Intermediate' },
    { id: 'Advanced', label: 'Advanced' }
  ];
  
  // Filter courses based on search term, category, and level
  useEffect(() => {
    let filtered = [...allCourses];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.subject.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.subject === selectedCategory);
    }
    
    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }
    
    // Update progress for enrolled courses
    if (courses && courses.length > 0) {
      filtered = filtered.map(course => {
        const enrolledCourse = courses.find(c => c.id === course.id);
        return enrolledCourse ? { ...course, progress: enrolledCourse.progress } : course;
      });
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, courses]);
  
  return (
    <div className="courses-container">
      <h1 className="courses-title">Explore Courses</h1>
      
      <div className="courses-filters">
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search courses..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-selects">
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
          
          <select
            className="filter-select"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            {levels.map(level => (
              <option key={level.id} value={level.id}>
                {level.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-image-wrapper">
              <img src={course.image} alt={course.title} className="course-image" />
            </div>
            
            <div className="course-content">
              <div className="course-tags">
                <span className="course-tag tag-subject">{course.subject}</span>
                <span className="course-tag tag-level">{course.level}</span>
              </div>
              
              <h3 className="course-title">{course.title}</h3>
              <p className="text-gray mb-4">{course.description}</p>
              
              <div className="flex items-center mb-2">
                <FaChalkboardTeacher className="text-primary mr-2" />
                <span className="text-sm">{course.instructor}</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <FaClock className="text-gray mr-2" />
                  <span className="text-sm text-gray">{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <FaBook className="text-gray mr-2" />
                  <span className="text-sm text-gray">{course.lessons} lessons</span>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <FaStar className="text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{course.rating}</span>
                <span className="text-sm text-gray ml-2">({course.enrolled} students)</span>
              </div>
              
              {course.progress > 0 && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            
            <Link 
              to={`/courses/${course.id}`} 
              className="course-button"
            >
              {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
            </Link>
          </div>
        ))}
      </div>
      
      {/* No results state */}
      {filteredCourses.length === 0 && (
        <div className="no-results">
          <h3 className="no-results-title">No courses found</h3>
          <p>Try adjusting your search or filters</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedLevel('all');
            }}
            className="reset-button"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Courses; 