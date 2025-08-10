/**
 * Data Manager Utility
 * Handles importing and processing structured data from various file formats
 */

// Types for structured data
export interface StructuredData {
  id: string;
  category: string;
  keywords: string[];
  question: string;
  answer: string;
  lastUpdated: string;
  source: string;
}

// Mock data store (in a real app, this would connect to a database)
let dataStore: StructuredData[] = [];

// Function to import data from various sources
export async function importData(source: 'word' | 'excel' | 'sheets', fileData: any): Promise<boolean> {
  try {
    // In a real implementation, this would parse the actual file data
    // For now, we'll just log the import attempt
    console.log(`Importing data from ${source} file`);
    
    // Process the data based on file type
    // This would be replaced with actual parsing logic
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}

// Function to update the knowledge base with new data
export function updateKnowledgeBase(newData: StructuredData[]): void {
  // In a real implementation, this would merge with existing data
  // and handle conflicts/duplicates
  dataStore = [...dataStore, ...newData];
  
  // Log the update
  console.log(`Knowledge base updated with ${newData.length} new entries`);
  console.log(`Total entries: ${dataStore.length}`);
}

// Function to search the knowledge base
export function searchKnowledgeBase(query: string): StructuredData[] {
  const normalizedQuery = query.toLowerCase();
  
  return dataStore.filter(item => {
    // Check if query matches keywords, question, or category
    return (
      item.keywords.some(keyword => keyword.toLowerCase().includes(normalizedQuery)) ||
      item.question.toLowerCase().includes(normalizedQuery) ||
      item.category.toLowerCase().includes(normalizedQuery)
    );
  });
}

// Function to get data by category
export function getDataByCategory(category: string): StructuredData[] {
  return dataStore.filter(item => item.category.toLowerCase() === category.toLowerCase());
}

// Function to get the last update timestamp
export function getLastUpdateTime(): string {
  if (dataStore.length === 0) return 'No data available';
  
  // Find the most recent update
  const dates = dataStore.map(item => new Date(item.lastUpdated).getTime());
  const mostRecent = new Date(Math.max(...dates));
  
  return mostRecent.toLocaleString();
}

// Fix the unused variable and any type
export const uploadFile = async (file: File, fileType: string): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', fileType);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload file');
    }
    
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}; 