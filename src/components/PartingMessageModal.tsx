import React from 'react';
import { X } from 'lucide-react';

interface PartingMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
}

const PartingMessageModal: React.FC<PartingMessageModalProps> = ({ 
  isOpen, 
  onClose, 
  onProceed 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              A Parting Message
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <p className="leading-relaxed">
              The preceding exercise was not intended to shame, ridicule, or pass judgment. 
              Rather, it was intended as a simple demonstration of a dynamic that most students 
              and teachers are already very familiar with: when it comes to learning, there's 
              no substitute for actually doing the work.
            </p>
            
            <p className="leading-relaxed">
              AI technology is an incredible tool whose applications we are probably only 
              beginning to grasp. LLMs are already quite powerful, and will probably become 
              even more powerful in short order. They are almost certain to cause some changes 
              in higher education.
            </p>
            
            <p className="leading-relaxed">
              However, despite the impressive qualities of AI and LLMs, these things are not, 
              and cannot be, perfect substitutes for human brains. They can do things that your 
              brain cannot. But your brain can also do things that they cannot. Education gives 
              you an opportunity to make that larger category bigger. Don't waste it.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="px-6 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium transition-colors"
            >
              Close
            </button>
            <button
              onClick={onProceed}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Proceed to Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartingMessageModal;
