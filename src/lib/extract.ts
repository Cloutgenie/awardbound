import type { ExtractDraft, Objective } from "../types";

function decodePdfEscapes(value: string): string {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "")
    .replace(/\\t/g, " ")
    .replace(/\\([()\\])/g, "$1");
}

export function extractTextFromPdfBytes(bytes: Uint8Array): string {
  const raw = new TextDecoder("latin1").decode(bytes);
  const chunks: string[] = [];
  const literal = /\(((?:\\.|[^\\)])*)\)/g;
  let match: RegExpExecArray | null;
  while ((match = literal.exec(raw))) {
    const text = decodePdfEscapes(match[1]).replace(/\s+/g, " ").trim();
    if (text.length > 1 && /[A-Za-z0-9]/.test(text)) chunks.push(text);
  }
  return chunks.join(" ").replace(/\s+/g, " ").trim();
}

function firstMoney(text: string): number | undefined {
  const match = text.match(/\$[\s]*([0-9]{1,3}(?:,[0-9]{3})+|[0-9]{4,})/);
  if (!match) return undefined;
  const value = Number(match[1].replace(/,/g, ""));
  return Number.isFinite(value) ? value : undefined;
}

function isoDates(text: string): string[] {
  const found = new Set<string>();
  const monthMap: Record<string, string> = {
    jan: "01",
    january: "01",
    feb: "02",
    february: "02",
    mar: "03",
    march: "03",
    apr: "04",
    april: "04",
    may: "05",
    jun: "06",
    june: "06",
    jul: "07",
    july: "07",
    aug: "08",
    august: "08",
    sep: "09",
    sept: "09",
    september: "09",
    oct: "10",
    october: "10",
    nov: "11",
    november: "11",
    dec: "12",
    december: "12",
  };

  const iso = text.matchAll(/\b(20\d{2})-(\d{2})-(\d{2})\b/g);
  for (const m of iso) found.add(`${m[1]}-${m[2]}-${m[3]}`);

  const us = text.matchAll(/\b(\d{1,2})\/(\d{1,2})\/(20\d{2})\b/g);
  for (const m of us) {
    found.add(`${m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`);
  }

  const named = text.matchAll(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\.?\s+(\d{1,2}),?\s+(20\d{2})\b/gi,
  );
  for (const m of named) {
    const month = monthMap[m[1].toLowerCase()];
    if (month) found.add(`${m[3]}-${month}-${m[2].padStart(2, "0")}`);
  }

  return [...found].sort();
}

function titleFromFileName(fileName: string): string {
  return fileName
    .replace(/\.pdf$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 24 && s.length < 280)
    .slice(0, 8);
}

function makeObjective(
  code: string,
  title: string,
  summary: string,
  dueDate: string,
  owner: string,
): Objective {
  return {
    id: `up-obj-${code}`,
    code,
    title,
    summary,
    owner,
    ownerRole: "Assigned on create",
    dueDate,
    progress: 0,
    target: "Set on the grant desk",
    current: "Not yet started",
    status: "on_pace",
  };
}

export async function draftFromPdf(file: File): Promise<ExtractDraft> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const text = extractTextFromPdfBytes(bytes);
  const dates = isoDates(text);
  const amount = firstMoney(text);
  const notes = sentences(text);
  const periodStart = dates[0] ?? "2024-10-01";
  const periodEnd = dates[1] ?? dates[0] ?? "2029-09-30";
  const reportDate = dates[2] ?? dates[1] ?? "2026-09-30";
  const awardTotal = amount ?? 0;
  const hasObjectives = /objective/i.test(text);
  const hasDrawdown = /drawdown|allowable/i.test(text);

  const extractedNotes = [
    text
      ? `Read ${text.length.toLocaleString()} characters from ${file.name}. Structured fields below are a first pass — review before you create the project.`
      : `Could not lift running text from ${file.name}. The file may be scanned. Review the fields, or load the Alabama A&M sample award instead.`,
    amount
      ? `Amount found: $${amount.toLocaleString("en-US")}.`
      : "No award amount was found in the file text.",
    dates.length
      ? `Dates found: ${dates.slice(0, 4).join(", ")}.`
      : "No calendar dates were found in the file text.",
    ...notes.slice(0, 3),
  ];

  return {
    source: "upload",
    isSample: false,
    sourceFileName: file.name,
    awardId: `Awardbound-UPLOAD-${Date.now().toString(36).toUpperCase()}`,
    title: titleFromFileName(file.name) || "Uploaded notice of award",
    program: hasObjectives
      ? "Extracted from uploaded PDF"
      : "Uploaded PDF — program line not found",
    institution: "Alabama A&M University",
    campus: "Normal, Alabama",
    periodStart,
    periodEnd,
    awardTotal,
    reportingCadence: /annual/i.test(text)
      ? "Annual performance report (from file text)"
      : "Set reporting cadence on the desk",
    extractedNotes,
    owners: [{ name: "Inez Carr", role: "Title III Director" }],
    objectives: hasObjectives
      ? [
          makeObjective(
            "01",
            "Objective named in the upload",
            notes[0] ?? "Review the file and replace this line with the official objective.",
            dates[0] ?? "2026-09-30",
            "Inez Carr",
          ),
        ]
      : [
          makeObjective(
            "01",
            "Confirm objectives from the notice of award",
            "The upload did not yield a clean objective list. Add the official language after create, or use the sample award to see a full register.",
            "2026-09-30",
            "Inez Carr",
          ),
        ],
    evidence: [
      {
        id: "up-ev-1",
        label: "Notice of award PDF",
        requiredFor: "Award file",
        status: "on_file",
        filedOn: new Date().toISOString().slice(0, 10),
      },
      {
        id: "up-ev-2",
        label: "First evidence packet",
        requiredFor: "Objective 01",
        status: "missing",
        dueDate: reportDate,
      },
    ],
    reports: [
      {
        id: "up-rp-1",
        title: "Next report on the award",
        cadence: "From upload",
        dueDate: reportDate,
        owner: "Inez Carr",
        status: "upcoming",
      },
    ],
    allowable: hasDrawdown
      ? [
          {
            id: "up-al-1",
            label: "Allowable activity mentioned in the file",
            note: notes[1] ?? "Confirm against the official budget before a drawdown.",
          },
        ]
      : [
          {
            id: "up-al-1",
            label: "Confirm allowable activities",
            note: "Not extracted. Enter the approved activities before the first drawdown.",
          },
        ],
    kpis: [
      {
        id: "up-kpi-1",
        label: "KPI to confirm from the award",
        baseline: "—",
        target: "Set from the NOA",
        current: "—",
      },
    ],
    drawdown: {
      awardTotal,
      drawnToDate: 0,
      obligated: 0,
      yearLabel: "Year 1 (from upload)",
      yearAllocation: amount ? Math.round(amount / 5) : 0,
      yearDrawn: 0,
    },
  };
}
