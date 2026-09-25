# Floreria Shalom 4 — Tienda online con checkout por WhatsApp

Proyecto para la florería **Floreria Shalom 4** (Arequipa, Perú), propietario
**Martín Mario Flores Ramos**. Permite armar un pedido en línea (con o sin
cuenta), y lo cierra derivando al cliente a WhatsApp con el resumen completo
del pedido (productos, cantidades, precios y total) para confirmar el pago
por **Yape** o **transferencia bancaria**. También incluye seguimiento del
estado del pedido: *En preparación → En camino → Entregado*.

## Estructura del proyecto

```
floreriashalon4/
├── backend/    → API en Node.js + Express (productos, pedidos, auth)
├── frontend/   → Sitio en React + Vite (catálogo, carrito, checkout)
└── PROMPT_CONTINUACION.md → prompt para que una IA continúe el proyecto
```

## Cómo correrlo en tu computadora

Necesitas tener instalado [Node.js](https://nodejs.org) (v18 o superior).

### 1. Backend (API)

```bash
cd backend
npm install
cp .env.example .env      # y edita los valores reales (ver abajo)
npm run dev
```

El servidor queda en `http://localhost:4000`.

**Antes de usarlo en serio, edita `backend/.env`:**
- `OWNER_WHATSAPP_NUMBER`: el número de WhatsApp real de la florería, en
  formato internacional sin "+" (ej: `51987654321`).
- `JWT_SECRET`: cualquier texto largo y secreto (para las sesiones de usuario).
- `ADMIN_USER` / `ADMIN_PASSWORD`: credenciales para entrar al panel interno
  en `/admin` y cambiar el estado de los pedidos.
- `DEFAULT_DELIVERY_FEE`: costo de delivery en soles.

### 2. Frontend (sitio web)

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Se abre en `http://localhost:5173`. Ya está conectado al backend mediante
`frontend/.env` (`VITE_API_URL=http://localhost:4000/api`).

También edita `frontend/src/data/site.js` con los datos reales del negocio
(WhatsApp, dirección, horario, redes sociales).

## Flujo de compra (cómo funciona)

1. El cliente navega el catálogo y agrega productos al carrito.
2. En "Finalizar pedido" completa dirección, distrito, fecha/hora de entrega,
   dedicatoria y elige el método de pago (Yape o transferencia).
3. Al confirmar, el backend crea el pedido (con un código único tipo
   `FH4-1234`) y genera un link de WhatsApp con **todo el resumen del pedido
   y el total a pagar**.
4. El cliente hace clic y llega a WhatsApp con el mensaje ya armado; ahí la
   florería confirma el pedido y coordina el pago (Yape/transferencia).
5. El cliente puede volver en cualquier momento a "Seguir pedido" e ingresar
   su código + celular para ver el estado: En preparación / En camino /
   Entregado.
6. Desde `/admin` (con el usuario/clave del `.env`), la florería actualiza el
   estado de cada pedido a medida que avanza.

## Cuentas de usuario

Los clientes pueden:
- Comprar **como invitados** (sin crear cuenta), solo dejando nombre y celular.
- **Crear una cuenta** (correo + contraseña) para ver su historial de pedidos
  en "Mis pedidos".

## Estado actual / qué falta

Revisa `PROMPT_CONTINUACION.md` para el detalle completo de lo que ya está
construido y lo que falta por hacer (fotos reales de productos, despliegue en
un hosting, seguridad del panel admin, etc.).
