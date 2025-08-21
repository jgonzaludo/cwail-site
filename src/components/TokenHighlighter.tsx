import React from 'react';

interface Token {
  id: number;
  start: number;
  end: number;
  slice: string;
}

interface TokenHighlighterProps {
  text: string;
  tokens: Token[];
  className?: string;
}

const TokenHighlighter: React.FC<TokenHighlighterProps> = ({ text, tokens, className = '' }) => {
  if (!tokens.length) {
    return <span className={className}>{text}</span>;
  }

  const renderTokens = () => {
    const elements: React.ReactNode[] = [];
    let lastEnd = 0;

    tokens.forEach((token, index) => {
      // Add text before this token
      if (token.start > lastEnd) {
        elements.push(
          <span key={`text-${index}`}>
            {text.slice(lastEnd, token.start)}
          </span>
        );
      }

      // Add the token
      elements.push(
        <span
          key={`token-${index}`}
          className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded cursor-help focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          title={`Token ID: ${token.id}`}
          tabIndex={0}
          role="button"
          aria-label={`Token ${token.id}: ${token.slice}`}
        >
          {token.slice}
        </span>
      );

      lastEnd = token.end;
    });

    // Add remaining text
    if (lastEnd < text.length) {
      elements.push(
        <span key="text-end">
          {text.slice(lastEnd)}
        </span>
      );
    }

    return elements;
  };

  return (
    <div className={`inline ${className}`}>
      {renderTokens()}
    </div>
  );
};

export default TokenHighlighter;
