'use client';

import { Shield, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSelector from './LanguageSelector';
import { getTranslation } from '@/utils/translations';

export default function Header() {
  const [language, setLanguage] = useState('en');

  // Listen for language changes
  useEffect(() => {
    // Load initial language
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    // Listen for language change events
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <header className="bg-black text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center space-x-2 mb-3 sm:mb-0">
          <Shield className="h-8 w-8 text-blue-500" />
          <h1 className="text-xl font-bold">{getTranslation('policeAssistant', language)}</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center">
          <LanguageSelector />
          <div className="flex items-center space-x-1 text-xs sm:text-sm bg-green-800 px-2 sm:px-3 py-1 rounded-full">
            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-green-400" />
            <span>{getTranslation('available24_7', language)}</span>
          </div>
        </div>
      </div>
    </header>
  );
} 