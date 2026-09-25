import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

// Hero con VIDEO de fondo (borde a borde, esquinas redondeadas, overlay
// oscuro en degradado) + texto y botones que van rotando encima, como un
// carrusel de promociones. Edita el video en public/hero/hero-video.mp4 y
// los textos/links en src/data/promos.js.
//
// Si el video todavía no existe o no carga, se ve un fondo en degradado de
// marca (nunca queda roto ni en negro) gracias a "videoReady"/"videoError".
export default function PromoCarousel({
  slides = [],
  interval = 5500,
  videoSrc = "/hero/hero-video.mp4",
  poster = "/hero/poster.jpg",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const touchStartX = useRef(null);

  const count = slides.length;

  const goTo = useCallback(
    (i) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (count < 2 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearInterval(id);
  }, [count, interval, paused]);

  if (count === 0) return null;

  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) (delta < 0 ? next : prev)();
    touchStartX.current = null;
  }

  return (
    <div
      className="promo-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="promo-carousel__bg">
        {!videoError && (
          <video
            className="promo-carousel__video"
            src={videoSrc}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            onError={() => setVideoError(true)}
          />
        )}
        <div className="promo-carousel__scrim" />
      </div>

      <div className="promo-carousel__track">
        {slides.map((slide, i) => (
          <div
            key={slide.id || i}
            className={`promo-slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <div className="promo-slide__content container">
              {slide.eyebrow && <span className="promo-slide__eyebrow">{slide.eyebrow}</span>}
              {slide.title && <h2 className="promo-slide__title">{slide.title}</h2>}
              {slide.subtitle && <p className="promo-slide__subtitle">{slide.subtitle}</p>}
              {(slide.ctaLabel || slide.ctaLabelSecondary) && (
                <div className="promo-slide__actions">
                  {slide.ctaLabel && (
                    <Link to={slide.ctaLink || "/catalogo"} className="btn btn-primary promo-slide__cta">
                      {slide.ctaLabel}
                    </Link>
                  )}
                  {slide.ctaLabelSecondary && (
                    <Link to={slide.ctaLinkSecondary || "/catalogo"} className="btn btn-outline-light">
                      {slide.ctaLabelSecondary}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {count > 1 && (
        <>
          <button className="promo-carousel__arrow promo-carousel__arrow--prev" onClick={prev} aria-label="Anterior">
            <ChevronLeftIcon />
          </button>
          <button className="promo-carousel__arrow promo-carousel__arrow--next" onClick={next} aria-label="Siguiente">
            <ChevronRightIcon />
          </button>

          <div className="promo-carousel__dots">
            {slides.map((slide, i) => (
              <button
                key={slide.id || i}
                className={`promo-carousel__dot ${i === index ? "is-active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Ir a la promoción ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
