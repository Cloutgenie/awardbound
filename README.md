# Awardbound

Desk software for HBCU Title III and sponsored-programs offices.

**Upload the NOA. Get the calendar.**

Awardbound is an original prototype. It is not a copy of an existing grant-management product, and it is not Awarded.com. The buyer mock is the Title III Director at Alabama A&M University.

## What it does

- Ingest a notice of award PDF, or load a labeled Alabama A&M Title III **sample** award
- Extract amount, objectives, deadlines, allowable activities, KPIs, reporting cadence, and owners
- Keep a per-award desk: objectives, evidence slots, drawdown vs. award, upcoming reports
- Surface alerts when an objective is behind, evidence is missing, or a report is due soon

## Stack

Vite, React, TypeScript. Client-side state only (`localStorage`). No authentication.

## Brand

Navy `#1B2A4A`, paper `#F4EFE6`, ink `#111827`. Alert gold `#C4A35A` is used only on deadlines and at-risk dates. The mark is a bound folio / seal stamp plus the Awardbound wordmark.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Sample award

Fictional five-year strengthening award, id `Awardbound-AAMU-T3-2024`. Rounded demo dollars. It is not a real federal notice of award.

See [DEMO.md](./DEMO.md) for the click path.
