// Ilustraciones vectoriales originales inspiradas en Arequipa (sillar, volcanes,
// campiña) para no depender de fotografías de stock con derechos de autor.
// Cuando la florería tenga fotos reales de sus arreglos, pueden reemplazar
// estos componentes por <img> normales (ver PromptContinuacion.md).

export function HeroIllustration() {
  return (
    <svg viewBox="0 0 560 520" role="img" aria-label="Ilustración de volcanes y flores de Arequipa">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f3ede1" />
          <stop offset="100%" stopColor="#fbf8f3" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="560" height="520" rx="28" fill="url(#sky)" />
      <circle cx="440" cy="100" r="46" fill="#eecf9e" opacity="0.9" />

      {/* Misti */}
      <path d="M40 330 L210 120 L380 330 Z" fill="#2f4a3d" />
      <path d="M170 175 L210 120 L250 175 Z" fill="#fbf8f3" opacity="0.9" />
      {/* Chachani */}
      <path d="M230 330 L340 170 L470 330 Z" fill="#243c31" opacity="0.9" />
      {/* Pichu Pichu */}
      <path d="M330 330 L420 210 L520 330 Z" fill="#1c2e25" opacity="0.85" />

      {/* Campiña */}
      <rect x="0" y="330" width="560" height="190" fill="#e7ddc4" />
      <path d="M0 330 Q140 300 280 330 T560 330 V520 H0 Z" fill="#dfe6dc" />

      {/* Tallos y flores en primer plano */}
      <g stroke="#2f4a3d" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M90 520 C 95 430, 70 400, 95 350" />
        <path d="M170 520 C 165 420, 195 400, 175 340" />
        <path d="M270 520 C 275 410, 250 390, 275 330" />
        <path d="M360 520 C 355 430, 385 405, 365 345" />
        <path d="M460 520 C 465 420, 440 400, 465 345" />
      </g>
      <g>
        <circle cx="95" cy="345" r="16" fill="#c4406b" />
        <circle cx="175" cy="335" r="13" fill="#b98a3e" />
        <circle cx="275" cy="325" r="18" fill="#8f2c4d" />
        <circle cx="365" cy="340" r="14" fill="#c4406b" />
        <circle cx="465" cy="340" r="15" fill="#b98a3e" />
      </g>
    </svg>
  );
}

// Placeholder "fotográfico" para tarjetas de producto: un fondo de color propio
// de cada arreglo con una silueta floral, y una etiqueta que aclara que es
// una imagen referencial (a reemplazar por fotos reales del catálogo).
export function ProductPlaceholder({ color = "#c4406b", size = 96 }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
    >
      <rect width="200" height="200" fill={color} opacity="0.14" />
      <g transform="translate(100,108)">
        <g stroke={color} strokeWidth="3" fill="none" opacity="0.55">
          <path d="M0 60 C 4 20, -6 0, 0 -34" />
        </g>
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-34"
            rx="15"
            ry="26"
            fill={color}
            opacity="0.85"
            transform={`rotate(${angle}) translate(0,-14)`}
          />
        ))}
        <circle cx="0" cy="-34" r="11" fill="#b98a3e" />
      </g>
    </svg>
  );
}

export function SectionDivider() {
  return (
    <svg viewBox="0 0 200 16" width="72" height="16" aria-hidden="true">
      <path
        d="M0 8 C 30 -4, 50 20, 80 8 S 140 -4, 170 8 S 190 14, 200 8"
        stroke="#c4406b"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}
