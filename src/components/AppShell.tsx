import { NavLink, Outlet } from "react-router-dom";
import { useDesk } from "../lib/store";
import { Mark } from "./Mark";

const nav = [
  { to: "/app", label: "Grants", end: true },
  { to: "/app/alerts", label: "Alerts", end: false },
  { to: "/app/calendar", label: "Calendar", end: false },
  { to: "/app/settings", label: "Settings", end: false },
];

export function AppShell() {
  const { alerts } = useDesk();

  return (
    <div className="shell">
      <aside className="rail">
        <div className="rail-brand">
          <Mark invert size="sm" />
          <p className="rail-kicker">Title III desk</p>
        </div>
        <nav className="rail-nav" aria-label="Director desk">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "rail-link rail-link-active" : "rail-link"
              }
            >
              <span>{item.label}</span>
              {item.to === "/app/alerts" && alerts.length > 0 ? (
                <span className="rail-count">{alerts.length}</span>
              ) : null}
            </NavLink>
          ))}
        </nav>
        <div className="rail-user">
          <p className="rail-user-name">Inez Carr</p>
          <p>Title III Director</p>
          <p>Alabama A&amp;M University</p>
        </div>
      </aside>
      <div className="shell-main">
        <Outlet />
      </div>
    </div>
  );
}
