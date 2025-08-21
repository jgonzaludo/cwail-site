import React from 'react';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  variant: 'info' | 'warning' | 'example';
  text: string;
  className?: string;
}

const Callout: React.FC<CalloutProps> = ({ variant, text, className = '' }) => {
  const variants = {
    info: {
      icon: Info,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    example: {
      icon: Lightbulb,
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-600 dark:text-green-400'
    }
  };

  const config = variants[variant];
  const Icon = config.icon;

  return (
    <div className={`flex items-start p-4 border rounded-lg ${config.bgColor} ${config.borderColor} ${className}`}>
      <Icon className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${config.iconColor}`} />
      <div className={`text-sm ${config.textColor}`}>
        {text}
      </div>
    </div>
  );
};

export default Callout;
