import { NavLink } from "react-router-dom";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/sidenav.css";
import { sidenavItemList } from "../utilities/sidenav-items";
export function SideNav() {
  const { showSidenav, setShowSidenav } = useMessageHandling();
  return (
    <aside
      className={`sidenav-bg ${!showSidenav ? "sidenav-hide" : ""}`}
      onClick={() => setShowSidenav(false)}
    >
      <ul className="list-group-stacked sidenav">
        {sidenavItemList.map((item) => (
          <NavLink
            end={true}
            to={item.route}
            key={item.title}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            <li className="list-item list-w-icon px-2">
              <i className="material-icons-outlined list-icon">
                {item.iconName}
              </i>
              {item.title}
            </li>
          </NavLink>
        ))}
      </ul>
    </aside>
  );
}
