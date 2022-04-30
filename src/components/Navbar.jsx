import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authorization-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/navbar.css";

export function Navbar() {
  const location = useLocation();
  const { authToken, logout } = useAuth();
  const { setShowSidenav, gridView, setGridView } = useMessageHandling();

  return (
    <nav className="navbar">
      <button
        className="btn-icon btn-outline-primary material-icons-outlined"
        onClick={() => setShowSidenav((value) => !value)}
      >
        menu
      </button>
      <Link to="/">
        <img className="logo" src="assets/logo.png" alt="logo" />
      </Link>
      {!(
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) && (
        <div className="search">
          <button className="btn-icon material-icons ">search</button>
          <input type="text" className="search-input" />
          <button className="btn-icon material-icons ">close</button>
        </div>
      )}
      {!(
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) && (
        <div className="navbar-action">
          <button
            className="btn-icon btn-outline-primary material-icons-outlined view-toggle-icon"
            onClick={() => setGridView((value) => !value)}
          >
            {gridView ? "view_agenda" : "grid_view"}
          </button>
          {authToken ? (
            <button
              className="link btn-icon btn-outline-primary material-icons"
              onClick={logout}
            >
              logout
            </button>
          ) : (
            <Link
              to="/login"
              className="link btn-icon btn-outline-primary material-icons"
            >
              login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
