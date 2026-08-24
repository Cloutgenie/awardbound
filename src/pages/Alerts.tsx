import { Link } from "react-router-dom";
import { Deadline } from "../components/Deadline";
import { alertKindLabel } from "../lib/alerts";
import { useDesk } from "../lib/store";

export function Alerts() {
  const { alerts, grants } = useDesk();

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="kicker">Director desk</p>
          <h1>Alerts</h1>
          <p className="page-lead">
            Objective behind, missing evidence, and reports due within 21 days. Gold marks
            a date that is at risk.
          </p>
        </div>
      </header>

      {grants.length === 0 ? (
        <section className="empty-folio">
          <h2>No awards, no alerts</h2>
          <p>Load the Alabama A&amp;M sample to see the three working alert types.</p>
          <Link className="btn btn-navy" to="/app/new">
            Load sample award
          </Link>
        </section>
      ) : alerts.length === 0 ? (
        <section className="empty-folio">
          <h2>The desk is clear</h2>
          <p>No behind objectives, empty evidence slots, or reports inside 21 days.</p>
        </section>
      ) : (
        <ul className="alert-list">
          {alerts.map((alert) => (
            <li key={alert.id} className="alert-row">
              <p className="alert-kind">{alertKindLabel(alert.kind)}</p>
              <h2>{alert.title}</h2>
              <p>{alert.detail}</p>
              <div className="alert-meta">
                <span>{alert.awardId}</span>
                {alert.date ? <Deadline iso={alert.date} compact /> : null}
                <Link className="text-link" to={`/app/grants/${alert.grantId}`}>
                  Open award
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
