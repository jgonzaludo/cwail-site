import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import SectionNav from '../components/SectionNav';
import ProgressBar from '../components/ProgressBar';
import Accordion from '../components/Accordion';
import Callout from '../components/Callout';
import Toast from '../components/Toast';
import PartingMessageModal from '../components/PartingMessageModal';
import { setCompleted, isCompleted, getProgressPercentage, nextSectionId, canAccessConclusion, canAccessPartingMessage } from '../lib/progress';

interface Block {
  type: 'h2' | 'p' | 'accordion' | 'callout' | 'cta';
  text: string;
  variant?: 'info' | 'warning' | 'example' | 'next';
  items?: { title: string; content: string }[];
  href?: string;
}

interface Section {
  id?: string;
  title: string;
  blocks?: Block[];
  sections?: { title: string; content: string }[];
  content?: string;
  examples?: { title: string; content: string }[];
  moduleId?: string;
  lead?: string;
  keyTakeaways?: string[];
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
  const [showPartingModal, setShowPartingModal] = useState(false);
  const [conclusionResponse, setConclusionResponse] = useState('');
  const [aiDisclosure, setAiDisclosure] = useState('');
  const [otherExplanation, setOtherExplanation] = useState('');
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Listen for custom event to open parting message
    const handleOpenPartingMessage = () => {
      setShowPartingModal(true);
    };

    window.addEventListener('openPartingMessage', handleOpenPartingMessage);
    
