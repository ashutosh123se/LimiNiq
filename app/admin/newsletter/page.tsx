"use client";

import { useState, useEffect } from "react";
import { Mail, Search, Trash2, CheckCircle2, XCircle } from "lucide-react";

type Subscriber = {
  id: string;
  email: string;
  name: string | null;
  subscribed: boolean;
  createdAt: string;
};

export default function NewsletterAdminPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const res = await fetch("/api/newsletter");
      const data = await res.json();
      setSubscribers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubscription = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/newsletter/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscribed: !currentStatus }),
      });
      if (res.ok) {
        setSubscribers((prev) =>
          prev.map((s) => (s.id === id ? { ...s, subscribed: !currentStatus } : s))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to delete this subscriber?")) return;
    try {
      const res = await fetch(`/api/newsletter/${id}`, { method: "DELETE" });
      if (res.ok) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase()) ||
    (s.name && s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
            Newsletter Subscribers
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)" }}>
            Manage your email list and subscriptions.
          </p>
        </div>
      </div>

      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
        <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.05)", padding: "0.5rem 1rem", borderRadius: 8, flex: 1 }}>
            <Search size={18} color="rgba(255,255,255,0.4)" />
            <input
              type="text"
              placeholder="Search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ background: "transparent", border: "none", color: "white", outline: "none", width: "100%" }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.6)" }}>Loading subscribers...</div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead style={{ background: "rgba(255,255,255,0.02)" }}>
              <tr>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>Email</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>Name</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>Status</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontSize: "0.875rem" }}>Joined</th>
                <th style={{ padding: "1rem 1.5rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                    No subscribers found.
                  </td>
                </tr>
              ) : (
                filtered.map((sub) => (
                  <tr key={sub.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Mail size={14} />
                      </div>
                      <span style={{ fontWeight: 500 }}>{sub.email}</span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.7)" }}>
                      {sub.name || "—"}
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      {sub.subscribed ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.25rem 0.75rem", borderRadius: 99, background: "rgba(34, 197, 94, 0.1)", color: "#4ade80", fontSize: "0.75rem", fontWeight: 600 }}>
                          <CheckCircle2 size={12} /> Subscribed
                        </span>
                      ) : (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.25rem 0.75rem", borderRadius: 99, background: "rgba(239, 68, 68, 0.1)", color: "#f87171", fontSize: "0.75rem", fontWeight: 600 }}>
                          <XCircle size={12} /> Unsubscribed
                        </span>
                      )}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                      {new Date(sub.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem" }}>
                        <button
                          onClick={() => toggleSubscription(sub.id, sub.subscribed)}
                          style={{ padding: "0.5rem 1rem", borderRadius: 8, border: "none", background: "rgba(255,255,255,0.05)", color: "white", cursor: "pointer", fontSize: "0.875rem", fontWeight: 500 }}
                        >
                          {sub.subscribed ? "Unsubscribe" : "Resubscribe"}
                        </button>
                        <button
                          onClick={() => deleteSubscriber(sub.id)}
                          style={{ padding: "0.5rem", borderRadius: 8, border: "none", background: "rgba(239, 68, 68, 0.1)", color: "#f87171", cursor: "pointer" }}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
