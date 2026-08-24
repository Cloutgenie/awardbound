import { dueLabel, formatDate, isDateAtRisk } from "../lib/dates";

type DeadlineProps = {
  iso: string;
  compact?: boolean;
};

export function Deadline({ iso, compact = false }: DeadlineProps) {
  const atRisk = isDateAtRisk(iso);
  return (
    <time
      className={atRisk ? "deadline deadline-risk" : "deadline"}
      dateTime={iso}
      title={formatDate(iso)}
    >
      {compact ? dueLabel(iso) : `${formatDate(iso)} · ${dueLabel(iso)}`}
    </time>
  );
}
