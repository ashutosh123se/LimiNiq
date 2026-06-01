"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Plus, X, ExternalLink, Image as ImageIcon } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage: string | null;
  author: string;
  published: boolean;
  publishedAt: string | null;
  views: number;
  tags: string[];
  createdAt: string;
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Technology",
    author: "Admin",
    published: false,
    tags: "",
    coverImage: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog?limit=100&published=all");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Technology",
      author: "Admin",
      published: false,
      tags: "",
      coverImage: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      category: post.category,
      author: post.author,
      published: post.published,
      tags: post.tags.join(", "),
      coverImage: post.coverImage || "",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) setPosts(posts.filter((p) => p.id !== id));
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
    };

    try {
      if (editingPost) {
        // Update
        const res = await fetch(`/api/blog/${editingPost.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setPosts(posts.map((p) => (p.id === updated.id ? updated : p)));
          setIsModalOpen(false);
        }
      } else {
        // Create
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setPosts([created, ...posts]);
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
            Blog Manager
          </h1>
          <p style={{ fontFamily: "var(--font-body)", color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Manage your articles, categories, and publications.
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
          <Plus size={18} /> New Post
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.5)" }}>Loading posts...</div>
      ) : (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Title</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
                <th style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-heading)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "3rem", textAlign: "center", color: "rgba(255,255,255,0.4)" }}>
                    No posts found. Create one to get started.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "1rem 1.5rem", fontWeight: 600 }}>{post.title}</td>
                    <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.6)" }}>{post.category}</td>
                    <td style={{ padding: "1rem 1.5rem" }}>
                      <span style={{
                        padding: "4px 10px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700,
                        background: post.published ? "rgba(34, 197, 94, 0.15)" : "rgba(251, 176, 52, 0.15)",
                        color: post.published ? "#22c55e" : "#FBB034"
                      }}>
                        {post.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td style={{ padding: "1rem 1.5rem", color: "rgba(255,255,255,0.5)", fontSize: "0.9rem" }}>
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem 1.5rem", textAlign: "right" }}>
                      <button onClick={() => openEditModal(post)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", marginRight: "1rem" }}><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(post.id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}><Trash2 size={16} /></button>
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
                maxWidth: 800,
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
                  {editingPost ? "Edit Post" : "Create New Post"}
                </h2>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><X /></button>
              </div>

              <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>
                <form id="blog-form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Title</label>
                    <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Category</label>
                      <input required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                    <div>
                      <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Author</label>
                      <input required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Excerpt</label>
                    <textarea required value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none", minHeight: 80 }} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Content (Markdown / HTML)</label>
                    <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none", minHeight: 250, fontFamily: "monospace" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Cover Image URL (Optional)</label>
                    <input value={formData.coverImage} onChange={e => setFormData({...formData, coverImage: e.target.value})} placeholder="https://..." style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                  </div>

                  <div>
                    <label style={{ display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>Tags (comma separated)</label>
                    <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" }} />
                  </div>

                  <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer", marginTop: "0.5rem" }}>
                    <input type="checkbox" checked={formData.published} onChange={e => setFormData({...formData, published: e.target.checked})} style={{ width: 18, height: 18, cursor: "pointer" }} />
                    <span>Publish Post Live</span>
                  </label>
                </form>
              </div>

              <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
                <button onClick={() => setIsModalOpen(false)} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
                <button form="blog-form" type="submit" disabled={saving} style={{ background: "var(--gradient-hero)", border: "none", color: "white", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
                  {saving ? "Saving..." : "Save Post"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
