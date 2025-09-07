import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Check if the current path matches the link path
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col h-screen">
      <div className="p-4 flex items-center space-x-2">
        <div className="text-blue-400 text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-xl font-bold">AI PashuMitra</h1>
      </div>

      <nav className="mt-6 flex-grow">
        <div className="px-4">
          <div
            className={`${
              isActive("/")
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            } rounded-md p-2 mb-2 flex items-center cursor-pointer`}
            onClick={() => handleNavigation("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
            </svg>
            Dashboard
          </div>
          <div
            className={`${
              isActive("/history")
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            } rounded-md p-2 mb-2 flex items-center cursor-pointer`}
            onClick={() => handleNavigation("/history")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            History
          </div>
          <div
            className={`${
              isActive("/analytics")
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            } rounded-md p-2 mb-2 flex items-center cursor-pointer`}
            onClick={() => handleNavigation("/analytics")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            Analytics
          </div>
          <div
            className={`${
              isActive("/settings")
                ? "bg-blue-500 text-white"
                : "text-gray-300 hover:bg-gray-700"
            } rounded-md p-2 mb-2 flex items-center cursor-pointer`}
            onClick={() => handleNavigation("/settings")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clipRule="evenodd"
              />
            </svg>
            Settings
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gray-400 mr-2">
              {/* User avatar placeholder */}
            </div>
            <div>
              <div className="font-medium">{user?.name || "John Doe"}</div>
              <div className="text-xs text-gray-400">
                {user?.email || "johndoe@example.com"}
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm7 2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v9a.5.5 0 01-.5.5h-3a.5.5 0 01-.5-.5v-9z"
                clipRule="evenodd"
              />
              <path d="M6 6a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 016 6zm0 3a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 016 9zm0 3a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 016 12z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
