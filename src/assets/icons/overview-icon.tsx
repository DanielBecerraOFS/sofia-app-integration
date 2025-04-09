export default function OverviewIcon() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="var(--primary-container)"
        opacity="0.3"
      />
      <circle
        cx="100"
        cy="100"
        r="50"
        fill="var(--primary-container)"
        opacity="0.5"
      />
      <g>
        <rect
          x="75"
          y="70"
          width="50"
          height="60"
          rx="4"
          fill="var(--surface-container-high)"
        />
        <rect
          x="82"
          y="80"
          width="36"
          height="4"
          rx="2"
          fill="var(--primary)"
        />
        <rect
          x="82"
          y="90"
          width="28"
          height="4"
          rx="2"
          fill="var(--outline-variant)"
        />
        <rect
          x="82"
          y="100"
          width="32"
          height="4"
          rx="2"
          fill="var(--outline-variant)"
        />
        <rect
          x="82"
          y="110"
          width="22"
          height="4"
          rx="2"
          fill="var(--outline-variant)"
        />
      </g>
      <path
        d="M130 85 L145 85 L145 120 L110 120 L110 105"
        stroke="var(--primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M55 115 L70 115 L70 150 L105 150 L105 135"
        stroke="var(--tertiary-container)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="150" cy="70" r="10" fill="var(--primary)" />
      <circle cx="50" cy="130" r="10" fill="var(--tertiary-container)" />
    </svg>
  );
}
