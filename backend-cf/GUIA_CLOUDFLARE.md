# Publicar el backend en Cloudflare (gratis)

Este es el nuevo backend de Florería Shalom. Reemplaza al de Railway y tiene **las mismas
funciones**: catálogo, delivery por zonas, cuentas, pedidos, panel admin, fotos de entrega,
pedidos personalizados y el número de WhatsApp según el horario.

- **Cloudflare Workers** corre la API (gratis: 100 000 peticiones al día, no se "duerme").
- **Cloudflare D1** guarda pedidos, cuentas y fotos (gratis).
- No necesitas tarjeta.

> Las cuentas de clientes y los pedidos de Railway **no se pasan**: la base empieza vacía.

---

## 0. Antes de empezar

1. Copia la carpeta **`backend-cf`** dentro de tu proyecto, al lado de `backend` y `frontend`:
   ```
   tu-proyecto/
   ├── backend/        ← el de Railway (ya no se usa, puedes dejarlo)
   ├── backend-cf/     ← el nuevo
   └── frontend/
   ```
2. **Si ya pusiste precios** en `backend/catalog/products.json`, copia ese archivo encima de
   `backend-cf/catalog/products.json`. Lo mismo con `delivery.json` si cambiaste los montos.
3. Crea una cuenta gratis en **https://dash.cloudflare.com/sign-up**.

## 1. Instalar

En la terminal:

```bash
cd backend-cf
npm install
```

## 2. Conectar tu computadora con tu cuenta de Cloudflare

```bash
npx wrangler login
```

Se abre el navegador: inicia sesión y toca **Allow** (Permitir).

## 3. Crear la base de datos

```bash
npx wrangler d1 create floreria-shalom-db
```

La terminal muestra algo así:

```
"database_id": "a1b2c3d4-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

Copia ese código y pégalo en **`wrangler.jsonc`**, en lugar de `PEGA-AQUI-EL-ID-DE-TU-BASE-D1`.

Luego crea las tablas:

```bash
npm run db:init
```

(Si pregunta algo, responde **y**).

## 4. Guardar las claves secretas

Contraseña del panel admin (el usuario es `martin`; se cambia en `wrangler.jsonc`, en `ADMIN_USER`):

```bash
npx wrangler secret put ADMIN_PASSWORD
```

Escribe una contraseña **nueva y larga** y presiona Enter.

Clave para las sesiones de los clientes (cualquier texto largo y al azar, no tienes que recordarlo):

```bash
npx wrangler secret put JWT_SECRET
```

## 5. Publicar

```bash
npm run deploy
```

Al terminar muestra la dirección de tu API, por ejemplo:

```
https://floreria-shalom-api.TU-USUARIO.workers.dev
```

Ábrela en el navegador agregando `/api/health`. Si ves `{"ok":true,...}`, ¡ya está funcionando! 🎉

## 6. Conectar la página (Vercel) con el nuevo backend

1. En **Vercel** → tu proyecto → **Settings** → **Environment Variables**.
2. Cambia `VITE_API_URL` por tu dirección nueva **terminada en `/api`**:
   ```
   https://floreria-shalom-api.TU-USUARIO.workers.dev/api
   ```
3. Ve a **Deployments** → en el último, menú **⋯** → **Redeploy**.
4. Cambia lo mismo en `frontend/.env` para cuando pruebes en tu computadora.

Listo: la página ya usa Cloudflare.

---

## Cómo actualizar después

Cada vez que cambies precios (`catalog/products.json`), zonas (`catalog/delivery.json`),
el horario de WhatsApp (`src/lib/whatsappSchedule.js`) o cualquier archivo del backend:

```bash
cd backend-cf
npm run deploy
```

Tarda unos segundos. También haz `git push` para guardar los cambios en GitHub.

> **Opcional:** en Cloudflare → **Workers & Pages** → `floreria-shalom-api` → **Settings** →
> **Build**, puedes conectar tu repositorio de GitHub (carpeta raíz: `backend-cf`).
> Así se publica solo con cada `git push`, igual que Railway.

## Probar en tu computadora (opcional)

```bash
cd backend-cf
cp .dev.vars.example .dev.vars     # y pon una contraseña y un secreto cualquiera
npm run db:init:local
npm run dev
```

La API queda en `http://localhost:8787/api`. En `frontend/.env` pon
`VITE_API_URL=http://localhost:8787/api` mientras pruebas.

## Si algo falla

- **Ver los errores en vivo:** `npx wrangler tail` (déjalo abierto y usa la página).
- **"Credenciales de administrador inválidas":** vuelve a correr `npx wrangler secret put ADMIN_PASSWORD`.
- **El catálogo no carga en la página:** revisa que `VITE_API_URL` en Vercel termine en `/api`
  y que hiciste **Redeploy** después de cambiarla.
- **"no such table":** falta el paso 3 (`npm run db:init`).
