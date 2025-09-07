import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./Layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

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
    <div className="layout">
      <header className="header">
        <div className="logo">
          <h1>BreedLens</h1>
        </div>
        <div className="user-actions">
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>

      <div className="content-container">
        <nav className="sidebar">
          <ul>
            <li className={isActive("/") ? "active" : ""}>
              <button onClick={() => handleNavigation("/")}>Dashboard</button>
            </li>
            <li className={isActive("/history") ? "active" : ""}>
              <button onClick={() => handleNavigation("/history")}>
                History
              </button>
            </li>
            <li className={isActive("/analytics") ? "active" : ""}>
              <button onClick={() => handleNavigation("/analytics")}>
                Analytics
              </button>
            </li>
            <li className={isActive("/settings") ? "active" : ""}>
              <button onClick={() => handleNavigation("/settings")}>
                Settings
              </button>
            </li>
          </ul>
        </nav>

        <main className="main-content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
