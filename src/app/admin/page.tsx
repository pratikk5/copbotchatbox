import DataImporter from '@/components/admin/DataImporter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminPage() {
  // For static export, return a simplified version
  if (process.env.NEXT_PUBLIC_SKIP_ADMIN === 'true') {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6">Admin Area</h1>
            <p className="text-gray-300">
              This area is only available in the development environment.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Police Data Management</h1>
          <p className="text-gray-300 mb-8">
            This admin panel allows authorized personnel to update the chatbot with structured data from 
            Word documents, Excel files, and Google Sheets provided by the police department.
          </p>
          
          <DataImporter />
          
          <div className="mt-8 bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Data Update Guidelines</h2>
            <ul className="text-gray-300 space-y-2">
              <li>• Ensure all data follows the required format</li>
              <li>• Update information regularly to maintain accuracy</li>
              <li>• Include source references for all legal information</li>
              <li>• Verify all emergency contact numbers before uploading</li>
              <li>• Document all changes in the update log</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 