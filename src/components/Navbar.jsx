import { Link, useLocation } from "react-router-dom";
import "../stylesheets/navbar.css";

export function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar">
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
          <button className="btn-icon btn-outline-primary material-icons">
            view_list
          </button>
          <Link
            to="/login"
            className="link btn-icon btn-outline-primary material-icons"
          >
            login
          </Link>
        </div>
      )}
    </nav>
  );
}
