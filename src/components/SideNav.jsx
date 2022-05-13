import { NavLink } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/sidenav.css";
import { sidenavItemList } from "../utilities/sidenav-items";
import { v4 as uuid } from "uuid";

export function SideNav() {
  const { labels } = useDBdata();
  const { showSidenav, setShowSidenav } = useMessageHandling();
  return (
    <aside
      className={`sidenav-bg ${!showSidenav ? "sidenav-hide" : ""}`}
      onClick={() => setShowSidenav(false)}
    >
      <ul className="list-group-stacked sidenav">
        <NavLink
          end={true}
          to="/notes"
          key={uuid()}
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <li className="list-item list-w-icon px-2">
            <i className="material-icons-outlined list-icon">description</i>
            Notes
          </li>
        </NavLink>
        {labels?.map((item) => (
          <NavLink
            end={true}
            to={`/notes/label/${item}`}
            key={uuid()}
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            <li className="list-item list-w-icon px-2">
              <i className="material-icons-outlined list-icon">label</i>
              {item}
            </li>
          </NavLink>
        ))}
        {sidenavItemList?.map((item) => (
          <NavLink
            end={true}
            to={item.route}
            key={uuid()}
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
