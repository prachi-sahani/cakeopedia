import { NavLink } from "react-router-dom";

export function CustomNavLink({ children, navigateTo }) {
  return (
    <NavLink
      end={true}
      to={navigateTo}
      className={({ isActive }) => (isActive ? "link active" : "link")}
    >
      {children}
    </NavLink>
  );
}
