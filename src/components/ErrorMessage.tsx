'use client';

import { AlertTriangle, XCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="bg-red-900/50 border border-red-700 rounded-lg p-3 mb-4 flex items-start">
      <AlertTriangle className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="text-sm text-white">{message}</p>
      </div>
      <button 
        onClick={onDismiss}
        className="text-gray-400 hover:text-white"
        aria-label="Dismiss error"
      >
        <XCircle className="h-5 w-5" />
      </button>
    </div>
  );
} 