import Sidebar from "./shared/Sidebar";

const History = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Same as Dashboard */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">History</h1>
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
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium mb-4">Recent Identifications</h2>

            {/* Placeholder for history records */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="flex items-center p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="h-16 w-16 bg-gray-200 rounded-md mr-4"></div>
                  <div className="flex-1">
                    <h3 className="font-medium">Gir</h3>
                    <p className="text-sm text-gray-500">
                      September {item}, 2025
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                      92.5% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default History;
