import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-primary px-4">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          Task Manager
        </Link>

        {/* Toggle Button (burger) */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Links */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li>
            {/*TaskForm link for Admin*/}
            {user?.email === "emin@gmail.com" && (
              <Link to="/task-form" className="nav-item d-flex align-items-center gap-2 nav-link">Add Task</Link>
            )}
            {user ? (
              <li className="nav-item d-flex align-items-center gap-2">
                <span className="text-white">Welcome, {user.sureName}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-light btn-sm"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
