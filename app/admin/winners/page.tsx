"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Winner = {
  id: string;
  draw_id: string;
  user_id: string;
  match_type: number;
  prize_amount: number;
  proof_url: string | null;
  verification_status: string;
  payment_status: string;
  created_at: string;
};

export default function AdminWinnersPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  async function loadWinners() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/winners");
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to load winners");
        return;
      }

      setWinners(data.winners || []);
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWinners();
  }, []);

  async function updateWinner(
    winnerId: string,
    verificationStatus?: string,
    paymentStatus?: string
  ) {
    try {
      setUpdatingId(winnerId);

      const res = await fetch("/api/admin/winners/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winnerId,
          verificationStatus,
          paymentStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to update winner");
        return;
      }

      setMessage("Winner updated successfully");
      await loadWinners();
    } catch {
      setMessage("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  }

  function statusBadge(status: string) {
    if (status === "approved") {
      return "bg-green-100 text-green-700";
    }
    if (status === "rejected") {
      return "bg-red-100 text-red-700";
    }
    if (status === "paid") {
      return "bg-blue-100 text-blue-700";
    }
    return "bg-yellow-100 text-yellow-700";
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Winners Management</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Review winner proof submissions and update payout status.
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

        <div className="mt-8 space-y-4">
          {loading ? (
            <p className="text-neutral-500">Loading winners...</p>
          ) : winners.length === 0 ? (
            <p className="text-neutral-500">No winners found.</p>
          ) : (
            winners.map((winner) => {
              const isUpdating = updatingId === winner.id;

              return (
                <div key={winner.id} className="rounded-2xl border p-5 shadow-sm">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <p>
                        <strong>Winner ID:</strong> {winner.id}
                      </p>
                      <p>
                        <strong>User ID:</strong> {winner.user_id}
                      </p>
                      <p>
                        <strong>Draw ID:</strong> {winner.draw_id}
                      </p>
                      <p>
                        <strong>Match Type:</strong> {winner.match_type}-match
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p>
                        <strong>Prize Amount:</strong> ₹
                        {Number(winner.prize_amount || 0).toFixed(2)}
                      </p>

                      <p className="flex items-center gap-2">
                        <strong>Verification:</strong>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                            winner.verification_status
                          )}`}
                        >
                          {winner.verification_status}
                        </span>
                      </p>

                      <p className="flex items-center gap-2">
                        <strong>Payment:</strong>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(
                            winner.payment_status
                          )}`}
                        >
                          {winner.payment_status}
                        </span>
                      </p>

                      <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(winner.created_at).toLocaleString()}
                      </p>

                      <p className="break-all">
                        <strong>Proof URL:</strong>{" "}
                        {winner.proof_url ? (
                          <a
                            href={winner.proof_url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Proof
                          </a>
                        ) : (
                          "Not uploaded"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      onClick={() => updateWinner(winner.id, "approved")}
                      disabled={isUpdating || winner.verification_status === "approved"}
                      className="rounded-xl bg-green-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdating ? "Updating..." : "Approve"}
                    </button>

                    <button
                      onClick={() => updateWinner(winner.id, "rejected")}
                      disabled={isUpdating || winner.verification_status === "rejected"}
                      className="rounded-xl bg-red-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdating ? "Updating..." : "Reject"}
                    </button>

                    <button
                      onClick={() => updateWinner(winner.id, undefined, "paid")}
                      disabled={isUpdating || winner.payment_status === "paid"}
                      className="rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isUpdating ? "Updating..." : "Mark Paid"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}