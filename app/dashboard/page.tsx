"use client";

import { useEffect, useState } from "react"


type Score = {
  id: string;
  score: number;
  played_on: string;
};

type Charity = {
  id: string;
  name: string;
  slug: string;
};

type UserData = {
  id: string;
  full_name: string;
  email: string;
  charity_percentage: number;
  charity_id: string | null;
  charities?: Charity | Charity[] | null;
};

type DrawResult = {
  draw: {
    id: string;
    month: number;
    year: number;
    winning_numbers: number[];
    status: string;
    prize_pool?: number;
    rollover_amount?: number;
  } | null;
  userScores?: number[];
  winningNumbers?: number[];
  matchCount?: number;
  matchType?: number | null;
  winner?: {
    match_type: number;
    prize_amount: number;
    verification_status: string;
    payment_status: string;
  } | null;
};

type Winner = {
  id: string;
  match_type: number;
  prize_amount: number;
  proof_url: string | null;
  verification_status: string;
  payment_status: string;
  created_at: string;
};

export default function DashboardPage() {
  const [score, setScore] = useState("");
  const [playedOn, setPlayedOn] = useState("");
  const [scores, setScores] = useState<Score[]>([]);
  const [message, setMessage] = useState("");

  const [user, setUser] = useState<UserData | null>(null);
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedCharityId, setSelectedCharityId] = useState("");
  const [charityPercentage, setCharityPercentage] = useState(10);
  const [profileMessage, setProfileMessage] = useState("");

  const [drawResult, setDrawResult] = useState<DrawResult | null>(null);
  const [drawMessage, setDrawMessage] = useState("");

  const [winners, setWinners] = useState<Winner[]>([]);
  const [proofUrl, setProofUrl] = useState("");
  const [selectedWinnerId, setSelectedWinnerId] = useState("");
  const [winnerMessage, setWinnerMessage] = useState("");
  const [subscription, setSubscription] = useState<any>(null);
const [checkingSub, setCheckingSub] = useState(true);

  function getSelectedCharityName() {
    if (!user?.charities) return "Not linked yet";

    if (Array.isArray(user.charities)) {
      return user.charities[0]?.name || "Not linked yet";
    }

    return user.charities.name || "Not linked yet";
  }

  async function loadScores() {
    try {
      const res = await fetch("/api/scores");
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to load scores");
        return;
      }

      setScores(data.scores || []);
    } catch {
      setMessage("Failed to load scores");
    }
  }

  async function loadUser() {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();

      if (!res.ok) {
        setProfileMessage(data.error || "Failed to load user");
        return;
      }

      setUser(data.user);
      setSelectedCharityId(data.user.charity_id || "");
      setCharityPercentage(data.user.charity_percentage || 10);
    } catch {
      setProfileMessage("Failed to load user");
    }
  }

  async function loadCharities() {
    try {
      const res = await fetch("/api/charities");
      const data = await res.json();

      if (res.ok) {
        setCharities(data.charities || []);
      }
    } catch {}
  }

  async function loadDraw() {
    try {
      const res = await fetch("/api/draws/current");
      const data = await res.json();

      if (res.ok) {
        setDrawResult(data);
      }
    } catch {}
  }

  async function loadMyWinners() {
    try {
      const res = await fetch("/api/winners/my");
      const data = await res.json();

      if (res.ok) {
        setWinners(data.winners || []);
      }
    } catch {}
  }
