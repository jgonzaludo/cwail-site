import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle, X, Download } from 'lucide-react';

const CoursePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('intro');
  const [email, setEmail] = useState('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleStartModule = () => {
    if (email) {
      setStartTime(new Date());
      setCurrentSection('opening');
    }
  };

  const handleCompleteModule = () => {
    setEndTime(new Date());
    setCurrentSection('celebration');
  };

  const renderIntroSection = () => (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Course Module</h1>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          We only use your email to deliver your certificate. It will not be stored or shared.
        </p>
        <div className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleStartModule}
            disabled={!email}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Start Module
          </button>
        </div>
      </div>
    </div>
  );

  const renderOpeningActivity = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Opening Activity</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">[TK] Opening Activity Content</p>
        <button
          onClick={() => setCurrentSection('evidence')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderEvidenceSection = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Review of the Evidence</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">Students already use LLMs frequently (Ganjavi et al. 2024)</p>
          <p className="text-gray-700 dark:text-gray-300">Uncritical genAI use harms learning (Bastani et al. 2024)</p>
          <p className="text-gray-700 dark:text-gray-300">
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              MIT study links LLM use to cognitive decline
            </a> (Time article)
          </p>
          <p className="text-gray-700 dark:text-gray-300">Students worry about overreliance (Cummings et al. 2024)</p>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Anecdotal Examples</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">[TK] Anecdotal examples section</p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              NY Mag article link placeholder
            </a>
          </p>
        </div>
        
        <button
          onClick={() => setCurrentSection('writing')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderWritingSection = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Why Write Today?</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 space-y-6">
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            [TK] Text explaining writing process: invention/prewriting/drafting/revision/editing/publishing
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            [TK] Visual metaphor (gym/pushups analogy)
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            [TK] Calculator analogy
          </p>
        </div>
        
        <button
          onClick={() => setCurrentSection('ai-usage')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderAIUsageSection = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Using AI in Writing</h2>
      <div className="space-y-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 mr-2" />
            Good Uses
          </h3>
          <ul className="space-y-2 text-green-700 dark:text-gray-300">
            <li>• Brainstorming</li>
            <li>• Sources</li>
            <li>• Reverse-outlines</li>
            <li>• Peer review</li>
            <li>• Grammar/spellcheck</li>
          </ul>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-red-800 mb-4 flex items-center">
            <X className="h-6 w-6 mr-2" />
            Bad Uses
          </h3>
          <ul className="space-y-2 text-red-700 dark:text-gray-300">
            <li>• Drafting full papers</li>
            <li>• Fake sources</li>
            <li>• Masking plagiarism</li>
          </ul>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-yellow-800 mb-4">⚠️ Depends</h3>
          <ul className="space-y-2 text-yellow-700 dark:text-gray-300">
            <li>• Form letters</li>
            <li>• Meeting notes</li>
            <li>• Debugging summaries</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-xl font-semibold text-blue-800 dark:text-gray-100">
            You must still think like a writer.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('professional')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );

  const renderProfessionalSection = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Professional Case for Writing</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          [TK] Strong writing as top industry skill
        </p>
        <button
          onClick={() => setCurrentSection('quiz')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Continue to Quiz
        </button>
      </div>
    </div>
  );

  const renderQuizSection = () => (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Final Quiz</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">[TK] Container for 3–5 questions</p>
        <button
          onClick={handleCompleteModule}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Complete Module
        </button>
      </div>
    </div>
  );

  const renderCelebrationSection = () => (
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Congratulations!</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <p className="text-gray-600 dark:text-gray-400 mb-6">[TK] Celebration content</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center mx-auto">
          <Download className="h-5 w-5 mr-2" />
          Download Certificate
        </button>
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>Certificate includes:</p>
          <p>Email: {email}</p>
          <p>Start: {startTime?.toLocaleString()}</p>
          <p>End: {endTime?.toLocaleString()}</p>
          <p>[TK] CWAIL logo, summary text</p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => setCurrentSection('survey')}
            className="text-blue-600 hover:text-blue-700 underline"
          >
            Continue to Survey
          </button>
        </div>
      </div>
    </div>
  );

  const renderSurveySection = () => (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Survey</h2>
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8">
        <p className="text-gray-600 dark:text-gray-400">[TK] Survey Section</p>
      </div>
    </div>
  );

  const sections = {
    intro: renderIntroSection,
    opening: renderOpeningActivity,
    evidence: renderEvidenceSection,
    writing: renderWritingSection,
    'ai-usage': renderAIUsageSection,
    professional: renderProfessionalSection,
    quiz: renderQuizSection,
    celebration: renderCelebrationSection,
    survey: renderSurveySection
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-300 mb-8">
          <Link to="/" className="hover:text-blue-600 dark:hover:text-orange-400 transition-colors">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-gray-100 font-medium">Course Module</span>
        </nav>

        {sections[currentSection as keyof typeof sections]()}
      </div>
    </div>
  );
};

export default CoursePage;