import { useDesk } from "../lib/store";

export function Settings() {
  const { grants, clearDesk } = useDesk();

  return (
    <div className="page">
      <header className="page-head">
        <div>
          <p className="kicker">Office</p>
          <h1>Settings</h1>
          <p className="page-lead">
            This prototype does not authenticate. The director desk is open in this
            browser, signed in as the Title III Director at Alabama A&amp;M University.
          </p>
        </div>
      </header>

      <section className="panel">
        <header className="panel-head">
          <h2>Signed-in mock</h2>
        </header>
        <dl className="draw-list">
          <div>
            <dt>Name</dt>
            <dd>Inez Carr</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>Title III Director</dd>
          </div>
          <div>
            <dt>Institution</dt>
            <dd>Alabama A&amp;M University</dd>
          </div>
          <div>
            <dt>Campus</dt>
            <dd>Normal, Alabama</dd>
          </div>
          <div>
            <dt>Office</dt>
            <dd>Title III / Sponsored Programs</dd>
          </div>
        </dl>
      </section>

      <section className="panel">
        <header className="panel-head">
          <h2>Desk preferences</h2>
          <p>Stored only in this browser. No server, no account.</p>
        </header>
        <dl className="draw-list">
          <div>
            <dt>Alert window</dt>
            <dd>21 days before a report or evidence date</dd>
          </div>
          <div>
            <dt>Date mark</dt>
            <dd>Alert gold on at-risk dates only</dd>
          </div>
          <div>
            <dt>Awards on this desk</dt>
            <dd>{grants.length}</dd>
          </div>
        </dl>
        <button className="btn btn-ghost" type="button" onClick={clearDesk}>
          Clear the local register
        </button>
      </section>
    </div>
  );
}
