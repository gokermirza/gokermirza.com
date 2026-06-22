import { Line, Row } from "@once-ui-system/core";

// Signature motif for the site — a compass needle (nods to "Kurumsal Pusula").
// North half uses the warm accent; south half stays muted.
export function CompassMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      style={{ display: "block", flexShrink: 0 }}
    >
      <circle cx="12" cy="12" r="10.5" stroke="var(--neutral-alpha-medium)" strokeWidth="1" />
      {/* North needle — accent */}
      <path d="M12 3 L14.2 12 L12 12 Z" fill="var(--accent-on-background-strong, #E8833A)" />
      <path d="M12 3 L9.8 12 L12 12 Z" fill="var(--accent-on-background-medium, #C96E2E)" />
      {/* South needle — muted */}
      <path d="M12 21 L14.2 12 L12 12 Z" fill="var(--neutral-on-background-medium)" />
      <path d="M12 21 L9.8 12 L12 12 Z" fill="var(--neutral-on-background-weak)" />
      <circle cx="12" cy="12" r="1.5" fill="var(--neutral-on-background-strong)" />
    </svg>
  );
}

// A horizontal divider with the compass mark centered — used between sections.
export function CompassDivider({ maxWidth }: { maxWidth?: number }) {
  return (
    <Row fillWidth vertical="center" horizontal="center" gap="16" paddingY="8" maxWidth={maxWidth}>
      <Line background="neutral-alpha-medium" />
      <CompassMark size={18} />
      <Line background="neutral-alpha-medium" />
    </Row>
  );
}
