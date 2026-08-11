import type { ReactNode } from 'react';
import type { GroupIconKey } from '../lib/productGroups';

const PATHS: Record<GroupIconKey, ReactNode> = {
  tap: (
    <>
      <circle cx="12" cy="14" r="5" />
      <path d="M12 4v5M9 4h6M9 19l-1 3M15 19l1 3" />
    </>
  ),
  pipe: <path d="M4 4v8a6 6 0 0 0 6 6h10" />,
  shower: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0" />
      <path d="M4 9h16M8 13v2M12 13v3M16 13v2" />
    </>
  ),
  basin: (
    <>
      <path d="M4 12h16M4 12a8 3.2 0 0 0 16 0M12 12V6" />
      <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  tank: (
    <>
      <rect x="6" y="4" width="12" height="16" rx="1.5" />
      <path d="M6 9h12" />
    </>
  ),
  mirror: (
    <>
      <rect x="6" y="3" width="12" height="16" rx="6" />
      <path d="M9 21h6M12 19v2" />
    </>
  ),
  hook: <path d="M12 3v8M8 13a4 4 0 1 0 8 0" />,
  shelf: <path d="M4 9h16M6 9V6h12v3M8 9v4M16 9v4" />,
  towel: <path d="M5 7.5h14M8 7.5v11M16 7.5v11" />,
  soap: <path d="M5 15c0-3.5 1.5-6 3.5-8M5 15a7 3 0 0 0 14 0 7 3 0 0 0-8-2.9" />,
  tools: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.8 2.8-2-2 2.8-2.8Z" />,
  electric: <path d="M9 3v4M15 3v4M6 7h12v6a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V7ZM12 17v4" />,
  jali: <path d="M4 4h16v16H4zM4 9h16M4 14h16M9 4v16M14 4v16" />,
  seat: (
    <>
      <ellipse cx="12" cy="13" rx="7" ry="6" />
      <ellipse cx="12" cy="13" rx="3.6" ry="3.2" />
    </>
  ),
  paper: (
    <>
      <circle cx="15" cy="9" r="5" />
      <circle cx="15" cy="9" r="2" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
    </>
  ),
  tumbler: <path d="M7 4h10l-1.5 14a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2L7 4Z" />,
  gauge: <path d="M12 12 16 9M4 12a8 8 0 1 1 16 0 7.9 7.9 0 0 1-1.5 4.6M8 12H8M12 6.5V6M16 12H16" />,
  part: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
    </>
  ),
  grabbar: <path d="M3 10h18M3 10a2 2 0 0 1 2-2h1M21 10a2 2 0 0 0-2-2h-1M6 8V6M18 8V6" />,
  more: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.4" />
      <rect x="13" y="4" width="7" height="7" rx="1.4" />
      <rect x="4" y="13" width="7" height="7" rx="1.4" />
      <rect x="13" y="13" width="7" height="7" rx="1.4" />
    </>
  ),
};

export default function GroupIcon({ icon }: { icon: GroupIconKey }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {PATHS[icon]}
    </svg>
  );
}
