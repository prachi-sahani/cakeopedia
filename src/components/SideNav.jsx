import { NavLink } from "react-router-dom";
import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/sidenav.css";
import { sidenavItemList } from "../utilities/sidenav-items";

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
          key="1-Notes"
          className={({ isActive }) => (isActive ? "link active" : "link")}
        >
          <li className="list-item list-w-icon px-2">
            <i className="material-icons-outlined list-icon">description</i>
            Notes
          </li>
        </NavLink>
        {labels?.map((item, i) => (
          <NavLink
            end={true}
            to={`/notes/label/${item}`}
            key={`${i + 1}-${item}`} // index + 1 + label name
            className={({ isActive }) => (isActive ? "link active" : "link")}
          >
            <li className="list-item list-w-icon px-2">
              <i className="material-icons-outlined list-icon">label</i>
              {item}
            </li>
          </NavLink>
        ))}
        {sidenavItemList?.map((item, i) => (
          <NavLink
            end={true}
            to={item.route}
            key={`${i + labels.length + 1}-${item.title}`} // index+length of labels array + 1+ nav item title
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
