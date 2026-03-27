"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Login failed");
      return;
    }

    window.location.href = data.user?.role === "admin" ? "/admin" : "/dashboard";
  }

  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-900">
      <div className="mx-auto max-w-md rounded-2xl border p-8">
        <h1 className="text-3xl font-bold">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input className="w-full rounded-xl border p-3" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input className="w-full rounded-xl border p-3" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full rounded-xl bg-neutral-950 px-4 py-3 font-semibold text-white">Login</button>
        </form>
        {message && <p className="mt-4 text-sm text-red-600">{message}</p>}
      </div>
    </main>
  );
}
