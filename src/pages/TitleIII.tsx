import { Link } from "react-router-dom";
import { Mark } from "../components/Mark";

const faqs = [
  {
    q: "What is a Title III Part B APR?",
    a: "Annual Performance Report (OMB 1840-0766). Portal opens Oct 1, due 90 days later. Awardbound tracks the activities and evidence that go into it. It does not file HEPIS for you.",
  },
  {
    q: "How do I keep Title III activity deadlines?",
    a: "Upload the GAN/NOA. Awardbound lists objectives, dates, and who owns each activity.",
  },
  {
    q: "Is this scholarship software?",
    a: "No. It is award and sponsored-program management after the notice of award.",
  },
  {
    q: "Does it replace G5 or HEPIS?",
    a: "No. It is the office calendar and evidence file next to those systems.",
  },
];

export function TitleIII() {
  return (
    <div className="landing landing-thin">
      <header className="land-bar">
        <Link to="/" className="mark-link">
          <Mark invert />
        </Link>
        <Link className="btn btn-paper" to="/app">
          Open director desk
        </Link>
      </header>

      <section className="hero hero-thin">
        <p className="kicker">Awardbound</p>
        <h1>Title III desk</h1>
        <p className="lede">
          After the Grant Award Notification, the office needs objectives, dates,
          drawdown, and evidence on one register. That work lives on the director
          desk.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-navy" to="/app">
            Open director desk
          </Link>
          <Link className="text-link" to="/">
            Back to Awardbound
          </Link>
        </div>
      </section>

      <section className="band">
        <header className="band-head">
          <p className="kicker">Questions</p>
        </header>
        <dl className="faq-list">
          {faqs.map((item) => (
            <div key={item.q}>
              <dt>{item.q}</dt>
              <dd>{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