    return () => {
      window.removeEventListener('openPartingMessage', handleOpenPartingMessage);
    };
  }, []);

  useEffect(() => {
    const loadSection = async () => {
      if (!sectionId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/content/sections/${sectionId}.json`);
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
      // If completing conclusion, show parting message modal
      if (sectionId === 'conclusion' && isChecked) {
        setShowPartingModal(true);
        return;
      }
      
      const next = nextSectionId(sectionId);
      if (next) {
        navigate(`/course/${next}`);
      }
    }
  };

  const handleProceedToQuiz = () => {
    setShowPartingModal(false);
    navigate('/quiz');
  };

  const handleConclusionSubmit = () => {
    if (!conclusionResponse.trim() || !aiDisclosure) {
      setToastMessage('Please complete both the response and AI disclosure before submitting.');
      setShowToast(true);
      return;
    }

    // Save to localStorage
    const conclusionData = {
      response: conclusionResponse,
      aiDisclosure: aiDisclosure,
      otherExplanation: otherExplanation,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('conclusion-response', JSON.stringify(conclusionData));

    // Mark as complete
    if (sectionId) {
      setIsChecked(true);
      setCompleted(sectionId, true);
      setToastMessage('Response submitted successfully!');
      setShowToast(true);
      
      // Show parting message modal after successful submission
      setShowPartingModal(true);
      
      // Also dispatch custom event as fallback
      window.dispatchEvent(new CustomEvent('openPartingMessage'));
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

  const renderNewStructure = () => {
    if (!section?.sections) return null;
    
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {section.title}
        </h1>
        <Accordion 
          items={section.sections} 
          className="mb-6"
        />
        <button
          onClick={handleNext}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next section
        </button>
      </div>
    );
  };

  const renderContentWithExamples = () => {
    if (!section?.content) return null;
    
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {section.title}
        </h1>
        
        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
            {section.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Examples accordion */}
        {section.examples && section.examples.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Examples
            </h2>
            <div className="space-y-2">
              {section.examples.map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => {
                      const newOpenItems = new Set(openItems);
                      if (newOpenItems.has(index)) {
                        newOpenItems.delete(index);
                      } else {
                        newOpenItems.add(index);
                      }
                      setOpenItems(newOpenItems);
                    }}
                    className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    aria-expanded={openItems.has(index)}
                    aria-controls={`accordion-content-${index}`}
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </span>
                    {openItems.has(index) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  {openItems.has(index) && (
                    <div
                      id={`accordion-content-${index}`}
                      className="px-4 py-3 text-gray-700 dark:text-gray-300"
                    >
                      {item.content.split('\n\n').map((paragraph, pIndex) => {
                        if (paragraph.startsWith('**Example:**')) {
                          const exampleText = paragraph.replace('**Example:**', '').trim();
                          return (
                            <div key={pIndex} className="mt-4">
                              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                                <div className="flex items-start space-x-2">
                                  <span className="text-green-600 dark:text-green-400 font-semibold text-sm">Example:</span>
                                  <span className="text-green-800 dark:text-green-200 italic">
                                    {exampleText}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <p key={pIndex} className="mb-4">
                            {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n•/g, '\n•')}
                          </p>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next section
        </button>
      </div>
    );
  };

  const renderLeadWithAccordions = () => {
    if (!section?.lead || !section?.sections) {
      console.warn('Missing required fields for lead + accordions format:', {
        hasLead: !!section?.lead,
        hasSections: !!section?.sections,
        moduleId: section?.moduleId
      });
      return null;
    }
    
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {section.title}
        </h1>
        
        {/* Lead summary card */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Overview
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {section.lead}
          </p>
          
          {section.keyTakeaways && section.keyTakeaways.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                Key Takeaways
              </h3>
              <ul className="space-y-2">
                {section.keyTakeaways.map((takeaway, index) => (
                  <li key={index} className="flex items-start space-x-2 text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Visual separator */}
        <hr className="border-gray-200 dark:border-gray-600 mb-6" />

        {/* Accordions */}
        {section.sections.length > 0 ? (
          <div className="mb-6">
            <div className="space-y-2">
              {section.sections.map((item, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <button
                    onClick={() => {
                      const newOpenItems = new Set(openItems);
                      if (newOpenItems.has(index)) {
                        newOpenItems.delete(index);
                      } else {
                        newOpenItems.add(index);
                      }
                      setOpenItems(newOpenItems);
                    }}
                    className="w-full px-4 py-3 text-left flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    aria-expanded={openItems.has(index)}
                    aria-controls={`accordion-content-${index}`}
                  >
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {item.title}
                    </span>
                    {openItems.has(index) ? (
                      <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    )}
                  </button>
                  {openItems.has(index) && (
                    <div
                      id={`accordion-content-${index}`}
                      className="px-4 py-3 text-gray-700 dark:text-gray-300"
                    >
                      {item.content.split('\n\n').map((paragraph, pIndex) => (
                        <div key={pIndex} className="mb-4">
                          {paragraph.split('\n').map((line, lIndex) => {
                            if (line.startsWith('**') && line.endsWith('**')) {
                              return (
                                <p key={lIndex} className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                  {line.replace(/\*\*/g, '')}
                                </p>
                              );
                            } else if (line.startsWith('•')) {
                              return (
                                <p key={lIndex} className="ml-4 text-gray-700 dark:text-gray-300">
                                  {line}
                                </p>
                              );
                            } else {
                              return (
                                <p key={lIndex} className="text-gray-700 dark:text-gray-300">
                                  {line}
                                </p>
                              );
                            }
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 dark:text-yellow-200">
              Content coming soon.
            </p>
          </div>
        )}

        {/* Next button */}
        <button
          onClick={handleNext}
          className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Next section
        </button>
      </div>
    );
  };

  const renderConclusionContent = () => {
    if (!section?.content) return null;
    
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          {section.title}
        </h1>
        
        {/* Main content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
          <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
            {section.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('Student task:') || paragraph.startsWith('UX notes:')) {
                return null; // Skip these sections as they're implementation notes
              }
              return (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Response form */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Your Response
          </h3>
          <textarea
            value={conclusionResponse}
            onChange={(e) => setConclusionResponse(e.target.value)}
            placeholder="Please explain your reasoning for your earlier conclusion and justify your specific recommendation..."
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 resize-none"
          />
        </div>

        {/* AI Disclosure */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            AI Usage Disclosure
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Did you use AI to generate your earlier response?
          </p>
          
          <div className="space-y-3">
            {[
              "I didn't use any AI when I wrote my earlier response.",
              "I consulted an AI tool for help, but I wrote my response myself.",
              "I used AI to generate most or all of my earlier response.",
              "Other"
            ].map((option, index) => (
              <label key={index} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="aiDisclosure"
                  value={option}
                  checked={aiDisclosure === option}
                  onChange={(e) => setAiDisclosure(e.target.value)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
              </label>
            ))}
          </div>

          {aiDisclosure === "Other" && (
            <div className="mt-4">
              <textarea
                value={otherExplanation}
                onChange={(e) => setOtherExplanation(e.target.value)}
                placeholder="Please explain..."
                className="w-full h-20 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100 resize-none"
              />
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          onClick={handleConclusionSubmit}
          className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
        >
          Submit Response
        </button>
      </div>
    );
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
          {sectionId === 'conclusion' && section.content ? (
            renderConclusionContent()
          ) : section.lead && section.sections ? (
            renderLeadWithAccordions()
          ) : section.content && section.examples ? (
            renderContentWithExamples()
          ) : section.sections ? (
            renderNewStructure()
          ) : (
            section.blocks?.map((block, index) => renderBlock(block, index))
          )}
          
          {/* Completion Checkbox - only show for non-conclusion sections */}
          {sectionId !== 'conclusion' && (
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
          )}
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

      {/* Parting Message Modal */}
      <PartingMessageModal
        isOpen={showPartingModal}
        onClose={() => setShowPartingModal(false)}
        onProceed={handleProceedToQuiz}
      />
    </div>
  );
};

export default CoursePage;