'use client';

import { useState, useRef } from 'react';
import { Upload, File, X, Check, Loader2 } from 'lucide-react';
import NextImage from 'next/image';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string; // For preview
}

export default function FileUploadForm() {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles: UploadedFile[] = [];
    
    Array.from(e.target.files).forEach(file => {
      // Create a preview URL for images
      const url = file.type.startsWith('image/') 
        ? URL.createObjectURL(file) 
        : undefined;
      
      newFiles.push({
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        size: file.size,
        url
      });
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  // Remove a file from the list
  const removeFile = (id: string) => {
    setFiles(prev => {
      const updatedFiles = prev.filter(file => file.id !== id);
      return updatedFiles;
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (files.length === 0 && !text.trim()) {
      setStatusMessage('Please add text or upload files');
      setUploadStatus('error');
      return;
    }
    
    setIsUploading(true);
    setUploadStatus('idle');
    setStatusMessage('');
    
    try {
      // In a real implementation, this would upload to your server
      // For demo purposes, we'll simulate a successful upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful upload
      setUploadStatus('success');
      setStatusMessage(`Successfully uploaded ${files.length} file(s) and text data`);
      
      // Clear form after successful upload
      setText('');
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = '';
      
    } catch (error) {
      setUploadStatus('error');
      setStatusMessage('Failed to upload. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Upload Documents & Information</h2>
      
      {/* Text input area */}
      <div className="mb-4">
        <label htmlFor="text-input" className="block text-gray-300 mb-2">
          Text Information
        </label>
        <textarea
          id="text-input"
          value={text}
          onChange={handleTextChange}
          placeholder="Enter additional information, notes, or context..."
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* File upload area */}
      <div className="mb-6">
        <label className="block text-gray-300 mb-2">
          Upload Files (Images, Documents, PDFs)
        </label>
        <div 
          className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-800/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-300 mb-1">Drag files here or click to browse</p>
          <p className="text-gray-500 text-sm">Supports: JPG, PNG, PDF, DOCX, XLSX</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept="image/*,.pdf,.docx,.xlsx,.doc"
          />
        </div>
      </div>
      
      {/* File preview list */}
      {files.length > 0 && (
        <div className="mb-6">
          <h3 className="text-gray-300 mb-2">Selected Files ({files.length})</h3>
          <div className="space-y-2">
            {files.map(file => (
              <div key={file.id} className="flex items-center bg-gray-800 p-3 rounded-lg">
                {file.type.startsWith('image/') ? (
                  <div className="w-10 h-10 mr-3 flex-shrink-0">
                    {file.url && (
                      <NextImage 
                        src={file.url} 
                        alt={file.name} 
                        width={40} 
                        height={40} 
                        className="w-full h-full object-cover rounded"
                      />
                    )}
                  </div>
                ) : (
                  <File className="w-10 h-10 mr-3 text-gray-400 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{file.name}</p>
                  <p className="text-gray-400 text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button 
                  type="button"
                  onClick={() => removeFile(file.id)}
                  className="p-1 text-gray-400 hover:text-white"
                  aria-label="Remove file"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Status message */}
      {statusMessage && (
        <div className={`p-3 rounded-md mb-4 ${
          uploadStatus === 'success' ? 'bg-green-900/30 border border-green-700' : 
          uploadStatus === 'error' ? 'bg-red-900/30 border border-red-700' : ''
        }`}>
          <div className="flex items-start">
            {uploadStatus === 'success' ? (
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
            ) : uploadStatus === 'error' ? (
              <X className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
            ) : null}
            <p className="text-sm text-white">{statusMessage}</p>
          </div>
        </div>
      )}
      
      {/* Submit button */}
      <button
        type="submit"
        disabled={isUploading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Uploading...
          </span>
        ) : (
          'Upload Files & Information'
        )}
      </button>
    </form>
  );
} 