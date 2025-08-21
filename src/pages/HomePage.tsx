import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, FileText, Mail } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-700 text-white dark:from-orange-900 dark:via-orange-800 dark:to-blue-700 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              AI is here. We all use it. Let's use it well.
            </h1>
            <div className="space-y-4">
              <Link 
                to="/course" 
                className="inline-flex items-center bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mr-4 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Begin the 15‑Minute Module
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <div className="mt-4">
                <Link 
                  to="/resources" 
                  className="text-blue-100 hover:text-white underline text-lg dark:text-orange-100 dark:hover:text-white"
                >
                  Browse Classroom Resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Overview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/course" className="group">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-orange-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-orange-900 rounded-lg mb-6 group-hover:bg-blue-200 dark:group-hover:bg-orange-800 transition-colors">
                  <BookOpen className="h-6 w-6 text-blue-600 dark:text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Course Module</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Complete the 15-minute AI literacy module
                </p>
              </div>
            </Link>
            
            <Link to="/resources" className="group">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 dark:border-gray-800 hover:border-cyan-200 dark:hover:border-green-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-cyan-100 dark:bg-green-900 rounded-lg mb-6 group-hover:bg-cyan-200 dark:group-hover:bg-green-800 transition-colors">
                  <FileText className="h-6 w-6 text-cyan-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Resources</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Access classroom resources and materials
                </p>
              </div>
            </Link>
            
            <Link to="/about" className="group">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 dark:border-gray-800 hover:border-green-200 dark:hover:border-cyan-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-cyan-900 rounded-lg mb-6 group-hover:bg-green-200 dark:group-hover:bg-cyan-800 transition-colors">
                  <Users className="h-6 w-6 text-green-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">About</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Learn about the CWAIL project
                </p>
              </div>
            </Link>
            
            <Link to="/contact" className="group">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 h-full border border-gray-100 dark:border-gray-800 hover:border-orange-200 dark:hover:border-blue-200 transform hover:-translate-y-1">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-blue-900 rounded-lg mb-6 group-hover:bg-orange-200 dark:group-hover:bg-blue-800 transition-colors">
                  <Mail className="h-6 w-6 text-orange-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Contact</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get in touch with our team
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-orange-400 mr-3">•</span>
                Evidence shows that uncritical AI use hurts learning outcomes.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-orange-400 mr-3">•</span>
                Teachers are redesigning coursework to AI-proof their classrooms.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-orange-400 mr-3">•</span>
                Writing is especially at risk; learning how to write well is more important than ever.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-orange-400 mr-3">•</span>
                AI can still be used well—this site will show how.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-orange-400 mr-3">•</span>
                Education should help students become mentally agile and intellectually confident.
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 dark:text-orange-400 mr-3">•</span>
                True learning is possible—but only if students are <strong>AI literate</strong>.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;