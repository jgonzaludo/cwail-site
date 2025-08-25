import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SectionNav from '../components/SectionNav';
import ProgressBar from '../components/ProgressBar';
import Accordion from '../components/Accordion';
import Callout from '../components/Callout';
import Toast from '../components/Toast';
import { setCompleted, isCompleted, getProgressPercentage, nextSectionId, canAccessConclusion, canAccessPartingMessage } from '../lib/progress';

interface Block {
  type: 'h2' | 'p' | 'accordion' | 'callout' | 'cta';
  text: string;
  variant?: 'info' | 'warning' | 'example' | 'next';
  items?: { title: string; content: string }[];
  href?: string;
}

interface Section {
  id: string;
  title: string;
  blocks: Block[];
}

const CoursePage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const loadSection = async () => {
      if (!sectionId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/src/content/sections/${sectionId}.json`);
        if (!response.ok) {
          throw new Error(`Section not found: ${sectionId}`);
        }
        const sectionData = await response.json();
        setSection(sectionData);
        setIsChecked(isCompleted(sectionId));
      } catch (err) {
        console.error('Failed to load section:', err);
        setError(err instanceof Error ? err.message : 'Failed to load section');
      } finally {
        setLoading(false);
      }
    };

    loadSection();
  }, [sectionId]);

  const handleCheckboxChange = (checked: boolean) => {
    if (sectionId) {
      setIsChecked(checked);
      setCompleted(sectionId, checked);
      setToastMessage(checked ? 'Marked complete' : 'Marked incomplete');
      setShowToast(true);
    }
  };

  const handleNext = () => {
    if (sectionId) {
      const next = nextSectionId(sectionId);
      if (next) {
        navigate(`/course/${next}`);
      }
    }
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'h2':
        return (
          <h2 key={index} className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {block.text}
          </h2>
        );
      
      case 'p':
        return (
          <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            {block.text}
          </p>
        );
      
      case 'accordion':
        return (
          <Accordion 
            key={index} 
            items={block.items || []} 
            className="mb-6"
          />
        );
      
      case 'callout':
        return (
          <Callout 
            key={index}
            variant={(block.variant as 'info' | 'warning' | 'example') || 'info'}
            text={block.text}
            className="mb-6"
          />
        );
      
      case 'cta':
        if (block.variant === 'next') {
          return (
            <button
              key={index}
              onClick={handleNext}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {block.text}
            </button>
          );
        }
        return (
          <button
            key={index}
            className="inline-flex items-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            {block.text}
          </button>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SectionNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SectionNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!section) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SectionNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <p className="text-yellow-800 dark:text-yellow-200">Section not found.</p>
          </div>
        </div>
      </div>
    );
  }

  // Check gating for conclusion and parting-message
  if (sectionId === 'conclusion' && !canAccessConclusion()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SectionNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Finish all required sections to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (sectionId === 'parting-message' && !canAccessPartingMessage()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <SectionNav />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">
              Finish all required sections to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SectionNav />
      
      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Course Progress
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {getProgressPercentage()}%
            </span>
          </div>
          <ProgressBar percentage={getProgressPercentage()} />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {section.blocks.map((block, index) => renderBlock(block, index))}
          
          {/* Completion Checkbox */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors"
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Mark this section as complete
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default CoursePage;