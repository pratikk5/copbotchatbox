'use client';

import { Github } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getTranslation } from '@/utils/translations';

export default function Footer() {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setLanguage(savedLanguage);

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-4 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        
        <div className="mb-4 md:mb-0">
          <p className="text-sm">
            © {new Date().getFullYear()} Pratik — {getTranslation('policeAssistant', language)}. {getTranslation('footer', language)}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <a href="https://github.com/pratikk5/copbotchatbox" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
            <Github className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-4 md:mt-0 text-xs text-gray-500">
          <p>{getTranslation('poweredBy', language)}</p>
        </div>
      </div>
    </footer>
  );
}
