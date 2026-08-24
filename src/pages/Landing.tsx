import { Link } from "react-router-dom";
import { Mark } from "../components/Mark";

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
        <div className="hero-actions">
          <Link className="btn btn-navy" to="/app">
            Open director desk
          </Link>
        </div>
      </section>

      <section className="band" id="pricing">
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
    </div>
  );
}
