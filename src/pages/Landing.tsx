import { Link } from "react-router-dom";
import { FolioStamp, Mark } from "../components/Mark";

const benefits = [
  {
    num: "01",
    title: "Notice of award, once",
    body: "Put the PDF on the desk. Awardbound lifts amount, objectives, dates, allowable activities, and reporting cadence into a register the office can work.",
  },
  {
    num: "02",
    title: "One calendar for the life of the award",
    body: "Annual performance reports, quarterly packets, and evaluation briefs sit on the same timeline as objective due dates.",
  },
  {
    num: "03",
    title: "Evidence slots before anyone asks",
    body: "Each objective carries the file the office will need. Empty slots stay visible. No hunt through shared drives the week of a visit.",
  },
  {
    num: "04",
    title: "Drawdown against the award",
    body: "Year allocation, drawn to date, and obligated funds on one ledger. Rounded figures, office-readable, next to the objective they support.",
  },
  {
    num: "05",
    title: "Alerts that name the risk",
    body: "Objective behind. Evidence missing. Report due soon. Gold is reserved for dates that are at risk — not for decoration.",
  },
];

const steps = [
  { num: "1", title: "Upload the NOA", body: "Or load the Alabama A&M Title III sample when you want the desk full without a parser." },
  { num: "2", title: "Review the extract", body: "Amount, objectives, allowable activities, KPIs, owners, and report cadence — then one click to create the project." },
  { num: "3", title: "Work the calendar", body: "The director desk keeps progress, evidence, drawdown, and upcoming reports on a single award." },
];

const fees = [
  {
    name: "Starter",
    price: "$6,000",
    period: "/yr",
    forWhom: "One office, one campus register",
    points: ["Title III director desk", "Award extract and calendar", "Evidence slots and alerts"],
  },
  {
    name: "Growth",
    price: "$15,000",
    period: "/yr",
    forWhom: "Multi-award desk, more seats",
    points: ["Several active awards", "Shared owners across activities", "Deadline register for the year"],
  },
  {
    name: "Institution",
    price: "$30–50k",
    period: "/yr",
    forWhom: "System office and campuses",
    points: ["Campus registers under one office", "Evaluation export", "Desk fitted to the award load"],
  },
];

export function Landing() {
  return (
    <div className="landing">
      <header className="land-bar">
        <Mark invert />
        <p className="land-bar-note">For Title III and sponsored-programs offices</p>
        <Link className="btn btn-paper" to="/app">
          Open director desk
        </Link>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Alabama A&amp;M University · Title III Director mock</p>
          <h1>Upload the NOA. Get the calendar.</h1>
          <p className="lede">
            Awardbound is desk software for HBCU Title III offices. The notice of award goes
            in once. Objectives, evidence, drawdown, and report dates stay on one register —
            in time for the next memorandum, not the week of a site visit.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-navy" to="/app">
              Open director desk
            </Link>
            <Link className="btn btn-ghost" to="/app/new">
              Upload an award PDF
            </Link>
          </div>
          <p className="fine">
            No account is created. This prototype keeps the register in your browser.
          </p>
        </div>
        <aside className="hero-folio" aria-label="Sample extract">
          <div className="folio-doc">
            <div className="folio-doc-top">
              <FolioStamp size="sm" />
              <span>Notice of award · extract</span>
              <span className="sample-chip">Sample</span>
            </div>
            <p className="folio-id">Awardbound-AAMU-T3-2024</p>
            <p className="folio-title">
              Strengthening academic programs and institutional management
            </p>
            <dl className="folio-meta">
              <div>
                <dt>Institution</dt>
                <dd>Alabama A&amp;M University</dd>
              </div>
              <div>
                <dt>Award</dt>
                <dd>$2,450,000 · 5 years</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>1 Oct 2024 – 30 Sep 2029</dd>
              </div>
              <div>
                <dt>Cadence</dt>
                <dd>Quarterly memo · annual report</dd>
              </div>
            </dl>
            <ul className="folio-counts">
              <li>
                <strong>4</strong> objectives
              </li>
              <li>
                <strong>6</strong> evidence slots
              </li>
              <li>
                <strong>4</strong> report dates
              </li>
            </ul>
          </div>
        </aside>
      </section>

      <section className="band" id="how">
        <header className="band-head">
          <p className="kicker">On the desk</p>
          <h2>From the PDF to a working award</h2>
        </header>
        <ol className="steps">
          {steps.map((step) => (
            <li key={step.num}>
              <span className="step-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band band-split">
        <header className="band-head">
          <p className="kicker">What the office keeps</p>
          <h2>A register, not a shared-drive pile</h2>
        </header>
        <div className="benefits">
          {benefits.map((item) => (
            <article key={item.num} className="benefit">
              <span className="benefit-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="band" id="pricing">
        <header className="band-head">
          <p className="kicker">Schedule of office fees</p>
          <h2>Priced for a sponsored-programs desk</h2>
          <p className="band-lead">
            Annual office fee. Seats and award load set the band — not a per-student license.
          </p>
        </header>
        <div className="tariff">
          {fees.map((fee) => (
            <article key={fee.name} className="tariff-card">
              <h3>{fee.name}</h3>
              <p className="tariff-price">
                {fee.price}
                <span>{fee.period}</span>
              </p>
              <p className="tariff-for">{fee.forWhom}</p>
              <ul>
                {fee.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="close">
        <div>
          <h2>Open the director desk.</h2>
          <p>
            Signed in as the Title III Director at Alabama A&amp;M University. Load the
            sample award, or upload a PDF of your own.
          </p>
        </div>
        <Link className="btn btn-paper" to="/app">
          Open director desk
        </Link>
      </section>

      <footer className="land-foot">
        <Mark invert size="sm" />
        <p>
          Awardbound is original desk software for HBCU Title III offices. It is not
          Awarded.com, not a fundraising product, and not campus merch. The Alabama A&amp;M
          register in this prototype is a labeled sample with fictional award id
          Awardbound-AAMU-T3-2024.
        </p>
      </footer>
    </div>
  );
}
