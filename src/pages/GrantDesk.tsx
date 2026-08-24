import { Link, useParams } from "react-router-dom";
import { Deadline } from "../components/Deadline";
import { formatUsd } from "../lib/dates";
import { useDesk } from "../lib/store";

function statusLabel(status: string): string {
  if (status === "behind") return "Behind";
  if (status === "complete") return "Complete";
  if (status === "on_file") return "On file";
  if (status === "missing") return "Missing";
  if (status === "in_progress") return "In progress";
  if (status === "filed") return "Filed";
  if (status === "upcoming") return "Upcoming";
  return "On pace";
}

export function GrantDesk() {
  const { id } = useParams();
  const { findGrant } = useDesk();
  const grant = id ? findGrant(id) : undefined;

  if (!grant) {
    return (
      <div className="page">
        <section className="empty-folio">
          <h2>This award is not on the desk</h2>
          <p>It may have been cleared from the browser register.</p>
          <Link className="btn btn-navy" to="/app">
            Back to the register
          </Link>
        </section>
      </div>
    );
  }

  const remaining = grant.drawdown.awardTotal - grant.drawdown.drawnToDate;
  const drawnPct = grant.drawdown.awardTotal
    ? Math.round((grant.drawdown.drawnToDate / grant.drawdown.awardTotal) * 100)
    : 0;
  const yearPct = grant.drawdown.yearAllocation
    ? Math.round((grant.drawdown.yearDrawn / grant.drawdown.yearAllocation) * 100)
    : 0;
  const nextReports = [...grant.reports].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate),
  );

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="kicker">
            {grant.institution} · {grant.campus}
            {grant.isSample ? <span className="sample-chip">Sample</span> : null}
          </p>
          <h1>{grant.awardId}</h1>
          <p className="page-lead">
            {grant.title}. {grant.program}. {grant.reportingCadence}.
          </p>
        </div>
        <Link className="btn btn-ghost" to="/app/new">
          Ingest another
        </Link>
      </header>

      <div className="stat-row">
        <article className="stat">
          <p>Award</p>
          <strong>{formatUsd(grant.awardTotal)}</strong>
        </article>
        <article className="stat">
          <p>Drawn to date</p>
          <strong>{formatUsd(grant.drawdown.drawnToDate)}</strong>
        </article>
        <article className="stat">
          <p>Remaining</p>
          <strong>{formatUsd(remaining)}</strong>
        </article>
        <article className="stat">
          <p>Next report</p>
          <strong>
            {nextReports[0] ? <Deadline iso={nextReports[0].dueDate} compact /> : "—"}
          </strong>
        </article>
      </div>

      <section className="panel">
        <header className="panel-head">
          <h2>Objectives</h2>
          <p>Progress, owners, and due dates on this award.</p>
        </header>
        <table className="ledger">
          <thead>
            <tr>
              <th>Objective</th>
              <th>Owner</th>
              <th>Progress</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {grant.objectives.map((objective) => (
              <tr key={objective.id}>
                <td>
                  <strong>
                    {objective.code} · {objective.title}
                  </strong>
                  <p className="cell-sub">{objective.summary}</p>
                  <p className="cell-sub">
                    {objective.current} · target {objective.target}
                  </p>
                </td>
                <td>
                  {objective.owner}
                  <p className="cell-sub">{objective.ownerRole}</p>
                </td>
                <td>
                  <div className="meter" aria-label={`${objective.progress} percent`}>
                    <span style={{ width: `${objective.progress}%` }} />
                  </div>
                  <p className="cell-sub">
                    {objective.progress}% · {statusLabel(objective.status)}
                  </p>
                </td>
                <td>
                  <Deadline iso={objective.dueDate} compact />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <div className="two-col">
        <section className="panel">
          <header className="panel-head">
            <h2>Evidence slots</h2>
            <p>Some packets are on file. Empty slots stay on the desk.</p>
          </header>
          <ul className="slot-list">
            {grant.evidence.map((slot) => (
              <li
                key={slot.id}
                className={slot.status === "missing" ? "slot slot-missing" : "slot"}
              >
                <div>
                  <strong>{slot.label}</strong>
                  <p>{slot.requiredFor}</p>
                </div>
                <div className="slot-side">
                  <span>{statusLabel(slot.status)}</span>
                  {slot.filedOn ? <span>Filed {slot.filedOn}</span> : null}
                  {slot.dueDate && slot.status === "missing" ? (
                    <Deadline iso={slot.dueDate} compact />
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <header className="panel-head">
            <h2>Drawdown vs. award</h2>
            <p>
              {grant.drawdown.yearLabel}. Figures are rounded for the desk, not a
              general-ledger export.
            </p>
          </header>
          <dl className="draw-list">
            <div>
              <dt>Award total</dt>
              <dd>{formatUsd(grant.drawdown.awardTotal)}</dd>
            </div>
            <div>
              <dt>Drawn to date</dt>
              <dd>{formatUsd(grant.drawdown.drawnToDate)}</dd>
            </div>
            <div>
              <dt>Obligated</dt>
              <dd>{formatUsd(grant.drawdown.obligated)}</dd>
            </div>
            <div>
              <dt>Remaining</dt>
              <dd>{formatUsd(remaining)}</dd>
            </div>
          </dl>
          <p className="meter-label">Life of award · {drawnPct}% drawn</p>
          <div className="meter meter-tall">
            <span style={{ width: `${drawnPct}%` }} />
          </div>
          <p className="meter-label">
            This year · {formatUsd(grant.drawdown.yearDrawn)} of{" "}
            {formatUsd(grant.drawdown.yearAllocation)} ({yearPct}%)
          </p>
          <div className="meter meter-tall">
            <span style={{ width: `${yearPct}%` }} />
          </div>
        </section>
      </div>

      <section className="panel">
        <header className="panel-head">
          <h2>Upcoming reports</h2>
          <p>{grant.reportingCadence}.</p>
        </header>
        <table className="ledger">
          <thead>
            <tr>
              <th>Report</th>
              <th>Cadence</th>
              <th>Owner</th>
              <th>Due</th>
            </tr>
          </thead>
          <tbody>
            {nextReports.map((report) => (
              <tr key={report.id}>
                <td>
                  <strong>{report.title}</strong>
                  <p className="cell-sub">{statusLabel(report.status)}</p>
                </td>
                <td>{report.cadence}</td>
                <td>{report.owner}</td>
                <td>
                  <Deadline iso={report.dueDate} compact />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="panel">
        <header className="panel-head">
          <h2>KPIs on this award</h2>
        </header>
        <table className="ledger">
          <thead>
            <tr>
              <th>Measure</th>
              <th>Baseline</th>
              <th>Target</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>
            {grant.kpis.map((kpi) => (
              <tr key={kpi.id}>
                <td>{kpi.label}</td>
                <td>{kpi.baseline}</td>
                <td>{kpi.target}</td>
                <td>{kpi.current}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
