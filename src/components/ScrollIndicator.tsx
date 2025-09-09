import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const ScrollIndicator: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll percentage
      const scrollPercentage = scrollTop / (documentHeight - windowHeight);
      
      // Fade out as user scrolls down
      const newOpacity = Math.max(0, 1 - scrollPercentage * 3); // Fade out faster
      setOpacity(newOpacity);
      
      // Hide completely when scrolled down enough
      setIsVisible(scrollPercentage < 0.3);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('section:nth-of-type(2)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-auto"
      style={{ opacity }}
    >
      <div className="bg-white/20 dark:bg-black/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/30 dark:border-white/20">
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center text-black dark:text-white hover:text-orange-500 dark:hover:text-orange-300 transition-colors duration-300 group"
          aria-label="Scroll down to learn more"
        >
          <span className="text-sm font-medium mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
            Scroll down to learn more
          </span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default ScrollIndicator;
