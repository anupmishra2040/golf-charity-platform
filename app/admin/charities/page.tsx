"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Charity = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  is_featured: boolean;
  created_at: string;
};

export default function AdminCharitiesPage() {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCharities() {
      try {
        const res = await fetch("/api/admin/charities");
        const data = await res.json();

        if (!res.ok) {
          setMessage(data.error || "Failed to load charities");
          return;
        }

        setCharities(data.charities || []);
      } catch {
        setMessage("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadCharities();
  }, []);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Charities</h1>
            <p className="mt-2 text-sm text-neutral-500">
              Review all charities available on the platform.
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
                <th className="px-4 py-3 text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Slug</th>
                <th className="px-4 py-3 text-sm font-semibold">Description</th>
                <th className="px-4 py-3 text-sm font-semibold">Featured</th>
                <th className="px-4 py-3 text-sm font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-neutral-500" colSpan={5}>
                    Loading charities...
                  </td>
                </tr>
              ) : charities.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-neutral-500" colSpan={5}>
                    No charities found.
                  </td>
                </tr>
              ) : (
                charities.map((charity) => (
                  <tr key={charity.id} className="border-t">
                    <td className="px-4 py-3">{charity.name}</td>
                    <td className="px-4 py-3">{charity.slug}</td>
                    <td className="px-4 py-3">{charity.description || "-"}</td>
                    <td className="px-4 py-3">
                      {charity.is_featured ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(charity.created_at).toLocaleDateString()}
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