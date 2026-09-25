Archivos que debes agregar tú:

1) LogoFloreria.png  -> colócalo aquí, en /public/LogoFloreria.png
   (se usa en el logo del header, arriba a la izquierda)

2) /hero/hero-video.mp4 -> video de fondo del hero de la Home (banner
   grande con esquinas redondeadas, overlay y texto/botones encima).
   Ideal: horizontal, corto (10-20s en loop), sin audio o silenciado.
   Opcional: /hero/poster.jpg -> imagen que se ve mientras el video carga.

3) /nosotros/video.mp4 -> tu video institucional para la página "Nosotros"
   (ideal formato horizontal, sin audio o con audio silenciado por defecto)

Si usas otros nombres de archivo, actualiza los "src"/"poster" en:
- src/components/PromoCarousel.jsx (video del hero)
- src/pages/Nosotros.jsx (video de "Quiénes somos")
