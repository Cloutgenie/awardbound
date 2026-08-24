import { daysUntil, isDateAtRisk } from "./dates";
import type { DeskAlert, Grant } from "../types";

export function alertsForGrants(grants: Grant[], from = new Date()): DeskAlert[] {
  const alerts: DeskAlert[] = [];

  for (const grant of grants) {
    for (const objective of grant.objectives) {
      if (objective.status !== "behind") continue;
      alerts.push({
        id: `${grant.id}-obj-${objective.id}`,
        grantId: grant.id,
        awardId: grant.awardId,
        kind: "objective_behind",
        title: `Objective ${objective.code} is behind`,
        detail: `${objective.title} · ${objective.current} against ${objective.target}. Owner: ${objective.owner}.`,
        date: objective.dueDate,
        atRisk: isDateAtRisk(objective.dueDate, from),
      });
    }

    for (const slot of grant.evidence) {
      if (slot.status !== "missing") continue;
      alerts.push({
        id: `${grant.id}-ev-${slot.id}`,
        grantId: grant.id,
        awardId: grant.awardId,
        kind: "missing_evidence",
        title: "Evidence slot is empty",
        detail: `${slot.label} is still missing (${slot.requiredFor}).`,
        date: slot.dueDate,
        atRisk: slot.dueDate ? isDateAtRisk(slot.dueDate, from) : false,
      });
    }

    for (const report of grant.reports) {
      if (report.status === "filed") continue;
      const days = daysUntil(report.dueDate, from);
      if (days > 21) continue;
      alerts.push({
        id: `${grant.id}-rp-${report.id}`,
        grantId: grant.id,
        awardId: grant.awardId,
        kind: "report_due_soon",
        title: days < 0 ? "Report date has passed" : "Report due soon",
        detail: `${report.title} · ${report.cadence}. Owner: ${report.owner}.`,
        date: report.dueDate,
        atRisk: isDateAtRisk(report.dueDate, from),
      });
    }
  }

  return alerts.sort((a, b) => {
    const ad = a.date ? daysUntil(a.date, from) : 999;
    const bd = b.date ? daysUntil(b.date, from) : 999;
    return ad - bd;
  });
}

export function alertKindLabel(kind: DeskAlert["kind"]): string {
  if (kind === "objective_behind") return "Objective behind";
  if (kind === "missing_evidence") return "Missing evidence";
  return "Report due soon";
}
