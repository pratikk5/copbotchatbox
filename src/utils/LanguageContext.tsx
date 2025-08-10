'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Define the LanguageCode type directly in this file instead of importing it
type LanguageCode = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml';

type LanguageContextType = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
};

// Create a context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

type LanguageProviderProps = {
  children: ReactNode;
};

// Provider component that wraps your app and makes language context available
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get the saved language from localStorage or default to 'en'
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Load the saved language from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as LanguageCode | null;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save the language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext; 