import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const variants = {
    success: {
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800',
      textColor: 'text-green-800 dark:text-green-200',
      iconColor: 'text-green-600 dark:text-green-400',
      icon: CheckCircle
    },
    info: {
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800',
      textColor: 'text-blue-800 dark:text-blue-200',
      iconColor: 'text-blue-600 dark:text-blue-400',
      icon: CheckCircle
    },
    warning: {
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      icon: CheckCircle
    },
    error: {
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800',
      textColor: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-600 dark:text-red-400',
      icon: CheckCircle
    }
  };

  const config = variants[type];
  const Icon = config.icon;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${config.bgColor} ${config.borderColor} border rounded-lg shadow-lg p-4 animate-in slide-in-from-right-2`}>
      <div className="flex items-start">
        <Icon className={`h-5 w-5 mt-0.5 mr-3 flex-shrink-0 ${config.iconColor}`} />
        <div className={`flex-1 text-sm ${config.textColor}`}>
          {message}
        </div>
        <button
          onClick={onClose}
          className={`ml-3 flex-shrink-0 ${config.textColor} hover:opacity-75 transition-opacity`}
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
