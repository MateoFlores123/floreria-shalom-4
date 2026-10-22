import { fileUrl } from "../api/client";

// Foto de la entrega que sube la florería desde el panel admin.
export default function DeliveryPhoto({ photo, title = "Foto de tu entrega", alt = "Foto de la entrega de tu pedido" }) {
  if (!photo?.url) return null;
  const src = fileUrl(photo.url);
  const when = photo.uploadedAt
    ? new Date(photo.uploadedAt).toLocaleString("es-PE", {
        day: "2-digit",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <figure className="delivery-photo">
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Ver en grande: ${title}`}>
        <img src={src} alt={alt} loading="lazy" />
      </a>
      <figcaption>
        <strong>{title}</strong>
        {when && <span>{when}</span>}
      </figcaption>
    </figure>
  );
}