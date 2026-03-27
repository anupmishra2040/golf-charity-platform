import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm uppercase tracking-[0.25em] text-emerald-400">
            Golf • Give Back • Win Monthly
          </p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">
            Play with purpose. Support charities. Win through your scores.
          </h1>
          <p className="mt-6 text-lg text-neutral-300">
            Join a modern golf subscription platform where your latest scores enter you into monthly prize draws
            and part of your subscription goes to a charity you choose.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/signup" className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-black">
              Subscribe Now
            </Link>
            <Link href="/login" className="rounded-xl border border-neutral-700 px-6 py-3 font-semibold">
              Login
            </Link>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-neutral-800 p-6">
            <h3 className="text-xl font-semibold">Track 5 Latest Scores</h3>
            <p className="mt-3 text-neutral-400">Enter Stableford scores from 1 to 45 with dates.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 p-6">
            <h3 className="text-xl font-semibold">Monthly Prize Draws</h3>
            <p className="mt-3 text-neutral-400">Join monthly 3, 4, and 5-number match reward pools.</p>
          </div>
          <div className="rounded-2xl border border-neutral-800 p-6">
            <h3 className="text-xl font-semibold">Support a Charity</h3>
            <p className="mt-3 text-neutral-400">Choose a charity and donate at least 10% of your subscription.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
