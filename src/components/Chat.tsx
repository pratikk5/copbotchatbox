'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Shield } from 'lucide-react';
import LoadingDots from './LoadingDots';
import ErrorMessage from './ErrorMessage';
import { getTranslation } from '@/utils/translations';
import { findResponse } from '@/utils/chatLogic';
import { knowledgeBase } from '@/data/knowledgeBase';

// Define message type
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [showError, setShowError] = useState(false);
  const [language, setLanguage] = useState('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Show error when it occurs
  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

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

  // Ensure page scrolls to top on reload
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
    
    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    // Add the user message to the chat
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    
    // Store the input before clearing it
    const userInput = input;
    setInput('');
    
    // Show loading state
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the current language
      const currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
      
      let responseText = '';
      
      // First try to use the API (for development environment)
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            message: userInput,
            language: currentLanguage
          }),
          // Add a timeout to prevent hanging requests
          signal: AbortSignal.timeout(3000)
        });
        
        if (response.ok) {
          const data = await response.json();
          responseText = data.response;
        } else {
          throw new Error('API request failed');
        }
      } catch (apiError) {
        console.warn('API request failed, using local response handling:', apiError);
        
        // If API fails, use local response handling
        responseText = findResponse(userInput, currentLanguage);
      }
      
      // Create assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseText || 'I apologize, but I could not generate a response at this time.'
      };
      
      // Add the assistant message to the chat
      setMessages([...updatedMessages, assistantMessage]);
    } catch (err) {
      console.error('Error getting response:', err);
      
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I could not process your request at this time. Please try again later.'
      };
      
      setMessages([...updatedMessages, fallbackMessage]);
    } finally {
      setIsLoading(false);
      
      // Scroll to bottom after a short delay to ensure new messages are rendered
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-3xl mx-auto rounded-lg overflow-hidden border border-gray-700 shadow-xl">
      <div className="flex items-center justify-center p-4 bg-black text-white rounded-t-lg">
        <Shield className="mr-2 h-6 w-6 text-blue-500" />
        <h1 className="text-xl font-bold">
          {getTranslation('welcome', language)}
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 bg-gray-800 space-y-4" ref={chatContainerRef}>
        {showError && error && (
          <ErrorMessage 
            message={error.message} 
            onDismiss={() => setError(null)} 
          />
        )}
        
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-300">
            <Shield className="h-16 w-16 mb-4 text-blue-500" />
            <h2 className="text-xl font-semibold mb-2 text-white">
              {getTranslation('welcome', language)}
            </h2>
            <div className="bg-gray-700 p-3 rounded-lg text-sm max-w-md">
              <p className="font-semibold text-blue-400 mb-2">
                {getTranslation('askAbout', language)}
              </p>
              <ul className="text-left space-y-1">
                <li>• {getTranslation('fileComplaint', language)}</li>
                <li>• {getTranslation('legalRights', language)}</li>
                <li>• {getTranslation('emergency', language)}</li>
                <li>• {getTranslation('investigation', language)}</li>
              </ul>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex items-start max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white rounded-l-lg rounded-br-lg'
                    : 'bg-gray-700 text-white rounded-r-lg rounded-bl-lg'
                } p-3 shadow-sm`}
              >
                <div className="mr-2 mt-0.5">
                  {message.role === 'user' ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5 text-blue-400" />
                  )}
                </div>
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-white rounded-r-lg rounded-bl-lg p-3 shadow-sm flex items-start max-w-[80%]">
              <div className="mr-2 mt-0.5">
                <Bot className="h-5 w-5 text-blue-400" />
              </div>
              <LoadingDots text={getTranslation('typing', language)} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 bg-gray-900">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={`${getTranslation('askAbout', language)}...`}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 