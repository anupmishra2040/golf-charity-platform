"use client";

const MONTHLY_PRICE_ID = "price_monthly_here";
const YEARLY_PRICE_ID = "price_yearly_here";

export default function PricingPage() {
  async function startCheckout(priceId: string) {
    const res = await fetch("/api/subscriptions/create-checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (res.ok && data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Checkout failed");
    }
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold">Choose a Plan</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold">Monthly Plan</h2>
            <p className="mt-2 text-neutral-500">Billed every month</p>
            <button
              onClick={() => startCheckout(MONTHLY_PRICE_ID)}
              className="mt-6 rounded-xl bg-black px-5 py-3 font-semibold text-white"
            >
              Subscribe Monthly
            </button>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold">Yearly Plan</h2>
            <p className="mt-2 text-neutral-500">Billed every year</p>
            <button
              onClick={() => startCheckout(YEARLY_PRICE_ID)}
              className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"
            >
              Subscribe Yearly
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}