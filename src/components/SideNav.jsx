import { useDBdata } from "../context/db-data-context";
import { useMessageHandling } from "../context/message-handling-context";
import "../stylesheets/sidenav.css";
import { sidenavItemList } from "../utilities/sidenav-items";
import { CustomNavLink } from "./CustomNavLink";

export function SideNav() {
  const { labels } = useDBdata();
  const { showSidenav, setShowSidenav } = useMessageHandling();
  return (
    <aside
      className={`sidenav-bg ${!showSidenav ? "sidenav-hide" : ""}`}
      onClick={() => setShowSidenav(false)}
    >
      <ul className="list-group-stacked sidenav">
        <CustomNavLink navigateTo="/notes" key="1-Notes">
          <li className="list-item list-w-icon px-2">
            <i className="material-icons-outlined list-icon">description</i>
            Notes
          </li>
        </CustomNavLink>
        {/* list of labels */}
        {labels?.map((item, i) => (
          <CustomNavLink
            key={`${i + 1}-${item}`}
            navigateTo={`/notes/label/${item}`}
          >
            <li className="list-item list-w-icon px-2">
              <i className="material-icons-outlined list-icon">label</i>
              {item}
            </li>
          </CustomNavLink>
        ))}
        {/* list of side nav items */}
        {sidenavItemList?.map((item, i) => (
          <CustomNavLink
            key={`${i + labels.length + 1}-${item.title}`} // index+length of labels array + 1+ nav item title
            navigateTo={item.route}
          >
            <li className="list-item list-w-icon px-2">
              <i className="material-icons-outlined list-icon">
                {item.iconName}
              </i>
              {item.title}
            </li>
          </CustomNavLink>
        ))}
      </ul>
    </aside>
  );
}
