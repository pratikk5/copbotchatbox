'use client';

import { useState, useEffect } from 'react';
import { Phone, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { getTranslation } from '@/utils/translations';

export default function EmergencyContacts() {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState('en');
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLanguage = localStorage.getItem('preferredLanguage');
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChange', handleLanguageChange as EventListener);

    return () => {
      window.removeEventListener('languageChange', handleLanguageChange as EventListener);
    };
  }, []);

  const getEmergencyContacts = (lang: string) => [
    { 
      number: '100', 
      name: getTranslation('policeEmergency', lang),
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      icon: '👮‍♂️'
    },
    { 
      number: '1091', 
      name: getTranslation('womenHelpline', lang),
      color: 'bg-pink-600',
      hoverColor: 'hover:bg-pink-700',
      icon: '👩'
    },
    { 
      number: '1098', 
      name: getTranslation('childHelpline', lang),
      color: 'bg-purple-600',
      hoverColor: 'hover:bg-purple-700',
      icon: '👶'
    },
    { 
      number: '108', 
      name: getTranslation('medicalEmergency', lang),
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      icon: '🚑'
    },
    { 
      number: '1930', 
      name: getTranslation('cyberCrime', lang),
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
      icon: '💻'
    },
    { 
      number: '112', 
      name: getTranslation('nationalEmergency', lang),
      color: 'bg-yellow-600',
      hoverColor: 'hover:bg-yellow-700',
      icon: '🆘'
    },
  ];

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  // Server-side and initial client render
  if (!mounted) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="w-full p-3 bg-red-700">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-white" />
            <h2 className="text-lg font-bold text-white">Emergency Contacts</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
      {/* Header Section */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 bg-red-700 flex items-center justify-between cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-white" />
          <h2 className="text-lg font-bold text-white">
            {getTranslation('emergencyContacts', language)}
          </h2>
        </div>
        <div className="md:hidden text-white">
          {isExpanded ? 
            <ChevronUp className="h-5 w-5" /> : 
            <ChevronDown className="h-5 w-5" />
          }
        </div>
      </div>

      {/* Quick Access Row - Always visible on mobile */}
      <div className="md:hidden bg-gray-800 p-2 flex justify-between gap-2 overflow-x-auto">
        {getEmergencyContacts(language).slice(0, 3).map((contact) => (
          <button
            key={`quick-${contact.number}`}
            onClick={() => handleCall(contact.number)}
            className={`flex-1 ${contact.color} rounded-md p-2 text-white text-center`}
            suppressHydrationWarning
          >
            <div className="text-lg">{contact.icon}</div>
            <div className="font-bold text-sm">{contact.number}</div>
          </button>
        ))}
      </div>

      {/* Expanded Content */}
      <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="p-3">
          {/* Emergency Numbers Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {getEmergencyContacts(language).map((contact) => (
              <button
                key={contact.number}
                onClick={() => handleCall(contact.number)}
                className={`${contact.color} ${contact.hoverColor} text-white rounded-md p-2 
                          flex items-center justify-between transition-colors`}
                suppressHydrationWarning
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{contact.icon}</span>
                  <div>
                    <div className="font-medium text-xs sm:text-sm">{contact.name}</div>
                    <div className="font-bold text-sm sm:text-base">{contact.number}</div>
                  </div>
                </div>
                <Phone className="h-4 w-4 text-white" />
              </button>
            ))}
          </div>

          {/* Emergency Tips */}
          <div className="mt-3 bg-gray-800 rounded-md p-2 text-sm">
            <p className="text-white mb-2" suppressHydrationWarning>
              {getTranslation('emergencyNote', language)}
            </p>
            <ul className="text-gray-300 space-y-1 text-xs">
              <li suppressHydrationWarning>{getTranslation('stayCalm', language)}</li>
              <li suppressHydrationWarning>{getTranslation('shareLocation', language)}</li>
              <li suppressHydrationWarning>{getTranslation('saveNumbers', language)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 