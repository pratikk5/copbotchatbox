import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function UploadPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-4">Document Upload</h1>
          <p className="text-gray-300 mb-8">
            Upload documents, images, and additional information to assist with your police inquiry.
          </p>
          
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Documents</h2>
            
            <form action="/api/upload" method="post" encType="multipart/form-data" className="space-y-4">
              <div>
                <label htmlFor="text-input" className="block text-gray-300 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="text-input"
                  name="text"
                  placeholder="Enter additional information, notes, or context..."
                  className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="file-input" className="block text-gray-300 mb-2">
                  Upload Files
                </label>
                <input
                  id="file-input"
                  type="file"
                  name="files"
                  multiple
                  className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 bg-gray-800 border border-gray-700 rounded-lg"
                  accept="image/*,.pdf,.docx,.xlsx,.doc"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Upload Files & Information
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 