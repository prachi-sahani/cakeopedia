import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authorization-context";
import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/navbar.css";

export function Navbar() {
  const location = useLocation();
  const { authToken, logout } = useAuth();
  const { setShowSidenav, gridView, setGridView } = useMessageHandling();
  const { searchFilter, setSearchFilter } = useDBdata();
  return (
    <nav className="navbar">
      {!(
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) && (
        <button
          className="btn-icon btn-outline-primary material-icons-outlined"
          onClick={() => setShowSidenav((value) => !value)}
        >
          menu
        </button>
      )}
      <Link to="/">
        <img className="logo" src="/assets/logo.png" alt="logo" />
      </Link>
      {!(
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) && (
        <div className="search">
          <button className="btn-icon material-icons ">search</button>
          <input
            type="text"
            id="searchInput"
            className="search-input"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
          <button
            className="btn-icon clear-search material-icons "
            onClick={() => setSearchFilter("")}
          >
            close
          </button>
        </div>
      )}
      {!(
        location.pathname.includes("login") ||
        location.pathname.includes("signup")
      ) && (
        <div className="navbar-action">
          <button
            title={gridView ? "List view" : "Grid view"}
            className="btn-icon btn-outline-primary material-icons-outlined view-toggle-icon"
            onClick={() => setGridView((value) => !value)}
          >
            {gridView ? "view_agenda" : "grid_view"}
          </button>
          {authToken ? (
            <button
              title="Logout"
              className="link btn-icon btn-outline-primary material-icons"
              onClick={logout}
            >
              logout
            </button>
          ) : (
            <Link
              title="Login"
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
