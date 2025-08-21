import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for persisted mode
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 shadow-md py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 text-blue-800 hover:text-blue-900 dark:text-blue-400 transition-colors">
            <BookOpen className="h-8 w-8" />
            <span className="text-xl font-bold">[TK] Logo</span>
          </Link>
        </div>
        {/* Nav */}
        <nav className="hidden md:flex space-x-8 mx-auto">
          <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
            Home
          </Link>
          <Link to="/course/introduction" className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
            Course
          </Link>
          <Link to="/lab/tokenization" className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
            Lab
          </Link>
          <Link to="/resources" className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
            Resources
          </Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors">
            Contact
          </Link>
        </nav>
        {/* Dark mode toggle */}
        <div className="flex items-center">
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <span role="img" aria-label="Light mode">🌞</span>
            ) : (
              <span role="img" aria-label="Dark mode">🌙</span>
            )}
          </button>
          {/* Mobile menu button */}
          <button 
            className="md:hidden ml-2 p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile nav */}
      {isMobileMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 dark:border-gray-800 py-4">
          <div className="flex flex-col space-y-2">
            <Link 
              to="/" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-base font-medium rounded-md transition-colors" 
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link 
              to="/course/introduction" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-base font-medium rounded-md transition-colors" 
              onClick={toggleMobileMenu}
            >
              Course
            </Link>
            <Link 
              to="/lab/tokenization" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-base font-medium rounded-md transition-colors" 
              onClick={toggleMobileMenu}
            >
              Lab
            </Link>
            <Link 
              to="/resources" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-base font-medium rounded-md transition-colors" 
              onClick={toggleMobileMenu}
            >
              Resources
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-base font-medium rounded-md transition-colors" 
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 dark:text-gray-200 hover:text-blue-800 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 px-3 py-2 text-base font-medium rounded-md transition-colors" 
              onClick={toggleMobileMenu}
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;