'use client';

import { useState } from 'react';
import { FileUp, Database, Check, AlertCircle } from 'lucide-react';
import { importData, updateKnowledgeBase } from '@/utils/dataManager';

// Mock data for demonstration
const mockData = [
  {
    id: 'data-001',
    category: 'FIR',
    keywords: ['fir', 'report', 'complaint', 'file'],
    question: 'How do I file an FIR?',
    answer: 'Visit your nearest police station with ID proof. Provide all details of the incident. Get a copy of the FIR.',
    lastUpdated: new Date().toISOString(),
    source: 'Police Handbook 2023'
  },
  {
    id: 'data-002',
    category: 'Legal',
    keywords: ['section', 'ipc', 'law', 'crime'],
    question: 'What is Section 302 of IPC?',
    answer: 'Section 302 of the Indian Penal Code deals with punishment for murder. The punishment is death or life imprisonment and fine.',
    lastUpdated: new Date().toISOString(),
    source: 'Legal Database 2023'
  }
];

export default function DataImporter() {
  const [fileType, setFileType] = useState<'word' | 'excel' | 'sheets'>('excel');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleImport = async () => {
    setIsUploading(true);
    setMessage('');
    setStatus('idle');
    
    try {
      // In a real app, this would process an actual file upload
      // For demo, we'll use mock data
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing time
      
      const success = await importData(fileType, null);
      
      if (success) {
        // Update knowledge base with mock data
        updateKnowledgeBase(mockData);
        setMessage(`Successfully imported ${mockData.length} entries from ${fileType} file`);
        setStatus('success');
      } else {
        setMessage('Failed to import data. Please check file format and try again.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file. Please try again.');
      setStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
        <Database className="mr-2 h-6 w-6 text-blue-500" />
        Police Data Importer
      </h2>
      
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Select File Type</label>
        <div className="flex space-x-4">
          <button
            onClick={() => setFileType('word')}
            className={`px-4 py-2 rounded-md ${
              fileType === 'word' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Word Document
          </button>
          <button
            onClick={() => setFileType('excel')}
            className={`px-4 py-2 rounded-md ${
              fileType === 'excel' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Excel File
          </button>
          <button
            onClick={() => setFileType('sheets')}
            className={`px-4 py-2 rounded-md ${
              fileType === 'sheets' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
            }`}
          >
            Google Sheets
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">Upload File</label>
        <div className="flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6">
          <div className="text-center">
            <FileUp className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-300 mb-2">Drag and drop your file here, or click to browse</p>
            <p className="text-gray-500 text-sm">Supported formats: .docx, .xlsx, .csv</p>
            <button
              onClick={handleImport}
              disabled={isUploading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isUploading ? 'Importing...' : 'Import Data'}
            </button>
          </div>
        </div>
      </div>
      
      {message && (
        <div className={`p-3 rounded-md ${
          status === 'success' ? 'bg-green-900/30 border border-green-700' : 
          status === 'error' ? 'bg-red-900/30 border border-red-700' : ''
        }`}>
          <div className="flex items-start">
            {status === 'success' ? (
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            ) : status === 'error' ? (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            ) : null}
            <p className="text-sm text-white">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
} 