async function loadSubscription() {
  try {
    const res = await fetch("/api/subscriptions/me");
    const data = await res.json();

    if (res.ok) {
      setSubscription(data.subscription);
    }
  } catch {
    console.log("Subscription check failed");
  } finally {
    setCheckingSub(false);
  }
}
 useEffect(() => {
  loadSubscription();
  loadScores();
  loadUser();
  loadCharities();
  loadDraw();
  loadMyWinners();
}, []);

  async function handleAddScore(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: Number(score),
          playedOn,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(
          typeof data.error === "string" ? data.error : "Unable to save score"
        );
        return;
      }

      setMessage("Score saved successfully");
      setScore("");
      setPlayedOn("");
      loadScores();
      loadDraw();
    } catch {
      setMessage("Something went wrong");
    }
  }

  async function handleSaveCharity(e: React.FormEvent) {
    e.preventDefault();
    setProfileMessage("");

    try {
      const res = await fetch("/api/me/charity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          charityId: selectedCharityId || null,
          charityPercentage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setProfileMessage(
          typeof data.error === "string"
            ? data.error
            : "Failed to update charity"
        );
        return;
      }

      setProfileMessage("Charity details updated");
      loadUser();
    } catch {
      setProfileMessage("Something went wrong");
    }
  }

  async function handleRunDraw() {
    setDrawMessage("");

    try {
      const res = await fetch("/api/draws/run", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setDrawMessage(
          typeof data.error === "string" ? data.error : "Failed to run draw"
        );
        return;
      }

      if (data.message) {
        setDrawMessage(data.message);
      } else {
        setDrawMessage("Draw generated successfully");
      }

      loadDraw();
      loadMyWinners();
    } catch {
      setDrawMessage("Something went wrong");
    }
  }

  async function handleUploadProof(e: React.FormEvent) {
    e.preventDefault();
    setWinnerMessage("");

    try {
      const res = await fetch("/api/winners/upload-proof", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          winnerId: selectedWinnerId,
          proofUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setWinnerMessage(
          typeof data.error === "string"
            ? data.error
            : "Failed to upload proof"
        );
        return;
      }

      setWinnerMessage("Proof uploaded successfully");
      setProofUrl("");
      loadMyWinners();
    } catch {
      setWinnerMessage("Something went wrong");
    }
  }
  if (checkingSub) {
  return <p className="p-6">Checking subscription...</p>;
}

