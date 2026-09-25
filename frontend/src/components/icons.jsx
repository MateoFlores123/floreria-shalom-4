export function CartIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 4h2l1.6 9.6a2 2 0 0 0 2 1.7h7.3a2 2 0 0 0 2-1.6L19.2 8H6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="19.5" r="1.4" fill="currentColor" />
      <circle cx="16.5" cy="19.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function UserIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="8.2" r="3.4" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M4.8 19.5c1.3-3.3 4-5 7.2-5s5.9 1.7 7.2 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MenuIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 4a12 12 0 0 0-10.3 18.1L4 28l6.1-1.6A12 12 0 1 0 16 4z"
        fill="currentColor"
      />
      <path
        d="M11.3 10.4c.3-.6.6-.6.9-.6h.7c.2 0 .5 0 .7.5.3.6 1 2.1 1 2.3.1.2.1.4 0 .6-.1.2-.2.3-.4.5l-.5.6c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.2 2.4 1.5 2.7 1.7.3.2.5.1.7-.1l.6-.7c.2-.3.4-.2.7-.1l1.9.9c.2.1.4.2.5.4.1.2.1 1-.3 1.9-.4.9-2 1.7-2.8 1.8-.7.1-1.6.2-5.1-1.1-3.4-1.4-5.5-4.8-5.7-5-.2-.3-1.5-2-1.5-3.8s.9-2.7 1.3-3.1z"
        fill="#fff"
      />
    </svg>
  );
}

export function TruckIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 6h10v9H3zM13 10h4l3 3v2h-7zM6.5 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zM17 19a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LeafIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19c-1-6 2-12 14-14 1 10-4 14-14 14z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6 18C10 13 13 10 18 6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

export function HeartIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 20s-7.2-4.6-9.6-9C.8 7.6 2.4 4 6 4c2.2 0 3.6 1.3 6 3.7C14.4 5.3 15.8 4 18 4c3.6 0 5.2 3.6 3.6 7-2.4 4.4-9.6 9-9.6 9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function MinusIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BoxIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 8.2 12 4l8 4.2v7.6L12 20l-8-4.2V8.2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M4 8.2 12 12l8-4.2M12 12v8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function RibbonIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="7" r="3.6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 9.6 5 20l7-3 7 3-4-10.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DriedFlowerIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 22V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M12 11c0-3 1.6-4.8 4.6-5.6C16.2 8.5 14.6 10.4 12 11zM12 11c0-3-1.6-4.8-4.6-5.6C7.8 8.5 9.4 10.4 12 11z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="5.6" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function BouquetIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6 20c1-3 2.7-4.8 6-5.2 3.3.4 5 2.2 6 5.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="6.5" r="2.6" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="7.5" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16.5" cy="9" r="2.3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function GiftIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="4" y="9.5" width="16" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 12.5h16M12 9.5v10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 9.5c-3.2 0-4.4-1-4.4-2.6C7.6 5.5 8.6 4.6 9.8 4.6c1.6 0 2.2 2 2.2 4.9zM12 9.5c3.2 0 4.4-1 4.4-2.6 0-1.4-1-2.3-2.2-2.3-1.6 0-2.2 2-2.2 4.9z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SparkleIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l1.8 5.4L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.6L12 3z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TrashIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 7h14M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7m1.5 0-.7 12a2 2 0 0 1-2 1.9H10.2a2 2 0 0 1-2-1.9L7.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
