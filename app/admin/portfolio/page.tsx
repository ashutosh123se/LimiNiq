"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Plus, X, Star } from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  client: string;
  category: string;
  description: string;
  metrics: { label: string; value: string }[];
  coverImage: string | null;
  liveUrl: string | null;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    client: "",
    category: "Web Development",
    description: "",
    coverImage: "",
    liveUrl: "",
    tags: "",
    featured: false,
    metrics: [{ label: "", value: "" }],
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch portfolio items", err);
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      client: "",
      category: "Web Development",
      description: "",
      coverImage: "",
      liveUrl: "",
      tags: "",
      featured: false,
      metrics: [{ label: "", value: "" }],
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      client: item.client,
      category: item.category,
      description: item.description,
      coverImage: item.coverImage || "",
      liveUrl: item.liveUrl || "",
      tags: item.tags.join(", "),
      featured: item.featured,
      metrics: item.metrics.length > 0 ? item.metrics : [{ label: "", value: "" }],
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) setItems(items.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
      metrics: formData.metrics.filter(m => m.label && m.value),
    };

    try {
      if (editingItem) {
        const res = await fetch(`/api/portfolio/${editingItem.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setItems(items.map((p) => (p.id === updated.id ? updated : p)));
          setIsModalOpen(false);
        }
      } else {
        const res = await fetch("/api/portfolio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
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

  const addMetric = () => setFormData({ ...formData, metrics: [...formData.metrics, { label: "", value: "" }] });
  const updateMetric = (index: number, field: "label" | "value", val: string) => {
    const newMetrics = [...formData.metrics];
    newMetrics[index][field] = val;
    setFormData({ ...formData, metrics: newMetrics });
  };
  const removeMetric = (index: number) => {
    setFormData({ ...formData, metrics: formData.metrics.filter((_, i) => i !== index) });
  };

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
            Portfolio Manager
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Manage case studies and past projects shown to visitors.
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
          <Plus size={18} /> Add Project
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.5)" }}>Loading portfolio...</div>
      ) : (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Project</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Client</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                    No projects found. Add one to showcase your work!
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      {item.title}
                      {item.featured && <Star size={14} color="#FBB034" fill="#FBB034" />}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.6)" }}>{item.client}</td>
                    <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.6)" }}>{item.category}</td>
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
                maxWidth: 700,
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
                  {editingItem ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><X /></button>
              </div>

              <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
                <form id="portfolio-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Project Title</label>
                      <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Client Name</label>
                      <input required value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Category</label>
                    <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }}>
                      <option value="Web Development">Web Development</option>
                      <option value="SEO">SEO</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Branding">Branding</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Description</label>
                    <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none", minHeight: 100 }} />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Cover Image URL (Optional)</label>
                      <input value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Live Website URL (Optional)</label>
                      <input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                  </div>

                  {/* Metrics */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 12, padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <label style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", fontWeight: 600 }}>Key Metrics</label>
                      <button type="button" onClick={addMetric} style={{ background: "rgba(59,91,255,0.1)", color: "var(--accent-blue)", border: "none", padding: "4px 10px", borderRadius: 6, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}>+ Add Metric</button>
                    </div>
                    {formData.metrics.map((metric, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                        <input placeholder="Label (e.g. Traffic Increase)" value={metric.label} onChange={e => updateMetric(i, "label", e.target.value)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "8px", color: "white", outline: "none", fontSize: "0.85rem" }} />
                        <input placeholder="Value (e.g. +300%)" value={metric.value} onChange={e => updateMetric(i, "value", e.target.value)} style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "8px", color: "white", outline: "none", fontSize: "0.85rem" }} />
                        <button type="button" onClick={() => removeMetric(i)} style={{ background: "rgba(239,68,68,0.1)", border: "none", color: "#ef4444", borderRadius: 6, width: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><X size={14} /></button>
                      </div>
                    ))}
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Tags (comma separated)</label>
                    <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="Next.js, Tailwind, SEO" style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", marginTop: "0.5rem" }}>
                    <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} style={{ width: 18, height: 18, cursor: "pointer" }} />
                    <span>Featured Project (Shows on Homepage)</span>
                  </label>
                </form>
              </div>

              <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
                <button form="portfolio-form" type="submit" disabled={saving} style={{ background: "var(--gradient-hero)", border: "none", color: "white", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
                  {saving ? "Saving..." : "Save Project"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