if (!subscription || subscription.status !== "active") {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-neutral-900">
      <h1 className="text-3xl font-bold">Subscription Required</h1>
      <p className="mt-3 text-center text-neutral-500">
        Please subscribe to access your dashboard.
      </p>

      <a
        href="/pricing"
        className="mt-6 rounded-xl bg-black px-6 py-3 font-semibold text-white"
      >
        Go to Pricing
      </a>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold">
          User Dashboard{user?.full_name ? ` - ${user.full_name}` : ""}
        </h1>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border p-5">
            <p className="text-sm text-neutral-500">Subscription</p>
            <h2 className="mt-2 text-xl font-semibold">Active</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Renewal: 15 Apr 2026
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-neutral-500">Selected Charity</p>
            <h2 className="mt-2 text-xl font-semibold">
              {getSelectedCharityName()}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Contribution: {user?.charity_percentage ?? 10}%
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-neutral-500">Draw Participation</p>
            <h2 className="mt-2 text-xl font-semibold">
              {drawResult?.draw ? "1 Draw" : "0 Draws"}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {drawResult?.draw
                ? "This month draw available"
                : "Next draw: Coming soon"}
            </p>
          </div>

          <div className="rounded-2xl border p-5">
            <p className="text-sm text-neutral-500">Winnings</p>
            <h2 className="mt-2 text-xl font-semibold">₹0</h2>
            <p className="mt-1 text-sm text-neutral-500">
              {drawResult?.matchType
                ? `Matched ${drawResult.matchType} numbers`
                : "Current payout: Pending"}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl border p-6">
              <h2 className="text-2xl font-semibold">Add Golf Score</h2>

              <form onSubmit={handleAddScore} className="mt-5 space-y-4">
                <input
                  type="number"
                  min={1}
                  max={45}
                  placeholder="Enter score (1 to 45)"
                  value={score}
                  onChange={(e) => setScore(e.target.value)}
                  className="w-full rounded-xl border p-3"
                />

                <input
                  type="date"
                  value={playedOn}
                  onChange={(e) => setPlayedOn(e.target.value)}
                  className="w-full rounded-xl border p-3"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-black px-5 py-3 font-semibold text-white"
                >
                  Save Score
                </button>
              </form>

              {message ? (
                <p className="mt-4 text-sm text-neutral-600">{message}</p>
              ) : null}
            </div>

            <div className="rounded-2xl border p-6">
              <h2 className="text-2xl font-semibold">Select Charity</h2>

              <form onSubmit={handleSaveCharity} className="mt-5 space-y-4">
                <select
                  value={selectedCharityId}
                  onChange={(e) => setSelectedCharityId(e.target.value)}
                  className="w-full rounded-xl border p-3"
                >
                  <option value="">Choose charity</option>
                  {charities.map((charity) => (
                    <option key={charity.id} value={charity.id}>
                      {charity.name}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={10}
                  max={100}
                  value={charityPercentage}
                  onChange={(e) =>
                    setCharityPercentage(Number(e.target.value))
                  }
                  className="w-full rounded-xl border p-3"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white"
                >
                  Save Charity Preference
                </button>
              </form>

              {profileMessage ? (
                <p className="mt-4 text-sm text-neutral-600">
                  {profileMessage}
                </p>
              ) : null}
            </div>

            <div className="rounded-2xl border p-6">
              <h2 className="text-2xl font-semibold">Run Monthly Draw</h2>

              <button
                onClick={handleRunDraw}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
              >
                Run Draw
              </button>

              {drawMessage ? (
                <p className="mt-4 text-sm text-neutral-600">{drawMessage}</p>
              ) : null}

              {drawResult?.draw ? (
  <div className="mt-6 rounded-xl bg-neutral-100 p-4">
    <p className="text-sm text-neutral-500">Winning Numbers</p>
    <p className="mt-2 text-xl font-bold">
      {(drawResult.winningNumbers || []).join(", ")}
    </p>

    <p className="mt-4 text-sm text-neutral-500">Your Matches</p>
    <p className="mt-1 font-semibold">
      {drawResult.matchCount ?? 0} matched
      {drawResult.matchType ? ` • Tier: ${drawResult.matchType}-match` : ""}
    </p>

    <p className="mt-4 text-sm text-neutral-500">Prize</p>
    <p className="mt-1 font-semibold">
      {drawResult.winner ? `₹${drawResult.winner.prize_amount}` : "No prize"}
    </p>

    <p className="mt-4 text-sm text-neutral-500">Verification</p>
    <p className="mt-1 font-semibold">
      {drawResult.winner?.verification_status || "Not applicable"}
    </p>

    <p className="mt-4 text-sm text-neutral-500">Payment</p>
    <p className="mt-1 font-semibold">
      {drawResult.winner?.payment_status || "Not applicable"}
    </p>
  </div>
) : null}
            </div>

            <div className="rounded-2xl border p-6">
              <h2 className="text-2xl font-semibold">Winner Proof Upload</h2>

              {winners.length === 0 ? (
                <p className="mt-4 text-neutral-500">No winner records yet.</p>
              ) : (
                <>
                  <div className="mt-4 space-y-3">
                    {winners.map((winner) => (
                      <div
                        key={winner.id}
                        className="rounded-xl bg-neutral-100 p-4"
                      >
                        <p>
                          <strong>Match Type:</strong> {winner.match_type}
                          -match
                        </p>
                        <p>
                          <strong>Verification:</strong>{" "}
                          {winner.verification_status}
                        </p>
                        <p>
                          <strong>Payment:</strong> {winner.payment_status}
                        </p>
                        <p>
                          <strong>Proof:</strong>{" "}
                          {winner.proof_url || "Not uploaded"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleUploadProof} className="mt-5 space-y-4">
                    <select
                      value={selectedWinnerId}
                      onChange={(e) => setSelectedWinnerId(e.target.value)}
                      className="w-full rounded-xl border p-3"
                    >
                      <option value="">Select winner record</option>
                      {winners.map((winner) => (
                        <option key={winner.id} value={winner.id}>
                          {winner.match_type}-match •{" "}
                          {winner.verification_status}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      placeholder="Paste proof URL"
                      value={proofUrl}
                      onChange={(e) => setProofUrl(e.target.value)}
                      className="w-full rounded-xl border p-3"
                    />

                    <button
                      type="submit"
                      className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white"
                    >
                      Upload Proof
                    </button>
                  </form>

                  {winnerMessage ? (
                    <p className="mt-4 text-sm text-neutral-600">
                      {winnerMessage}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border p-6">
            <h2 className="text-2xl font-semibold">Latest 5 Scores</h2>

            {scores.length === 0 ? (
              <p className="mt-4 text-neutral-500">No scores added yet.</p>
            ) : (
              <div className="mt-5 space-y-3">
                {scores.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl bg-neutral-100 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-neutral-500">Played on</p>
                      <p className="font-medium">{item.played_on}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-neutral-500">Score</p>
                      <p className="text-xl font-bold">{item.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}