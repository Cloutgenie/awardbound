import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { buildSampleDraft, draftToGrant, SAMPLE_GRANT_ID } from "../data/sampleAward";
import { formatUsd } from "../lib/dates";
import { draftFromPdf } from "../lib/extract";
import { useDesk } from "../lib/store";
import type { ExtractDraft } from "../types";

export function Ingest() {
  const { addGrant, hasSample } = useDesk();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<ExtractDraft | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function loadSample() {
    setError(null);
    setDraft(buildSampleDraft());
  }

  async function onFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setError("Upload a PDF notice of award, or load the Alabama A&M sample.");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const next = await draftFromPdf(file);
      setDraft(next);
    } catch {
      setError("The file could not be read. Load the Alabama A&M sample award instead.");
    } finally {
      setBusy(false);
    }
  }

  function onCreate(event: FormEvent) {
    event.preventDefault();
    if (!draft) return;
    const id = draft.isSample ? SAMPLE_GRANT_ID : `grant-${crypto.randomUUID()}`;
    addGrant(draftToGrant(draft, id));
    navigate(`/app/grants/${id}`);
  }

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="kicker">Ingest</p>
          <h1>Put the notice of award on the desk</h1>
          <p className="page-lead">
            Upload a PDF, or load the Alabama A&amp;M Title III sample. The sample is
            labeled and never depends on a parser.
          </p>
        </div>
      </header>

      <div className="ingest-split">
        <section className="panel">
          <h2>Upload award PDF</h2>
          <p>
            Awardbound reads what text it can — amount, dates, objective language — then
            waits for you to confirm. Scanned files may come back thin.
          </p>
          <label className="file-well">
            <input type="file" accept="application/pdf,.pdf" onChange={onFile} />
            <span>{busy ? "Reading the PDF…" : "Choose a notice of award PDF"}</span>
          </label>
        </section>
        <section className="panel">
          <h2>Alabama A&amp;M Title III sample</h2>
          <p>
            Fictional five-year strengthening award, id Awardbound-AAMU-T3-2024. Rounded
            demo dollars. Not a real federal PDF.
          </p>
          <button className="btn btn-navy" type="button" onClick={loadSample}>
            {hasSample ? "Reload Alabama A&M Title III sample award" : "Load Alabama A&M Title III sample award"}
          </button>
        </section>
      </div>

      {error ? <p className="banner">{error}</p> : null}

      {draft ? (
        <form className="extract" onSubmit={onCreate}>
          <header className="extract-head">
            <div>
              <p className="kicker">Extract ready for review</p>
              <h2>{draft.isSample ? "Sample award extract" : "Upload extract"}</h2>
            </div>
            {draft.isSample ? <span className="sample-chip">Sample</span> : null}
          </header>

          <ul className="note-list">
            {draft.extractedNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>

          <div className="field-grid">
            <label>
              Award id
              <input
                value={draft.awardId}
                onChange={(event) => setDraft({ ...draft, awardId: event.target.value })}
                required
              />
            </label>
            <label>
              Title
              <input
                value={draft.title}
                onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                required
              />
            </label>
            <label>
              Program
              <input
                value={draft.program}
                onChange={(event) => setDraft({ ...draft, program: event.target.value })}
              />
            </label>
            <label>
              Institution
              <input
                value={draft.institution}
                onChange={(event) =>
                  setDraft({ ...draft, institution: event.target.value })
                }
              />
            </label>
            <label>
              Period start
              <input
                type="date"
                value={draft.periodStart}
                onChange={(event) =>
                  setDraft({ ...draft, periodStart: event.target.value })
                }
              />
            </label>
            <label>
              Period end
              <input
                type="date"
                value={draft.periodEnd}
                onChange={(event) => setDraft({ ...draft, periodEnd: event.target.value })}
              />
            </label>
            <label>
              Award amount
              <input
                type="number"
                min={0}
                step={1000}
                value={draft.awardTotal || ""}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    awardTotal: Number(event.target.value) || 0,
                  })
                }
              />
            </label>
            <label>
              Reporting cadence
              <input
                value={draft.reportingCadence}
                onChange={(event) =>
                  setDraft({ ...draft, reportingCadence: event.target.value })
                }
              />
            </label>
          </div>

          <div className="extract-block">
            <h3>Objectives</h3>
            <ul className="plain-list">
              {draft.objectives.map((objective) => (
                <li key={objective.id}>
                  <strong>
                    {objective.code} · {objective.title}
                  </strong>
                  <span>
                    {objective.owner} · due {objective.dueDate}
                  </span>
                  <p>{objective.summary}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="extract-block">
            <h3>Allowable activities</h3>
            <ul className="plain-list">
              {draft.allowable.map((item) => (
                <li key={item.id}>
                  <strong>{item.label}</strong>
                  <p>{item.note}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="extract-block">
            <h3>KPIs</h3>
            <ul className="plain-list">
              {draft.kpis.map((kpi) => (
                <li key={kpi.id}>
                  <strong>{kpi.label}</strong>
                  <span>
                    Baseline {kpi.baseline} · Target {kpi.target} · Now {kpi.current}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="extract-block">
            <h3>Owners · cadence · drawdown</h3>
            <p>
              {draft.owners.map((owner) => `${owner.name} (${owner.role})`).join(" · ")}
            </p>
            <p>{draft.reportingCadence}</p>
            <p>
              Award {formatUsd(draft.awardTotal)} · drawn to date{" "}
              {formatUsd(draft.drawdown.drawnToDate)}
            </p>
          </div>

          <button className="btn btn-navy" type="submit">
            Create project
          </button>
        </form>
      ) : null}
    </div>
  );
}
