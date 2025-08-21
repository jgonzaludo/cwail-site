import React from 'react';
import { ENABLE_CERT } from '../lib/flags';

const CelebrationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            🎉 Congratulations!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            You've completed the AI Literacy course!
          </p>
          {ENABLE_CERT ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-green-800 dark:text-green-200">
                Your certificate is being generated...
              </p>
            </div>
          ) : (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-blue-800 dark:text-blue-200">
                Certificate coming soon.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CelebrationPage;
