"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  charity_percentage: number;
  created_at: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  async function loadUsers() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users");
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to load users");
        return;
      }

      setUsers(data.users || []);
    } catch {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function updateRole(userId: string, role: string) {
    try {
      setUpdatingId(userId);

      const res = await fetch("/api/admin/users/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to update role");
        return;
      }

      setMessage("User role updated successfully");
      await loadUsers();
    } catch {
      setMessage("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;

    return users.filter((user) => {
      return (
        (user.full_name || "").toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.role.toLowerCase().includes(q)
      );
    });
  }, [users, search]);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Users</h1>
            <p className="mt-2 text-sm text-neutral-500">
              View registered users, search them, and update roles.
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

        <div className="mt-6">
          <input
            type="text"
            placeholder="Search by name, email, or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        <div className="mt-8 overflow-x-auto rounded-2xl border">
          <table className="min-w-full text-left">
            <thead className="bg-neutral-100">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold">Name</th>
                <th className="px-4 py-3 text-sm font-semibold">Email</th>
                <th className="px-4 py-3 text-sm font-semibold">Role</th>
                <th className="px-4 py-3 text-sm font-semibold">Charity %</th>
                <th className="px-4 py-3 text-sm font-semibold">Created</th>
                <th className="px-4 py-3 text-sm font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-neutral-500" colSpan={6}>
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td className="px-4 py-4 text-sm text-neutral-500" colSpan={6}>
                    No users found.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="px-4 py-3">{user.full_name || "-"}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">{user.role}</td>
                    <td className="px-4 py-3">{user.charity_percentage}%</td>
                    <td className="px-4 py-3">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateRole(user.id, "admin")}
                          disabled={updatingId === user.id || user.role === "admin"}
                          className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Make Admin
                        </button>

                        <button
                          onClick={() => updateRole(user.id, "subscriber")}
                          disabled={
                            updatingId === user.id || user.role === "subscriber"
                          }
                          className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          Make Subscriber
                        </button>
                      </div>
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