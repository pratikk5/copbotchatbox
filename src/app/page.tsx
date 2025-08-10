'use client';

import { useState, useEffect } from 'react';
import Chat from '@/components/Chat';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecurityTips from '@/components/SecurityTips';
import PoliceTips from '@/components/PoliceTips';
import EmergencyContacts from '@/components/EmergencyContacts';
import { getTranslation } from '@/utils/translations';

export default function Home() {
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Chat />
            <div className="mt-4">
              <EmergencyContacts />
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="space-y-6">
              <SecurityTips />
              <PoliceTips />
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {getTranslation('about', language)}
                </h3>
                <p className="text-sm text-gray-300">
                  {getTranslation('aboutContent', language)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
