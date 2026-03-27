"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ReportSummary = {
  totalUsers: number;
  adminUsers: number;
  subscriberUsers: number;
  avgCharityPercentage: number;
  totalDraws: number;
  totalPrizePool: number;
  totalRollover: number;
  totalWinners: number;
  paidWinners: number;
  pendingVerification: number;
  tier3Winners: number;
  tier4Winners: number;
  tier5Winners: number;
  totalPayout: number;
  totalCharities: number;
  featuredCharities: number;
};


export default function AdminReportsPage() {
  const [summary, setSummary] = useState<ReportSummary | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadReports() {
      try {
        const res = await fetch("/api/admin/reports");
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || "Failed to load reports");
          return;
        }

        setSummary(data.summary);
      } catch {
        setMessage("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Reports</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Platform summary across users, draws, payouts, and charities.
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

        {loading ? (
          <p className="mt-8 text-neutral-500">Loading reports...</p>
        ) : summary ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-2xl border p-5">
              <h2 className="text-lg font-semibold">Users Summary</h2>
              <p className="mt-3">Total Users: {summary.totalUsers}</p>
              <p>Admin Users: {summary.adminUsers}</p>
              <p>Subscribers: {summary.subscriberUsers}</p>
              <p>Avg Charity %: {summary.avgCharityPercentage}%</p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="text-lg font-semibold">Draw Summary</h2>
              <p className="mt-3">Total Draws: {summary.totalDraws}</p>
              <p>Total Prize Pool: ₹{summary.totalPrizePool.toFixed(2)}</p>
              <p>Total Rollover: ₹{summary.totalRollover.toFixed(2)}</p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="text-lg font-semibold">Winner Summary</h2>
              <p className="mt-3">Total Winners: {summary.totalWinners}</p>
              <p>Paid Winners: {summary.paidWinners}</p>
              <p>Pending Verification: {summary.pendingVerification}</p>
              <p>Total Payout: ₹{summary.totalPayout.toFixed(2)}</p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="text-lg font-semibold">Match Tier Breakdown</h2>
              <p className="mt-3">3-Match Winners: {summary.tier3Winners}</p>
              <p>4-Match Winners: {summary.tier4Winners}</p>
              <p>5-Match Winners: {summary.tier5Winners}</p>
            </div>

            <div className="rounded-2xl border p-5">
              <h2 className="text-lg font-semibold">Charity Summary</h2>
              <p className="mt-3">Total Charities: {summary.totalCharities}</p>
              <p>Featured Charities: {summary.featuredCharities}</p>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}