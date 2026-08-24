export type EvidenceStatus = "on_file" | "missing";

export type ObjectiveStatus = "on_pace" | "behind" | "complete";

export type ReportStatus = "upcoming" | "in_progress" | "filed";

export type EvidenceSlot = {
  id: string;
  label: string;
  requiredFor: string;
  status: EvidenceStatus;
  filedOn?: string;
  dueDate?: string;
};

export type Objective = {
  id: string;
  code: string;
  title: string;
  summary: string;
  owner: string;
  ownerRole: string;
  dueDate: string;
  progress: number;
  target: string;
  current: string;
  status: ObjectiveStatus;
};

export type ReportItem = {
  id: string;
  title: string;
  cadence: string;
  dueDate: string;
  owner: string;
  status: ReportStatus;
};

export type AllowableActivity = {
  id: string;
  label: string;
  note: string;
};

export type Kpi = {
  id: string;
  label: string;
  baseline: string;
  target: string;
  current: string;
};

export type Drawdown = {
  awardTotal: number;
  drawnToDate: number;
  obligated: number;
  yearLabel: string;
  yearAllocation: number;
  yearDrawn: number;
};

export type OfficeOwner = {
  name: string;
  role: string;
};

export type GrantSource = "sample" | "upload";

export type Grant = {
  id: string;
  awardId: string;
  title: string;
  program: string;
  institution: string;
  campus: string;
  periodStart: string;
  periodEnd: string;
  awardTotal: number;
  source: GrantSource;
  isSample: boolean;
  objectives: Objective[];
  evidence: EvidenceSlot[];
  reports: ReportItem[];
  allowable: AllowableActivity[];
  kpis: Kpi[];
  drawdown: Drawdown;
  reportingCadence: string;
  owners: OfficeOwner[];
  createdAt: string;
  sourceFileName?: string;
};

export type AlertKind = "objective_behind" | "missing_evidence" | "report_due_soon";

export type DeskAlert = {
  id: string;
  grantId: string;
  awardId: string;
  kind: AlertKind;
  title: string;
  detail: string;
  date?: string;
  atRisk: boolean;
};

export type ExtractDraft = {
  source: GrantSource;
  isSample: boolean;
  sourceFileName?: string;
  awardId: string;
  title: string;
  program: string;
  institution: string;
  campus: string;
  periodStart: string;
  periodEnd: string;
  awardTotal: number;
  reportingCadence: string;
  extractedNotes: string[];
  objectives: Objective[];
  evidence: EvidenceSlot[];
  reports: ReportItem[];
  allowable: AllowableActivity[];
  kpis: Kpi[];
  drawdown: Drawdown;
  owners: OfficeOwner[];
};
