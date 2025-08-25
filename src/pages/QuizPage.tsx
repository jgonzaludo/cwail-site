import React from 'react';
import { ENABLE_QUIZ } from '../lib/flags';

const QuizPage: React.FC = () => {
  if (!ENABLE_QUIZ) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Quiz
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quiz functionality is currently disabled.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Final Quiz
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            [TK] Quiz content coming soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
