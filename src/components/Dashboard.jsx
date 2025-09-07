import Sidebar from "./shared/Sidebar";
import BreedPredictionResults from "./shared/BreedPredictionResults";
import ChatAssistant from "./shared/ChatAssistant";
import { useImagePredictor } from "../hooks/useImagePredictor";

const Dashboard = () => {
  const {
    image,
    isDragging,
    prediction,
    isProcessing,
    breedData,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
  } = useImagePredictor();

  // Handle click to upload
  const handleClickUpload = () => {
    document.getElementById("fileInput").click();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center h-80 ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClickUpload}
            >
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
              />

              {!image ? (
                <>
                  <div className="text-blue-500 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 text-center">
                    Drag & drop an image here or click to upload
                  </p>
                </>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full object-contain"
                  />
                  {isProcessing && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  )}
                  {prediction && (
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <div className="bg-green-500 text-white rounded-full py-1 px-4 inline-block">
                        {prediction.confidence}% Confidence
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Uploaded image preview or results */}
            {image && (
              <div className="border rounded-lg overflow-hidden h-80">
                <div className="h-full bg-gray-200">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded">
                    Uploaded Image
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Breed prediction results */}
          {prediction && (
            <BreedPredictionResults
              prediction={prediction}
              breedData={breedData}
            />
          )}

          {/* PashuMitra Assistant */}
          <ChatAssistant prediction={prediction} />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
