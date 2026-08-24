import type { ExtractDraft, Grant } from "../types";

/** Fictional Title III-style register. Not a real notice of award. */
export const SAMPLE_AWARD_ID = "Awardbound-AAMU-T3-2024";
export const SAMPLE_GRANT_ID = "awardbound-aamu-t3-2024";

const owners = [
  { name: "Inez Carr", role: "Title III Director" },
  { name: "Dr. Marcus Ellison", role: "Activity director, STEM capacity" },
  { name: "Dr. Ruth Adeyemi", role: "Undergraduate Studies" },
  { name: "Pilar Nguyen", role: "Grants accounting" },
];

export function buildSampleDraft(): ExtractDraft {
  return {
    source: "sample",
    isSample: true,
    sourceFileName: "Awardbound-AAMU-T3-2024.sample.pdf",
    awardId: SAMPLE_AWARD_ID,
    title: "Strengthening academic programs and institutional management",
    program: "Title III, Part B — Strengthening HBCUs (sample register)",
    institution: "Alabama A&M University",
    campus: "Normal, Alabama",
    periodStart: "2024-10-01",
    periodEnd: "2029-09-30",
    awardTotal: 2_450_000,
    reportingCadence: "Quarterly activity memorandum; annual performance report each September",
    extractedNotes: [
      "Sample extract — fictional five-year strengthening award. Rounded demo dollars.",
      "Award amount $2,450,000. Performance period 1 Oct 2024 – 30 Sep 2029.",
      "Four objectives, six evidence slots, and a quarterly-plus-annual report cadence.",
      "This is not a copy of a federal notice of award and is not drawn from a real PDF.",
    ],
    owners,
    objectives: [
      {
        id: "obj-01",
        code: "01",
        title: "STEM instructional capacity",
        summary:
          "Seat three approved faculty lines in engineering and physical sciences and keep the syllabi and load reports on file.",
        owner: "Dr. Marcus Ellison",
        ownerRole: "Activity director, STEM capacity",
        dueDate: "2026-08-01",
        progress: 33,
        target: "3 faculty lines seated",
        current: "1 of 3 seated",
        status: "behind",
      },
      {
        id: "obj-02",
        code: "02",
        title: "Academic success center",
        summary:
          "Hold scheduled tutoring and advising hours for first-year STEM students and file attendance against the activity calendar.",
        owner: "Dr. Ruth Adeyemi",
        ownerRole: "Undergraduate Studies",
        dueDate: "2026-12-15",
        progress: 62,
        target: "1,200 contact hours / year",
        current: "740 hours recorded",
        status: "on_pace",
      },
      {
        id: "obj-03",
        code: "03",
        title: "Sponsored-programs desk",
        summary:
          "Keep every active award on one register with owners, due dates, and evidence slots visible to the Title III office.",
        owner: "Inez Carr",
        ownerRole: "Title III Director",
        dueDate: "2026-10-31",
        progress: 70,
        target: "Register current within 5 business days of a NOA",
        current: "This sample award is on the desk",
        status: "on_pace",
      },
      {
        id: "obj-04",
        code: "04",
        title: "Drawdown discipline",
        summary:
          "Match drawdowns to allowable activities and keep the year allocation, obligated, and drawn figures on one ledger.",
        owner: "Pilar Nguyen",
        ownerRole: "Grants accounting",
        dueDate: "2026-09-30",
        progress: 55,
        target: "Year-2 allocation $490,000",
        current: "$310,000 drawn this year",
        status: "on_pace",
      },
    ],
    evidence: [
      {
        id: "ev-1",
        label: "Year 1 annual performance narrative",
        requiredFor: "Objective 03 · office file",
        status: "on_file",
        filedOn: "2025-11-12",
      },
      {
        id: "ev-2",
        label: "Faculty line packets (three position files)",
        requiredFor: "Objective 01 · STEM capacity",
        status: "missing",
        dueDate: "2026-08-01",
      },
      {
        id: "ev-3",
        label: "Summer bridge attendance roster",
        requiredFor: "Objective 02 · academic success",
        status: "missing",
        dueDate: "2026-08-29",
      },
      {
        id: "ev-4",
        label: "Instructional lab invoices, FY26 Q1–Q2",
        requiredFor: "Objective 01 · allowable equipment",
        status: "on_file",
        filedOn: "2026-04-18",
      },
      {
        id: "ev-5",
        label: "Q3 activity evidence bundle",
        requiredFor: "Quarterly memorandum",
        status: "missing",
        dueDate: "2026-08-31",
      },
      {
        id: "ev-6",
        label: "External evaluation work plan",
        requiredFor: "Objective 03 · evaluation",
        status: "on_file",
        filedOn: "2026-01-22",
      },
    ],
    reports: [
      {
        id: "rp-1",
        title: "Quarterly activity memorandum",
        cadence: "Quarterly",
        dueDate: "2026-08-31",
        owner: "Inez Carr",
        status: "in_progress",
      },
      {
        id: "rp-2",
        title: "Mid-year drawdown certification",
        cadence: "Twice yearly",
        dueDate: "2026-09-15",
        owner: "Pilar Nguyen",
        status: "upcoming",
      },
      {
        id: "rp-3",
        title: "Annual performance report",
        cadence: "Annual · September",
        dueDate: "2026-09-30",
        owner: "Inez Carr",
        status: "upcoming",
      },
      {
        id: "rp-4",
        title: "External evaluation brief",
        cadence: "Annual",
        dueDate: "2027-01-15",
        owner: "Title III office",
        status: "upcoming",
      },
    ],
    allowable: [
      {
        id: "al-1",
        label: "Faculty salary on approved STEM lines",
        note: "Only the three lines named in objective 01.",
      },
      {
        id: "al-2",
        label: "Instructional equipment on the award budget",
        note: "Lab items already listed; invoices stay in the evidence slot.",
      },
      {
        id: "al-3",
        label: "Academic support staffing",
        note: "Tutors and advisors charged to the success-center activity.",
      },
      {
        id: "al-4",
        label: "Professional development tied to an objective",
        note: "Travel and institutes must name the objective and the attendee.",
      },
      {
        id: "al-5",
        label: "Evaluation and the award register",
        note: "External evaluation and the desk system used to keep dates.",
      },
    ],
    kpis: [
      {
        id: "kpi-1",
        label: "First-to-second year persistence, STEM declared",
        baseline: "68%",
        target: "76% by Year 5",
        current: "71%",
      },
      {
        id: "kpi-2",
        label: "Faculty lines seated",
        baseline: "0 of 3",
        target: "3 of 3",
        current: "1 of 3",
      },
      {
        id: "kpi-3",
        label: "Evidence slots complete before a site visit",
        baseline: "—",
        target: "100%",
        current: "3 of 6 on file",
      },
      {
        id: "kpi-4",
        label: "Drawdown vs. time elapsed, Year 2",
        baseline: "—",
        target: "In step with the year",
        current: "$310,000 of $490,000",
      },
    ],
    drawdown: {
      awardTotal: 2_450_000,
      drawnToDate: 890_000,
      obligated: 1_120_000,
      yearLabel: "Year 2 · FY2026",
      yearAllocation: 490_000,
      yearDrawn: 310_000,
    },
  };
}

export function draftToGrant(draft: ExtractDraft, id = SAMPLE_GRANT_ID): Grant {
  return {
    id,
    awardId: draft.awardId,
    title: draft.title,
    program: draft.program,
    institution: draft.institution,
    campus: draft.campus,
    periodStart: draft.periodStart,
    periodEnd: draft.periodEnd,
    awardTotal: draft.awardTotal,
    source: draft.source,
    isSample: draft.isSample,
    objectives: draft.objectives,
    evidence: draft.evidence,
    reports: draft.reports,
    allowable: draft.allowable,
    kpis: draft.kpis,
    drawdown: draft.drawdown,
    reportingCadence: draft.reportingCadence,
    owners: draft.owners,
    createdAt: new Date().toISOString(),
    sourceFileName: draft.sourceFileName,
  };
}

export function getSampleGrant(): Grant {
  return draftToGrant(buildSampleDraft(), SAMPLE_GRANT_ID);
}
