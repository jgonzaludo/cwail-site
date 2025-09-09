import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionNav from '../components/SectionNav';
import { getAllRequiredSections, isCompleted } from '../lib/progress';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if all required sections are completed
    const requiredSections = getAllRequiredSections();
    const allCompleted = requiredSections.every(sectionId => isCompleted(sectionId));
    
    if (!allCompleted) {
      // Find the first incomplete section and redirect there
      const firstIncomplete = requiredSections.find(sectionId => !isCompleted(sectionId));
      if (firstIncomplete) {
        navigate(`/course/${firstIncomplete}`);
      } else {
        navigate('/course/introduction');
      }
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SectionNav />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Quiz
          </h1>
          
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Quiz Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              This quiz will test your understanding of the course material.
            </p>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;