const DAY = 86_400_000;
const AT_RISK_DAYS = 21;

function utcDay(date: Date): number {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

export function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function daysUntil(iso: string, from = new Date()): number {
  return Math.round((utcDay(parseIsoDate(iso)) - utcDay(from)) / DAY);
}

export function isDateAtRisk(iso: string, from = new Date()): boolean {
  return daysUntil(iso, from) <= AT_RISK_DAYS;
}

export function formatDate(iso: string): string {
  return parseIsoDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function dueLabel(iso: string, from = new Date()): string {
  const days = daysUntil(iso, from);
  if (days < 0) return `${Math.abs(days)} days overdue`;
  if (days === 0) return "Due today";
  if (days === 1) return "Due tomorrow";
  if (days <= AT_RISK_DAYS) return `Due in ${days} days`;
  return formatDate(iso);
}

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
