import type { Price } from "@/content/menu";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

export function formatAmount(amount: number): string {
  return usd.format(amount);
}

/** One display line per price: "$6.99", or "8 for $11.99" for sized items. */
export function priceLines(price: Price): string[] {
  if (typeof price === "number") return [formatAmount(price)];
  return price.map((p) => `${p.label} ${formatAmount(p.amount)}`);
}

/** "8655550123" -> "(865) 555-0123". Anything else is returned unchanged. */
export function formatPhone(digits: string): string {
  const d = digits.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  if (d.length !== 10) return digits;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function telHref(digits: string): string {
  const d = digits.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return `tel:+1${d}`;
}

/** "21:00" -> "9 pm", "11:30" -> "11:30 am". */
export function formatTime(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}
