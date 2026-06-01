"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Plus, X, Star } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string | null;
  service: string;
  active: boolean;
  createdAt: string;
}

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    role: "CEO",
    quote: "",
    rating: 5,
    avatar: "",
    service: "Web Development",
    active: true,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/testimonials");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch testimonials", err);
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      company: "",
      role: "CEO",
      quote: "",
      rating: 5,
      avatar: "",
      service: "Web Development",
      active: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: Testimonial) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      company: item.company,
      role: item.role,
      quote: item.quote,
      rating: item.rating,
      avatar: item.avatar || "",
      service: item.service,
      active: item.active,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) setItems(items.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      if (editingItem) {
        const res = await fetch(`/api/testimonials/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const updated = await res.json();
          setItems(items.map((p) => (p.id === updated.id ? updated : p)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          const created = await res.json();
          setItems([created, ...items]);
          setIsModalOpen(false);
        }
      }
    } catch (err) {
      console.error("Save failed", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
            Testimonials Manager
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Manage client reviews shown across the website.
          </p>
        </div>
        <button
          onClick={openNewModal}
          style={{
            background: "var(--gradient-hero)",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            fontFamily: "var(--font-heading)",
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <Plus size={18} /> Add Review
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.5)" }}>Loading testimonials...</div>
      ) : (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Client</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Quote Snippet</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                    No testimonials found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{item.role}, {item.company}</div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.6)", maxWidth: 300 }}>
                      <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        "{item.quote}"
                      </div>
                    </td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{
                        padding: "4px 10px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700,
                        background: item.active ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)",
                        color: item.active ? "#22c55e" : "#ef4444"
                      }}>
                        {item.active ? "Visible" : "Hidden"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                      <button onClick={() => openEditModal(item)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", marginRight: "1rem" }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(item.id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              style={{
                position: "relative",
                width: "90%",
                maxWidth: 600,
                maxHeight: "90vh",
                background: "#0f0f1a",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                boxShadow: "0 24px 48px rgba(0,0,0,0.5)"
              }}
            >
              <div style={{ padding: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontSize: "1.25rem" }}>
                  {editingItem ? "Edit Review" : "Add New Review"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><X /></button>
              </div>

              <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
                <form id="testimonial-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Client Name</label>
                      <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Company</label>
                      <input required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Role (e.g. CEO)</label>
                      <input required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Service Provided</label>
                      <input required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Quote</label>
                    <textarea required value={formData.quote} onChange={e => setFormData({...formData, quote: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none", minHeight: 100 }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Avatar URL (Optional)</label>
                      <input value={formData.avatar} onChange={e => setFormData({...formData, avatar: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Rating (1-5)</label>
                      <input type="number" min={1} max={5} required value={formData.rating} onChange={e => setFormData({...formData, rating: Number(e.target.value)})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", marginTop: "0.5rem" }}>
                    <input type="checkbox" checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} style={{ width: 18, height: 18, cursor: "pointer" }} />
                    <span>Show on Website</span>
                  </label>
                </form>
              </div>

              <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
                <button form="testimonial-form" type="submit" disabled={saving} style={{ background: "var(--gradient-hero)", border: "none", color: "white", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
                  {saving ? "Saving..." : "Save Review"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
