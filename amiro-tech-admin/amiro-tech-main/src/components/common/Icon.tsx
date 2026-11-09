const paths = {
  arrow: (
    <>
      <path d="M4.5 12h14" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6.5 5.5 5.5-5.5 5.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  external: (
    <>
      <path d="M14 3.5h6.5V10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m20.5 3.5-9.5 9.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 13.5v5a2 2 0 0 1-2 2H5.5a2 2 0 0 1-2-2v-10.5a2 2 0 0 1 2-2H11" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9.5" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.6" />
      <path d="m7.5 12 3.2 3.2 5.8-6.4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  code: (
    <>
      <rect x="2" y="3.5" width="20" height="17" rx="3.5" fill="currentColor" fillOpacity="0.12" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2 8.5h20" strokeWidth="1.2" opacity="0.4" />
      <circle cx="5.2" cy="6" r="0.9" fill="currentColor" />
      <circle cx="8" cy="6" r="0.9" fill="currentColor" />
      <circle cx="10.8" cy="6" r="0.9" fill="currentColor" />
      <path d="m8 12-2.5 2.5L8 17" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m16 12 2.5 2.5L16 17" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m13 11-2 7" strokeWidth="1.9" strokeLinecap="round" />
    </>
  ),
  layers: (
    <>
      <path d="m12 2.5 8.5 4.5-8.5 4.5L3.5 7 12 2.5Z" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m3.5 11.5 8.5 4.5 8.5-4.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3.5 16 8.5 4.5 8.5-4.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  sparkle: (
    <>
      <path
        d="M12 2 C12 6.5 15.5 10 20 10 C15.5 10 12 13.5 12 18 C12 13.5 8.5 10 4 10 C8.5 10 12 6.5 12 2 Z"
        fill="currentColor"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="1.5" fill="currentColor" />
      <path
        d="M19 15 C19 16.8 20.2 18 22 18 C20.2 18 19 19.2 19 21 C19 19.2 17.8 18 16 18 C17.8 18 19 16.8 19 15 Z"
        fill="currentColor"
        fillOpacity="0.35"
      />
      <circle cx="5.5" cy="18.5" r="1" fill="currentColor" fillOpacity="0.75" />
    </>
  ),
  voice: (
    <>
      <rect x="8.5" y="2.5" width="7" height="12" rx="3.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 5.5v3M9.5 8.5h5" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
      <path d="M5 10.5a7 7 0 0 0 14 0" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 17.5v3.5M8.5 21h7" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M2.5 10.5a9.5 9.5 0 0 0 2 5.5M21.5 10.5a9.5 9.5 0 0 1-2 5.5" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
    </>
  ),
  flow: (
    <>
      <rect x="2.5" y="3.5" width="6.5" height="6.5" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="15" y="14" width="6.5" height="6.5" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18.25" cy="6.75" r="3.25" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 6.75h6" strokeWidth="1.6" strokeDasharray="2 2" strokeLinecap="round" />
      <path d="M5.75 10v3a3 3 0 0 0 3 3h6.25" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m13 14 2 2-2 2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v4M15 2v4" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="6.5" y="6" width="11" height="8.5" rx="2.5" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6.5 10h11" strokeWidth="1.2" opacity="0.4" />
      <path d="M10 14.5v2.2a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2v-2.2" strokeWidth="1.7" />
      <path d="M12 18.7V22" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="10" r="1.3" fill="currentColor" />
    </>
  ),
  chart: (
    <>
      <rect x="2.5" y="3" width="19" height="18" rx="3.5" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 17.5h18" strokeWidth="1.2" opacity="0.35" />
      <path d="M6 14.5v-3M10 14.5v-6.5M14 14.5v-4.5M18 14.5v-8" strokeWidth="2.5" strokeLinecap="round" stroke="currentColor" />
      <path d="M5.5 11.5 9.5 7.5 13.5 9.5 18.5 4.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
      <circle cx="18.5" cy="4.5" r="1.5" fill="currentColor" />
    </>
  ),
  cloud: (
    <>
      <path
        d="M17.5 19H7a5 5 0 0 1-1.3-9.8A6.5 6.5 0 0 1 18.5 11 4.5 4.5 0 0 1 17.5 19Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 11.5v5M9.5 14l2.5-2.5 2.5 2.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" fill="currentColor" fillOpacity="0.24" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 5.5v5.5c0 1.66 3.58 3 8 3s8-1.34 8-3V5.5" strokeWidth="1.6" />
      <path d="M4 11v5.5c0 1.66 3.58 3 8 3s8-1.34 8-3V11" strokeWidth="1.6" />
      <circle cx="7.5" cy="11" r="0.9" fill="currentColor" />
      <circle cx="7.5" cy="16.5" r="0.9" fill="currentColor" />
      <path d="M11.5 11h4.5M11.5 16.5h4.5" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </>
  ),
  monitor: (
    <>
      <rect x="2.5" y="3.5" width="19" height="13" rx="2.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.5 13.5h19" strokeWidth="1.2" opacity="0.35" />
      <circle cx="12" cy="5.5" r="0.8" fill="currentColor" opacity="0.75" />
      <path d="M12 16.5v4M8 20.5h8" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  phone: (
    <>
      <rect x="6.5" y="2" width="11" height="20" rx="3.5" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.7" />
      <path d="M10 5h4" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <circle cx="12" cy="18.5" r="1.1" fill="currentColor" />
    </>
  ),
  shield: (
    <>
      <path
        d="M12 2.5 C16 4.5 19 4 20 4.5 C20 12.5 16.5 18.5 12 21.5 C7.5 18.5 4 12.5 4 4.5 C5 4 8 4.5 12 2.5 Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M12 6.5v12" strokeWidth="1.2" opacity="0.3" strokeDasharray="1.5 2" />
      <path d="m9 11.5 2 2 4-4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  doc: (
    <>
      <path
        d="M6 3h8.5l4.5 4.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path d="M14.5 3v4.5H19" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 12h8M8 15.5h6M8 8.5h3.5" strokeWidth="1.7" strokeLinecap="round" opacity="0.75" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" fill="currentColor" fillOpacity="0.24" stroke="currentColor" strokeWidth="1.7" />
      <path d="M2.5 19.5c0-3.3 2.9-6 6.5-6s6.5 2.7 6.5 6" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M16 4.5a3 3 0 0 1 0 6" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M17.5 14c2.2.5 4 2.3 4 5.5" strokeWidth="1.7" strokeLinecap="round" />
    </>
  ),
  pin: (
    <>
      <path
        d="M12 21.5c-4-5-7-8.8-7-12a7 7 0 1 1 14 0c0 3.2-3 7-7 12Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.5" r="2.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="21.5" rx="3.5" ry="1" fill="currentColor" fillOpacity="0.3" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3 12h18" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18M12 3a14.5 14.5 0 0 0 0 18" strokeWidth="1.6" />
      <ellipse cx="12" cy="12" rx="8.5" ry="4.5" strokeWidth="1.2" opacity="0.45" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="3" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.7" />
      <path d="m3.5 6 7.5 6.2a1.6 1.6 0 0 0 2 0L20.5 6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m3.5 18 5.5-5M20.5 18l-5.5-5" strokeWidth="1.3" opacity="0.45" strokeLinecap="round" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13.5" rx="3" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8.5 7V5a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M3 12h18" strokeWidth="1.4" opacity="0.4" />
      <rect x="10.5" y="10.5" width="3" height="3" rx="0.8" fill="currentColor" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 4.5v1.5M12 18v1.5M4.5 12h1.5M18 12h1.5" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      <path d="M12 7.5v4.5l3 2" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.3" fill="currentColor" />
    </>
  ),
  review: (
    <>
      <circle cx="11" cy="11" r="7.5" fill="currentColor" fillOpacity="0.18" stroke="currentColor" strokeWidth="1.7" />
      <path d="m16.5 16.5 4.5 4.5" strokeWidth="2.2" strokeLinecap="round" />
      <path d="m8 11 2 2 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  rocket: (
    <>
      <path
        d="M14.5 3.5 C17 4 19.5 6 20.5 8.5 C20.5 11.5 18.5 14.5 15.5 16.5 L13 19 L10 16 L12.5 13.5 C10.5 10.5 7.5 8.5 4.5 8.5 C7 7.5 9 5 9.5 2.5 C11.5 2.5 13 3 14.5 3.5 Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="9" r="1.8" fill="currentColor" />
      <path d="m6 17 3-1-1-3-4 1c-.5 1.5.5 2.5 2 3Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M4 20c2-1 3-3 3-4M2 22c3-1 4-3 4-5" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 10.5v5.5M12 7.5v.01" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  menu: (
    <>
      <path d="M3.5 6h17M3.5 12h17M3.5 18h17" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  close: (
    <>
      <path d="M5 5 19 19M19 5 5 19" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
} as const

export type IconName = keyof typeof paths

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg aria-hidden="true" className={['icon', className].filter(Boolean).join(' ')} viewBox="0 0 24 24">
      {paths[name]}
    </svg>
  )
}
