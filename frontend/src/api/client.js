const BASE_URL = import.meta.env.VITE_API_URL;

async function request(path, { method = "GET", body, token, adminToken } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (adminToken) headers["x-admin-token"] = adminToken;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    // sin cuerpo JSON
  }

  if (!res.ok) {
    const message = (data && data.error) || `Error ${res.status}`;
    throw new Error(message);
  }
  return data;
}

export const api = {
  get: (path, opts) => request(path, { ...opts, method: "GET" }),
  post: (path, body, opts) => request(path, { ...opts, method: "POST", body }),
  patch: (path, body, opts) => request(path, { ...opts, method: "PATCH", body }),
  delete: (path, opts) => request(path, { ...opts, method: "DELETE" }),
};

// Dirección completa de un archivo servido por el backend (ej. fotos de entrega).
// VITE_API_URL termina en /api; las fotos viven en /uploads del mismo servidor.
export function fileUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;
  return `${String(BASE_URL || "").replace(/\/api\/?$/, "")}${path}`;
}