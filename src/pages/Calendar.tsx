import { Link } from "react-router-dom";
import { Deadline } from "../components/Deadline";
import { daysUntil, formatDate } from "../lib/dates";
import { useDesk } from "../lib/store";

type CalItem = {
  id: string;
  grantId: string;
  awardId: string;
  title: string;
  kind: string;
  owner: string;
  dueDate: string;
};

export function Calendar() {
  const { grants } = useDesk();

  const items: CalItem[] = grants
    .flatMap((grant) => [
      ...grant.objectives.map((objective) => ({
        id: `${grant.id}-${objective.id}`,
        grantId: grant.id,
        awardId: grant.awardId,
        title: `Objective ${objective.code} · ${objective.title}`,
        kind: "Objective",
        owner: objective.owner,
        dueDate: objective.dueDate,
      })),
      ...grant.reports.map((report) => ({
        id: `${grant.id}-${report.id}`,
        grantId: grant.id,
        awardId: grant.awardId,
        title: report.title,
        kind: "Report",
        owner: report.owner,
        dueDate: report.dueDate,
      })),
      ...grant.evidence
        .filter((slot) => slot.status === "missing" && slot.dueDate)
        .map((slot) => ({
          id: `${grant.id}-${slot.id}`,
          grantId: grant.id,
          awardId: grant.awardId,
          title: slot.label,
          kind: "Evidence",
          owner: slot.requiredFor,
          dueDate: slot.dueDate as string,
        })),
    ])
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="kicker">Deadlines</p>
          <h1>Calendar</h1>
          <p className="page-lead">
            Every objective date, report, and missing evidence due date on the desk, in
            order. Gold is only for dates inside 21 days or already past.
          </p>
        </div>
      </header>

      {items.length === 0 ? (
        <section className="empty-folio">
          <h2>No dates on the calendar</h2>
          <p>Create an award to place report and objective dates on this register.</p>
          <Link className="btn btn-navy" to="/app/new">
            Load sample award
          </Link>
        </section>
      ) : (
        <table className="ledger">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Kind</th>
              <th>Owner</th>
              <th>Award</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <Deadline iso={item.dueDate} compact />
                  <p className="cell-sub">{formatDate(item.dueDate)}</p>
                </td>
                <td>
                  <Link className="award-link" to={`/app/grants/${item.grantId}`}>
                    {item.title}
                  </Link>
                  <p className="cell-sub">
                    {daysUntil(item.dueDate) < 0 ? "Past" : "On the register"}
                  </p>
                </td>
                <td>{item.kind}</td>
                <td>{item.owner}</td>
                <td>{item.awardId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
