"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Draw = {
  id: string;
  month: number;
  year: number;
  draw_mode: string;
  winning_numbers: number[];
  prize_pool: number;
  rollover_amount: number;
  status: string;
  created_at: string;
  published_at: string | null;
};

export default function AdminDrawsPage() {
  const [draws, setDraws] = useState<Draw[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDraws() {
      try {
        const res = await fetch("/api/admin/draws");
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || "Failed to load draws");
          return;
        }

        setDraws(data.draws || []);
      } catch {
        setMessage("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadDraws();
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Draws</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Review draw history, prize pool, and winning numbers.
            </p>
          </div>

          <Link
            href="/admin"
            className="inline-flex rounded-xl border border-neutral-300 px-4 py-2 font-medium transition hover:bg-neutral-50"
          >
            Back to Admin Dashboard
          </Link>
        </div>

        {message ? (
          <p className="mt-4 rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-700">
            {message}
          </p>
        ) : null}

        <div className="mt-8 overflow-x-auto rounded-2xl border">
          <table className="min-w-full text-left">
            <thead className="bg-neutral-100">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Month/Year</th>
                <th className="px-4 py-3 text-sm font-semibold">Mode</th>
                <th className="px-4 py-3 text-sm font-semibold">Winning Numbers</th>
                <th className="px-4 py-3 text-sm font-semibold">Prize Pool</th>
                <th className="px-4 py-3 text-sm font-semibold">Rollover</th>
                <th className="px-4 py-3 text-sm font-semibold">Status</th>
                <th className="px-4 py-3 text-sm font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-neutral-500" colSpan={7}>
                    Loading draws...
                  </td>
                </tr>
              ) : draws.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-neutral-500" colSpan={7}>
                    No draws found.
                  </td>
                </tr>
              ) : (
                draws.map((draw) => (
                  <tr key={draw.id} className="border-t">
                    <td className="px-4 py-3">
                      {draw.month}/{draw.year}
                    </td>
                    <td className="px-4 py-3">{draw.draw_mode}</td>
                    <td className="px-4 py-3">
                      {(draw.winning_numbers || []).join(", ")}
                    </td>
                    <td className="px-4 py-3">₹{Number(draw.prize_pool || 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      ₹{Number(draw.rollover_amount || 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">{draw.status}</td>
                    <td className="px-4 py-3">
                      {new Date(draw.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}