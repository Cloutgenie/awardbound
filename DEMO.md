# Awardbound demo

Prototype for a Title III Director at Alabama A&M University. Nothing here is a live federal award. The sample register is labeled **Sample**.

## Preview URL

A hosted preview is not published from this environment. After merge, deploy the `dist` output as a static SPA, or run locally:

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Click path

1. **Landing (`/`)** — Thin shell: Awardbound, “Upload the NOA. Get the calendar.”, fees (Starter **$6,000/yr**, Growth **$15,000/yr**, Institution **$30–50k/yr**), **Open director desk**. Shells owns further landing copy.
2. **Director desk (`/app`)** — Signed in as Inez Carr, Title III Director, Alabama A&M University. Nav: Grants, Alerts, Calendar, Settings.
3. **Ingest** — Click **New award** (or **Load sample or upload** if the register is empty). On `/app/new`, click **Load Alabama A&M Title III sample award**. Do not wait on a PDF parser.
4. **Extract** — Review award id `Awardbound-AAMU-T3-2024`, amount `$2,450,000`, four objectives, allowable activities, KPIs, owners, and cadence. Click **Create project**.
5. **Grant desk (`/app/grants/awardbound-aamu-t3-2024`)** — Sample chip, objectives with owners and due dates, evidence slots (some missing), drawdown vs. award, upcoming reports. Gold appears only on at-risk dates.
6. **Alerts (`/app/alerts`)** — Objective behind (STEM capacity), missing evidence, report due soon (quarterly memorandum).
7. **Calendar (`/app/calendar`)** — The same dates on one register.
8. **Settings (`/app/settings`)** — Mock identity. **Clear the local register** to start over.

Optional: on `/app/new`, upload any PDF. The desk attempts a text extract; if the file is scanned or empty, use the sample button.

## What “sample” means

Awardbound-AAMU-T3-2024 is a fictional Title III-style multi-year strengthening grant written for this prototype. It was not scraped from a real notice of award.
