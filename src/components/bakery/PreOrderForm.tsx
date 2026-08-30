import { useState, type FormEvent } from "react";
import { MENU_CHOICES } from "~/content/siteData";
import { submitPreOrder, type PreOrderResult } from "~/server/preOrder";
import { btnPrimary } from "./ui";

const inputCls =
  "w-full rounded-lg border border-flour bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-mocha/50 transition focus:border-honey focus:outline-none focus:ring-2 focus:ring-honey/20";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function PreOrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [itemType, setItemType] = useState("kolache");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PreOrderResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  /** Friday(5)/Saturday(6) only — used for validation and tests. */
  function validatePickupDay(): string | null {
    if (!pickupDate) return "Please choose a pickup date.";
    const day = new Date(`${pickupDate}T00:00:00`).getDay();
    if (day !== 5 && day !== 6) {
      return "Pickup is only available on Fridays and Saturdays.";
    }
    return null;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!name.trim()) return setError("Please tell us your name.");
    if (!phone.trim()) return setError("Please add a phone number so we can confirm.");
    const dayErr = validatePickupDay();
    if (dayErr) return setError(dayErr);

    setSubmitting(true);
    try {
      const res = await submitPreOrder({
        data: {
          name: name.trim(),
          phone: phone.trim(),
          pickupDate,
          itemType,
          quantity: quantity ? Number(quantity) : undefined,
          description: description.trim() || undefined,
          notes: notes.trim() || undefined,
        },
      });
      if (res.ok) setResult({ ...res, message: res.message });
      else setResult(res);
      if (res.ok) {
        setName("");
        setPhone("");
        setQuantity("");
        setDescription("");
        setNotes("");
      }
    } catch {
      setResult({ ok: false, message: "We couldn't save your pre-order just now. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="rounded-2xl border border-flour bg-paper p-6 shadow-sm sm:p-8">
      <form onSubmit={onSubmit} noValidate aria-label="Pre-order form">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="po-name" className={labelCls}>
              Name
            </label>
            <input
              id="po-name"
              className={inputCls}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
              required
            />
          </div>
          <div>
            <label htmlFor="po-phone" className={labelCls}>
              Phone
            </label>
            <input
              id="po-phone"
              type="tel"
              className={inputCls}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(319) 555-0123"
              autoComplete="tel"
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="po-date" className={labelCls}>
            Pickup date <span className="text-mocha">(Friday or Saturday)</span>
          </label>
          <input
            id="po-date"
            type="date"
            className={inputCls}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            required
          />
          <p className="mt-1 text-xs text-mocha">We're open 6:00–11:00 AM on Fri & Sat.</p>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="po-item" className={labelCls}>
              What would you like?
            </label>
            <select
              id="po-item"
              className={inputCls}
              value={itemType}
              onChange={(e) => setItemType(e.target.value)}
            >
              {MENU_CHOICES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="po-qty" className={labelCls}>
              Quantity <span className="text-mocha">(optional)</span>
            </label>
            <input
              id="po-qty"
              type="number"
              min={1}
              className={inputCls}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 6"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="po-desc" className={labelCls}>
            Description or cake details
          </label>
          <textarea
            id="po-desc"
            rows={2}
            className={inputCls}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="For cakes: flavor, size, occasion, or a note about what you have in mind."
          />
        </div>

        <div className="mt-4">
          <label htmlFor="po-notes" className={labelCls}>
            Notes <span className="text-mocha">(optional)</span>
          </label>
          <textarea
            id="po-notes"
            rows={2}
            className={inputCls}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything else we should know."
          />
        </div>

        {error ? (
          <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        {result ? (
          result.ok ? (
            <p role="status" className="mt-4 rounded-lg bg-open-soft px-3 py-2 text-sm font-medium text-open">
              Thank you! Your pre-order is in. We'll see you at the counter on your
              pickup day — and we'll text you to confirm before then.
            </p>
          ) : (
            <p role="alert" className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              {result.message}
            </p>
          )
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className={`${btnPrimary} mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto`}
        >
          {submitting ? "Sending…" : "Pre-order now"}
        </button>
        <p className="mt-3 text-xs text-mocha">
          No payment needed to pre-order — pay when you pick up at the counter.
        </p>
      </form>
    </div>
  );
}
