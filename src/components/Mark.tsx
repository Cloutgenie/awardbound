type MarkProps = {
  lockup?: boolean;
  invert?: boolean;
  size?: "sm" | "md" | "lg";
};

export function FolioStamp({
  invert = false,
  size = "md",
}: {
  invert?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const px = size === "sm" ? 28 : size === "lg" ? 56 : 36;
  const paper = invert ? "#1B2A4A" : "#F4EFE6";
  const navy = invert ? "#F4EFE6" : "#1B2A4A";

  return (
    <svg
      className="folio-stamp"
      width={px}
      height={px}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="58" height="58" rx="4" stroke={navy} strokeWidth="2" />
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="2.5"
        stroke={navy}
        strokeWidth="1"
        opacity="0.7"
      />
      <rect x="22" y="16" width="26" height="32" fill={paper} stroke={navy} strokeWidth="1.4" />
      <rect x="16" y="16" width="8" height="32" fill={navy} />
      <path d="M24 16v32" stroke={paper} strokeWidth="1" />
      <path
        d="M29 24h15M29 30h13M29 36h11"
        stroke={navy}
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Mark({ lockup = true, invert = false, size = "md" }: MarkProps) {
  return (
    <span className={`mark mark-${size}${invert ? " mark-invert" : ""}`}>
      <FolioStamp invert={invert} size={size} />
      {lockup ? <span className="mark-word">Awardbound</span> : null}
    </span>
  );
}
