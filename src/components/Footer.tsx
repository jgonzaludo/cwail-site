import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">CWAIL</span>
            </div>
            <p className="text-gray-300 mb-4">
              [TK] Affiliations/Origin
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">[TK] Links</h3>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/course" className="block text-gray-300 hover:text-white transition-colors">
                Course Module
              </Link>
              <Link to="/resources" className="block text-gray-300 hover:text-white transition-colors">
                Resources
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          
          <div>
            <p className="text-gray-400 text-sm">
              [TK] Copyright
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;