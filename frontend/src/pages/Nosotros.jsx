import { SITE } from "../data/site";
import Reveal from "../components/Reveal";
import { MEDIA } from "../data/media";

export default function Nosotros() {
  return (
    <div>
      <Reveal as="section" className="nosotros-intro">
        <div className="container">
          <span className="hero__eyebrow" style={{ justifyContent: "center", display: "flex" }}>
            Nuestra historia
          </span>
          <h1 className="nosotros-title">¿Quiénes somos?</h1>
        </div>
      </Reveal>

      <Reveal className="nosotros-video full-bleed">
        <video
          className="nosotros-video__el"
          src="/nosotros/video.mp4"
          poster={MEDIA.nosotros.poster}
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      </Reveal>

      <div className="container" style={{ paddingTop: 56, paddingBottom: 72 }}>
        <div className="two-col">
          <Reveal>
            <h2 style={{ fontSize: "1.7rem" }}>Flores hechas a mano en Arequipa</h2>
            <p className="muted" style={{ marginTop: 14, fontSize: "1.05rem" }}>
              {SITE.brand} nace en Arequipa de la mano de {SITE.owner}, con la idea de llevar
              flores frescas y bien cuidadas a cada rincón de la ciudad, el mismo día que las pides.
            </p>
          </Reveal>

          <div className="stack">
            <Reveal delay={80} className="card">
              <h3 style={{ fontSize: "1.05rem" }}>Nuestro compromiso</h3>
              <p className="muted" style={{ marginTop: 8 }}>
                Elegimos flores de estación y armamos cada ramo a mano, cuidando que llegue en las
                mejores condiciones a tu destinatario.
              </p>
            </Reveal>
            <Reveal delay={160} className="card">
              <h3 style={{ fontSize: "1.05rem" }}>Cobertura</h3>
              <p className="muted" style={{ marginTop: 8 }}>
                Hacemos entregas en los principales distritos de Arequipa, coordinando siempre
                contigo la hora exacta por WhatsApp.
              </p>
            </Reveal>
            <Reveal delay={240} className="card">
              <h3 style={{ fontSize: "1.05rem" }}>Contacto</h3>
              <p className="muted" style={{ marginTop: 8 }}>
                {SITE.whatsappDisplay} · {SITE.email}<br />
                {SITE.address}<br />
                {SITE.hours}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}
