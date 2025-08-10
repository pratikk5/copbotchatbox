'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, Clock } from 'lucide-react';
import { getLastUpdateTime } from '@/utils/dataManager';

export default function DataUpdateStatus() {
  const [lastUpdate, setLastUpdate] = useState('Checking...');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Get initial update time
    setLastUpdate(getLastUpdateTime());
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate checking for updates
    setTimeout(() => {
      setLastUpdate(getLastUpdateTime());
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center text-sm text-gray-300">
        <Clock className="h-4 w-4 mr-2 text-blue-400" />
        <span>Last Updated: {lastUpdate}</span>
      </div>
      <button 
        onClick={handleRefresh}
        disabled={isLoading}
        className="p-1 rounded-full hover:bg-gray-700"
        aria-label="Refresh data"
      >
        <RefreshCw className={`h-4 w-4 text-gray-400 ${isLoading ? 'animate-spin' : ''}`} />
      </button>
    </div>
  );
} 