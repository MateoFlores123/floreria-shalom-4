import { useEffect, useMemo, useState } from "react";
import { api } from "../api/client";
import { DELIVERY_TIME_SLOTS } from "../data/site";
import { compressImage } from "../utils/compressImage";

const EMPTY = {
  description: "",
  price: "",
  district: "",
  deliveryFee: "",
  address: "",
  reference: "",
  deliveryDate: "",
  deliveryTime: DELIVERY_TIME_SLOTS[0],
  dedication: "",
  name: "",
  phone: "",
  paymentMethod: "Yape",
};

// Formulario del panel para registrar un pedido que llegó por WhatsApp
// ("¿Tienes tu propia idea?"). Crea el pedido con su código y su foto de referencia.
export default function CustomOrderForm({ adminToken, onCreated, onCancel }) {
  const [form, setForm] = useState(EMPTY);
  const [photo, setPhoto] = useState(""); // data URL ya comprimida
  const [zones, setZones] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/delivery").then((d) => setZones(d.zones || [])).catch(() => setZones([]));
  }, []);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  // Al elegir distrito se propone el costo de su zona (se puede cambiar a mano)
  function chooseDistrict(district) {
    const zone = zones.find((z) => z.districts.includes(district));
    setForm((f) => ({
      ...f,
      district,
      deliveryFee: zone && typeof zone.fee === "number" ? String(zone.fee) : f.deliveryFee,
    }));
  }

  async function choosePhoto(file) {
    if (!file) return;
    setError("");
    try {
      setPhoto(await compressImage(file));
    } catch (err) {
      setError(err.message);
    }
  }

  const total = useMemo(
    () => (Number(form.price) || 0) + (Number(form.deliveryFee) || 0),
    [form.price, form.deliveryFee]
  );

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const order = await api.post(
        "/orders/custom",
        {
          description: form.description,
          price: Number(form.price),
          deliveryFee: Number(form.deliveryFee) || 0,
          customer: {
            name: form.name,
            phone: form.phone,
            district: form.district,
            address: form.address,
            reference: form.reference,
          },
          deliveryDate: form.deliveryDate,
          deliveryTime: form.deliveryTime,
          dedication: form.dedication,
          paymentMethod: form.paymentMethod,
          image: photo || undefined,
        },
        { adminToken }
      );
      setForm(EMPTY);
      setPhoto("");
      onCreated(order);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="card custom-order" onSubmit={submit}>
      <div className="custom-order__head">
        <div>
          <h2>Registrar pedido personalizado</h2>
          <p className="muted">Para las ideas que llegan por WhatsApp. Se genera el código del pedido automáticamente.</p>
        </div>
        <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="custom-order__grid">
        <div className="custom-order__photo">
          <label className="custom-order__drop">
            {photo ? <img src={photo} alt="Foto de referencia del arreglo" /> : <span>＋ Subir foto del arreglo</span>}
            <input type="file" accept="image/*" hidden onChange={(e) => choosePhoto(e.target.files[0])} />
          </label>
          {photo && (
            <button type="button" className="btn btn-ghost" onClick={() => setPhoto("")}>Quitar foto</button>
          )}
        </div>

        <div>
          <div className="field">
            <label htmlFor="co-desc">¿En qué consiste el pedido? *</label>
            <textarea
              id="co-desc"
              rows={3}
              required
              placeholder="Ej: Ramo de 24 rosas rosadas con papel blanco, lazo dorado y tarjeta"
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="co-price">Precio del arreglo (S/) *</label>
              <input id="co-price" type="number" min="1" step="0.5" required value={form.price} onChange={(e) => update("price", e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="co-pay">Método de pago</label>
              <select id="co-pay" value={form.paymentMethod} onChange={(e) => update("paymentMethod", e.target.value)}>
                <option>Yape</option>
                <option>Transferencia bancaria</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <h3 className="custom-order__section">Cliente</h3>
      <div className="field-row">
        <div className="field">
          <label htmlFor="co-name">Nombre *</label>
          <input id="co-name" required value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="co-phone">Celular (WhatsApp) *</label>
          <input id="co-phone" required inputMode="tel" placeholder="9XX XXX XXX" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
      </div>

      <h3 className="custom-order__section">Entrega</h3>
      <div className="field-row">
        <div className="field">
          <label htmlFor="co-district">Distrito</label>
          <select id="co-district" value={form.district} onChange={(e) => chooseDistrict(e.target.value)}>
            <option value="">Elige el distrito</option>
            {zones.map((z) => (
              <optgroup key={z.id} label={z.fee == null ? z.name : `${z.name} · S/ ${z.fee}`}>
                {z.districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="co-fee">Costo de delivery (S/)</label>
          <input id="co-fee" type="number" min="0" step="0.5" value={form.deliveryFee} onChange={(e) => update("deliveryFee", e.target.value)} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="co-address">Dirección *</label>
          <input id="co-address" required value={form.address} onChange={(e) => update("address", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="co-ref">Referencia</label>
          <input id="co-ref" value={form.reference} onChange={(e) => update("reference", e.target.value)} />
        </div>
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="co-date">Fecha de entrega</label>
          <input id="co-date" type="date" value={form.deliveryDate} onChange={(e) => update("deliveryDate", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="co-time">Horario</label>
          <select id="co-time" value={form.deliveryTime} onChange={(e) => update("deliveryTime", e.target.value)}>
            {DELIVERY_TIME_SLOTS.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="co-ded">Dedicatoria</label>
        <textarea id="co-ded" rows={2} value={form.dedication} onChange={(e) => update("dedication", e.target.value)} />
      </div>

      <div className="custom-order__foot">
        <p>
          Total del pedido: <strong>S/ {total.toFixed(2)}</strong>
        </p>
        <button className="btn btn-primary" disabled={saving}>
          {saving ? "Registrando…" : "Registrar pedido y generar código"}
        </button>
      </div>
    </form>
  );
}