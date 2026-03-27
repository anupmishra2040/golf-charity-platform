"use client";

import { useState } from "react";

type SignupForm = {
  fullName: string;
  email: string;
  password: string;
  charityPercentage: number;
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    fullName: "",
    email: "",
    password: "",
    charityPercentage: 10,
  });

  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        let errorMessage = "Signup failed";

        if (typeof data?.error === "string") {
          errorMessage = data.error;
        } else if (data?.error?.formErrors?.length) {
          errorMessage = data.error.formErrors[0];
        } else if (data?.error?.fieldErrors) {
          const values = Object.values(data.error.fieldErrors).flat();
          const first = values.find((v) => typeof v === "string");
          if (typeof first === "string") {
            errorMessage = first;
          }
        }

        setMessage(errorMessage);
        return;
      }

      setMessage("Signup successful");
      window.location.href = "/dashboard";
    } catch {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-2xl border border-neutral-800 p-8">
        <h1 className="text-3xl font-bold">Create account</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3"
            placeholder="Full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          />

          <input
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 p-3"
            placeholder="Charity contribution %"
            type="number"
            min={10}
            max={100}
            value={form.charityPercentage}
            onChange={(e) =>
              setForm({ ...form, charityPercentage: Number(e.target.value) })
            }
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-500 px-4 py-3 font-semibold text-black"
          >
            Sign up
          </button>
        </form>

        {typeof message === "string" && message ? (
          <p className="mt-4 text-sm text-neutral-300">{message}</p>
        ) : null}
      </div>
    </main>
  );
}