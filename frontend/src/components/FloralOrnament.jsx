// Ornamento floral decorativo en trazo fino, estilo "line art" dorado.
// Pensado para usarse con moderación como detalle elegante en el fondo
// de algunas secciones (no en todas), nunca como elemento principal.
//
// variant:
//  - "spray"  → una rama con 3 flores pequeñas, ideal para esquinas
//  - "sprig"  → una ramita simple con un par de hojas, para detalles chicos
//  - "wreath" → un arco floral suave, para encabezados centrados

export default function FloralOrnament({
  variant = "spray",
  className = "",
  style,
  flip = false,
  color = "var(--gold)",
}) {
  const transform = flip ? "scale(-1,1)" : undefined;

  if (variant === "wreath") {
    return (
      <svg
        viewBox="0 0 240 60"
        className={`floral-ornament ${className}`}
        style={style}
        aria-hidden="true"
      >
        <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.55">
          <path d="M4 40 C 50 4, 190 4, 236 40" />
        </g>
        <g fill={color} opacity="0.7">
          {[20, 70, 120, 170, 220].map((x, i) => (
            <g key={x} transform={`translate(${x},${i % 2 === 0 ? 26 : 16})`}>
              <circle r="4.2" />
              <circle cx="7" cy="-2" r="2.6" opacity="0.7" />
              <circle cx="-7" cy="-2" r="2.6" opacity="0.7" />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  if (variant === "sprig") {
    return (
      <svg
        viewBox="0 0 60 120"
        className={`floral-ornament ${className}`}
        style={{ ...style, transform }}
        aria-hidden="true"
      >
        <g fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" opacity="0.6">
          <path d="M30 116 C 26 80, 34 60, 28 20" />
          <path d="M28 60 C 18 52, 10 54, 4 44" />
          <path d="M27 40 C 37 34, 44 36, 50 26" />
        </g>
        <circle cx="28" cy="16" r="6" fill={color} opacity="0.75" />
      </svg>
    );
  }

  // "spray" (default): rama con tres flores, buena para esquinas de sección
  return (
    <svg
      viewBox="0 0 180 180"
      className={`floral-ornament ${className}`}
      style={{ ...style, transform }}
      aria-hidden="true"
    >
      <g fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" opacity="0.5">
        <path d="M10 170 C 40 130, 30 90, 70 40" />
        <path d="M45 100 C 30 90, 20 92, 8 80" />
        <path d="M60 65 C 48 55, 46 44, 34 36" />
      </g>
      <g opacity="0.75">
        <g transform="translate(70,40)">
          <circle r="9" fill={color} />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} rx="5" ry="9" fill={color} opacity="0.55" transform={`rotate(${a}) translate(0,-12)`} />
          ))}
        </g>
        <g transform="translate(34,36) scale(0.6)">
          <circle r="9" fill={color} />
          {[0, 90, 180, 270].map((a) => (
            <ellipse key={a} rx="5" ry="9" fill={color} opacity="0.55" transform={`rotate(${a}) translate(0,-12)`} />
          ))}
        </g>
        <g transform="translate(8,80) scale(0.5)">
          <circle r="9" fill={color} />
          {[0, 90, 180, 270].map((a) => (
            <ellipse key={a} rx="5" ry="9" fill={color} opacity="0.55" transform={`rotate(${a}) translate(0,-12)`} />
          ))}
        </g>
      </g>
    </svg>
  );
}
