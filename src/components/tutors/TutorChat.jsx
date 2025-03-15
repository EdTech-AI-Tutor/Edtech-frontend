import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaImage, FaFile, FaMicrophone, FaStop } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import './TutorChat.css';

const TutorChat = () => {
  const { currentUser } = useAuth();
  const { assignedTutor } = useUser();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      content: `Hello! I'm your AI tutor for today. How can I help you with your studies?`,
      timestamp: new Date().toISOString(),
    }
  ]);
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim() && !selectedFile) return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date().toISOString(),
      attachment: selectedFile ? {
        name: selectedFile.name,
        type: selectedFile.type,
        url: URL.createObjectURL(selectedFile)
      } : null
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setSelectedFile(null);
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const handleRecordToggle = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording logic would go here
      console.log('Started recording');
    } else {
      // Stop recording and process audio would go here
      console.log('Stopped recording');
      
      // Simulate processing voice to text
      setTimeout(() => {
        setInput(prev => prev + ' I am speaking through voice recognition.');
      }, 1000);
    }
  };
  
  // Simple AI response generator
  const generateAIResponse = (userInput) => {
    const responses = [
      "That's a great question! Let me explain...",
      "I understand what you're asking. Here's how it works...",
      "Let me break this down for you step by step...",
      "That's an interesting topic. Here's what you need to know...",
      "I can definitely help you with that. Let's explore this concept..."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    let aiContent = randomResponse;
    
    // Add more detailed response based on keywords in user input
    if (userInput.toLowerCase().includes('math') || userInput.toLowerCase().includes('algebra')) {
      aiContent += " In mathematics, it's important to understand the fundamental concepts before moving to more complex topics. Let's start with the basics and build from there.";
    } else if (userInput.toLowerCase().includes('science') || userInput.toLowerCase().includes('chemistry')) {
      aiContent += " Science is all about observation, hypothesis, and experimentation. Let's explore this scientific concept in more detail.";
    } else if (userInput.toLowerCase().includes('history')) {
      aiContent += " Understanding historical context is crucial for interpreting events. Let's examine the historical factors that influenced this period.";
    } else {
      aiContent += " I'm here to help you understand this topic better. Let's break it down into manageable parts and tackle it step by step.";
    }
    
    return {
      id: messages.length + 2,
      sender: 'ai',
      content: aiContent,
      timestamp: new Date().toISOString(),
    };
  };
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-navbar">
        <div className="chat-tutor-info">
          <div className="chat-avatar">
            <FaRobot />
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold text-white">
              {assignedTutor ? assignedTutor.name : 'AI Tutor'}
            </h1>
            <p className="text-sm text-white opacity-80">
              {assignedTutor ? `Expert in ${assignedTutor.subject}` : 'Your personal learning assistant'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="chat-messages">
        <div className="container">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-indigo-100 ml-3' : 'feature-icon mr-3'
                  }`}>
                    {message.sender === 'user' ? (
                      <FaUser className="text-primary" />
                    ) : (
                      <FaRobot className="text-white" />
                    )}
                  </div>
                  
                  <div>
                    <div className={message.sender === 'user' ? 'message-user' : 'message-ai'}>
                      <p>{message.content}</p>
                      
                      {message.attachment && (
                        <div className="mt-2 p-2 bg-gray-50 rounded">
                          {message.attachment.type.startsWith('image/') ? (
                            <img 
                              src={message.attachment.url} 
                              alt="Attachment" 
                              className="max-h-40 rounded"
                            />
                          ) : (
                            <div className="flex items-center text-sm text-gray">
                              <FaFile className="mr-2" />
                              <span>{message.attachment.name}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className={`text-xs text-gray mt-1 ${message.sender === 'user' ? 'text-right' : ''}`}>
                      {formatTimestamp(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%]">
                  <div className="feature-icon mr-3">
                    <FaRobot className="text-white" />
                  </div>
                  <div className="message-ai">
                    <div className="flex gap-2">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
      
      {/* Input area */}
      <div className="chat-input">
        <div className="container">
          {selectedFile && (
            <div className="file-preview">
              <div className="file-preview-info">
                <div className="flex items-center">
                  {selectedFile.type.startsWith('image/') ? (
                    <FaImage className="text-primary mr-2" />
                  ) : (
                    <FaFile className="text-primary mr-2" />
                  )}
                  <span className="text-sm text-gray truncate max-w-xs">{selectedFile.name}</span>
                </div>
                <button 
                  onClick={() => setSelectedFile(null)}
                  className="text-gray hover:text-dark"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
          
          <div className="chat-form">
            <button 
              onClick={handleFileButtonClick}
              className="chat-button"
            >
              <FaImage />
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*,.pdf,.doc,.docx"
            />
            
            <button 
              onClick={handleRecordToggle}
              className={`chat-button ${isRecording ? 'recording-indicator' : ''}`}
            >
              {isRecording ? <FaStop /> : <FaMicrophone />}
            </button>
            
            <div className="flex-grow mx-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI tutor anything..."
                className="chat-textarea"
                rows="1"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() && !selectedFile}
              className={`chat-send-button ${
                !input.trim() && !selectedFile ? 'disabled' : ''
              }`}
            >
              <FaPaperPlane />
            </button>
          </div>
          
          <p className="text-xs text-gray mt-2">
            Your AI tutor is here to help with your questions and provide personalized explanations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TutorChat; 