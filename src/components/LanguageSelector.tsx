'use client';

import { useState, useEffect, useRef } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

type Language = {
  code: string;
  name: string;
  nativeName: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' }
];

export default function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'en';
    setSelectedLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const changeLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    document.documentElement.lang = langCode;
    setIsOpen(false);
    
    // Dispatch a custom event that other components can listen for
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: langCode } }));
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    if (selectedLang && changeLanguage) {
      changeLanguage(selectedLang as string);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-sm bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-700"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="h-4 w-4 text-blue-400" />
        <span className="hidden sm:inline">{languages.find(lang => lang.code === selectedLanguage)?.nativeName || 'English'}</span>
        <span className="sm:hidden">{languages.find(lang => lang.code === selectedLanguage)?.code.toUpperCase()}</span>
        <ChevronDown className="h-3 w-3 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto">
          {/* Position dropdown based on screen size */}
          <div 
            className={`py-1 w-48 sm:w-48 ${window.innerWidth < 640 && window.innerWidth - dropdownRef.current?.getBoundingClientRect().right! < 100 ? 'right-0' : 'left-0'}`} 
            role="menu" 
            aria-orientation="vertical"
          >
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => changeLanguage(language.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  selectedLanguage === language.code 
                    ? 'bg-gray-700 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                role="menuitem"
              >
                <div className="flex justify-between items-center">
                  <span>{language.nativeName}</span>
                  <span className="text-xs text-gray-400">({language.code})</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 