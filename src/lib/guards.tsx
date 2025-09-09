import React from 'react';
import { Navigate } from 'react-router-dom';
import { 
  allRequiredCompleted, 
  canAccessQuiz, 
  firstIncompleteRequired 
} from './progress';

interface GuardProps {
  children: React.ReactNode;
  redirectTo: string;
  toast?: (message: string) => void;
}

export function RequireAllRequired({ children, redirectTo, toast }: GuardProps) {
  if (!allRequiredCompleted()) {
    const message = 'Finish all required sections to access this page.';
    if (toast) {
      toast(message);
    }
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}

export function RequireQuizUnlocked({ children, redirectTo, toast }: GuardProps) {
  if (!canAccessQuiz()) {
    const message = 'Complete all required sections to unlock the quiz.';
    if (toast) {
      toast(message);
    }
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}

export function getRedirectPath(): string {
  const firstIncomplete = firstIncompleteRequired();
  return firstIncomplete ? `/course/${firstIncomplete}` : '/course/introduction';
}
