// Inline stroke icons (Lucide-style, 1.75 weight) from the design handoff.
function Ico({ children }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function PhoneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function RouteIcon() {
  return (
    <Ico>
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </Ico>
  );
}

export function SealIcon() {
  return (
    <Ico>
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M8.5 8.5 7 3l5 2 5-2-1.5 5.5" />
      <path d="M12 12v9l-3-2-3 2" opacity="0" />
      <path d="M9 13.5 7 21l5-2 5 2-2-7.5" />
    </Ico>
  );
}

export function LifebuoyIcon() {
  return (
    <Ico>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <line x1="4.9" y1="4.9" x2="9.5" y2="9.5" />
      <line x1="14.5" y1="14.5" x2="19.1" y2="19.1" />
      <line x1="14.5" y1="9.5" x2="19.1" y2="4.9" />
      <line x1="4.9" y1="19.1" x2="9.5" y2="14.5" />
    </Ico>
  );
}

export function CheckIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
