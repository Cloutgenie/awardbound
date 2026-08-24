import { Link } from "react-router-dom";
import { Deadline } from "../components/Deadline";
import { formatUsd } from "../lib/dates";
import { useDesk } from "../lib/store";

export function Grants() {
  const { grants, alerts } = useDesk();

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="kicker">Alabama A&amp;M University · Title III</p>
          <h1>Award register</h1>
          <p className="page-lead">
            Active awards on this director desk. Open a project to see objectives, evidence,
            drawdown, and the next report date.
          </p>
        </div>
        <Link className="btn btn-navy" to="/app/new">
          New award
        </Link>
      </header>

      <div className="stat-row">
        <article className="stat">
          <p>Awards on desk</p>
          <strong>{grants.length}</strong>
        </article>
        <article className="stat">
          <p>Open alerts</p>
          <strong>{alerts.length}</strong>
        </article>
        <article className="stat">
          <p>Award dollars (rounded)</p>
          <strong>
            {formatUsd(grants.reduce((sum, grant) => sum + grant.awardTotal, 0))}
          </strong>
        </article>
      </div>

      {grants.length === 0 ? (
        <section className="empty-folio">
          <h2>The register is empty</h2>
          <p>
            Load the Alabama A&amp;M Title III sample award to walk the desk, or upload a
            notice of award PDF. The sample never depends on a parser.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-navy" to="/app/new">
              Load sample or upload
            </Link>
          </div>
        </section>
      ) : (
        <table className="ledger">
          <thead>
            <tr>
              <th>Award</th>
              <th>Period</th>
              <th>Amount</th>
              <th>Next date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {grants.map((grant) => {
              const next = [...grant.reports, ...grant.objectives]
                .map((item) => item.dueDate)
                .sort()[0];
              return (
                <tr key={grant.id}>
                  <td>
                    <Link className="award-link" to={`/app/grants/${grant.id}`}>
                      {grant.awardId}
                    </Link>
                    <p className="cell-sub">
                      {grant.title}
                      {grant.isSample ? <span className="sample-chip">Sample</span> : null}
                    </p>
                  </td>
                  <td>
                    {grant.periodStart} – {grant.periodEnd}
                  </td>
                  <td>{formatUsd(grant.awardTotal)}</td>
                  <td>{next ? <Deadline iso={next} compact /> : "—"}</td>
                  <td>
                    <Link className="text-link" to={`/app/grants/${grant.id}`}>
                      Open
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
