"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [stats, setStats] = useState({
    users: 0,
    prizePool: 0,
    charity: 0,
    pending: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        const data = await res.json();

        if (res.ok) {
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-neutral-800 p-5">
            <p className="text-sm text-neutral-400">Total Users</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {loading ? "..." : stats.users}
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 p-5">
            <p className="text-sm text-neutral-400">Prize Pool</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {loading ? "..." : `₹${stats.prizePool}`}
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 p-5">
            <p className="text-sm text-neutral-400">Charity Contributions</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {loading ? "..." : `₹${stats.charity}`}
            </h2>
          </div>

          <div className="rounded-2xl border border-neutral-800 p-5">
            <p className="text-sm text-neutral-400">Pending Verifications</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {loading ? "..." : stats.pending}
            </h2>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link
            href="/admin/winners"
            className="rounded-2xl border border-neutral-800 p-6 transition hover:bg-neutral-900"
          >
            <h2 className="text-xl font-semibold">Winners Management</h2>
            <p className="mt-2 text-neutral-400">
              Approve proofs and mark payouts.
            </p>
          </Link>

          <Link
            href="/admin/users"
            className="rounded-2xl border border-neutral-800 p-6 transition hover:bg-neutral-900"
          >
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="mt-2 text-neutral-400">
              View all registered users and roles.
            </p>
          </Link>

          <Link
            href="/admin/draws"
            className="rounded-2xl border border-neutral-800 p-6 transition hover:bg-neutral-900"
          >
            <h2 className="text-xl font-semibold">Draws</h2>
            <p className="mt-2 text-neutral-400">
              Review draw history and prize pools.
            </p>
          </Link>

          <Link
            href="/admin/charities"
            className="rounded-2xl border border-neutral-800 p-6 transition hover:bg-neutral-900"
          >
            <h2 className="text-xl font-semibold">Charities</h2>
            <p className="mt-2 text-neutral-400">
              See available charities and details.
            </p>
          </Link>

          <Link
            href="/admin/reports"
            className="rounded-2xl border border-neutral-800 p-6 transition hover:bg-neutral-900"
          >
            <h2 className="text-xl font-semibold">Reports</h2>
            <p className="mt-2 text-neutral-400">
              Basic analytics and platform summaries.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
}