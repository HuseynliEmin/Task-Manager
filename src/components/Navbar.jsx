import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Navbar() {
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="bg-primary ">
      <nav className="d-flex justify-content-between align-items-center mx-4">
        <h1 className="text-white">Task Manager</h1>
        <div className="text-white d-flex justify-content-end align-items-center gap-5">
             <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          {user ? <div>
            <span className="me-2 ">Wellcome, {user.sureName}</span>
            <button onClick={handleLogout} className="btn btn-light btn-sm">
              Logout
            </button>
          </div>
            : <div>  <Link to="/login">Login</Link>
              <Link to="/register">Register</Link></div>
          }
       
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
