import { createServerFn } from "@tanstack/react-start";
import { sql } from "~/db";

/** Shape of the pre-order form submission (client sends this, never raw SQL). */
export interface PreOrderInput {
  name: string;
  phone: string;
  /** ISO date string (YYYY-MM-DD) of the pickup day — must be Fri or Sat. */
  pickupDate: string;
  itemType?: string;
  quantity?: number;
  description?: string;
  notes?: string;
}

export interface PreOrderResult {
  ok: boolean;
  id?: string;
  message?: string;
}

export const submitPreOrder = createServerFn({ method: "POST" })
  .validator((d: PreOrderInput) => {
    if (!d.name?.trim() || !d.phone?.trim() || !d.pickupDate) {
      throw new Error("Name, phone, and pickup date are required.");
    }
    // Pickup must be on a Friday or Saturday (Date.getDay(): 5, 6).
    const day = new Date(`${d.pickupDate}T00:00:00`).getDay();
    if (day !== 5 && day !== 6) {
      throw new Error("Pickup is available on Fridays and Saturdays only.");
    }
    return d;
  })
  .handler(async ({ data }): Promise<PreOrderResult> => {
    const id = crypto.randomUUID();
    try {
      const db = sql();
      await db`
        insert into "PreOrder"
          (id, name, phone, "pickupDate", "itemType", quantity, description, notes, status)
        values
          (
            ${id},
            ${data.name.trim()},
            ${data.phone.trim()},
            ${data.pickupDate},
            ${data.itemType || null},
            ${data.quantity ?? null},
            ${data.description?.trim() || null},
            ${data.notes?.trim() || null},
            'new'
          )
      `;
      return { ok: true, id };
    } catch (err) {
      console.error("submitPreOrder failed", err);
      return {
        ok: false,
        message: "We couldn't save your pre-order just now. Please try again.",
      };
    }
  });
