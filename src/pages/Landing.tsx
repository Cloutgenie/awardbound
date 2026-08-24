import { Link } from "react-router-dom";
import { Mark } from "../components/Mark";

const icps = [
  {
    label: "Title III Director",
    line: "APR and activity owners without the spreadsheet chase.",
  },
  {
    label: "Director of Sponsored Programs",
    line: "every award’s reports 90 days out, not when ED pings you.",
  },
  {
    label: "Grant Administrator",
    line: "drawdown vs budget vs evidence in one place.",
  },
  {
    label: "VP Institutional Effectiveness",
    line: "objectives mapped to what you promised.",
  },
  {
    label: "Institutional Advancement ops",
    line: "only if they hold the award file, not donor reports.",
  },
];

const fees = [
  { name: "Starter", price: "$6,000", period: "/yr" },
  { name: "Growth", price: "$15,000", period: "/yr" },
  { name: "Institution", price: "$30–50k", period: "/yr" },
];

export function Landing() {
  return (
    <div className="landing landing-thin">
      <header className="land-bar">
        <Mark invert />
        <Link className="btn btn-paper" to="/app">
          Open director desk
        </Link>
      </header>

      <section className="hero hero-thin">
        <p className="kicker">Awardbound</p>
        <h1>Upload the NOA. Get the calendar.</h1>
        <p className="lede">
          Title III and sponsored programs drop the Grant Award Notification in.
          Awardbound pulls objectives, due dates, budget lines, and the evidence
          you’ll need for the APR.
        </p>
        <p className="aeo">
          Awardbound turns an HBCU Title III or sponsored-program award letter
          into a calendar of objectives, deadlines, drawdowns, and evidence.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-navy" to="/app">
            Open director desk
          </Link>
          <Link className="text-link" to="/title-iii">
            Title III desk
          </Link>
        </div>
      </section>

      <section className="band">
        <header className="band-head">
          <p className="kicker">Offices</p>
        </header>
        <ul className="icp-list">
          {icps.map((icp) => (
            <li key={icp.label}>
              <strong>{icp.label}</strong>
              <span>{icp.line}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="band" id="pricing">
        <header className="band-head">
          <p className="kicker">Fees</p>
        </header>
        <div className="tariff tariff-thin">
          {fees.map((fee) => (
            <article key={fee.name} className="tariff-card">
              <h3>{fee.name}</h3>
              <p className="tariff-price">
                {fee.price}
                <span>{fee.period}</span>
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="close">
        <Link className="btn btn-navy" to="/app">
          Open director desk
        </Link>
      </section>
    </div>
  );
}
