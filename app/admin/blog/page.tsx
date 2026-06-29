"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2, Plus, X, Flame, BarChart3, TrendingUp } from "lucide-react";

type Tab = "posts" | "trending";

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
  views: number;
  tags: string[];
  postType: "ARTICLE" | "POLL";
  trending: boolean;
  pollOptions: { id: string; label: string; votes: number }[] | null;
  pollEndsAt: string | null;
  createdAt: string;
}

interface TrendingTopic {
  id: string;
  label: string;
  slug: string;
  description: string | null;
  emoji: string | null;
  color: string;
  href: string | null;
  active: boolean;
  sortOrder: number;
}

const emptyPostForm = {
  title: "",
  excerpt: "",
  content: "",
  category: "Software",
  author: "LIMINIQ Team",
  published: false,
  tags: "",
  coverImage: "",
  postType: "ARTICLE" as "ARTICLE" | "POLL",
  trending: false,
  pollOptions: ["Option A", "Option B"],
  pollEndsAt: "",
};

const emptyTopicForm = {
  label: "",
  description: "",
  emoji: "🔥",
  color: "#3B5BFF",
  href: "",
  active: true,
  sortOrder: 0,
};

export default function BlogAdminPage() {
  const [tab, setTab] = useState<Tab>("posts");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingTopic, setEditingTopic] = useState<TrendingTopic | null>(null);
  const [postForm, setPostForm] = useState(emptyPostForm);
  const [topicForm, setTopicForm] = useState(emptyTopicForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPosts();
    fetchTopics();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/blog?limit=100&published=all");
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async () => {
    try {
      const res = await fetch("/api/trending-topics/all");
      if (res.ok) {
        const data = await res.json();
        setTopics(data.topics || []);
      } else {
        const pub = await fetch("/api/trending-topics");
        const data = await pub.json();
        setTopics(data.topics || []);
      }
    } catch {
      /* fallback empty */
    }
  };

  const openNewPost = () => {
    setEditingPost(null);
    setPostForm(emptyPostForm);
    setIsPostModalOpen(true);
  };

  const openEditPost = (post: BlogPost) => {
    setEditingPost(post);
    const opts = (post.pollOptions || []).map((o) => o.label);
    setPostForm({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      category: post.category,
      author: post.author,
      published: post.published,
      tags: post.tags.join(", "),
      coverImage: post.coverImage || "",
      postType: post.postType,
      trending: post.trending,
      pollOptions: opts.length >= 2 ? opts : ["Option A", "Option B"],
      pollEndsAt: post.pollEndsAt ? post.pollEndsAt.slice(0, 16) : "",
    });
    setIsPostModalOpen(true);
  };

  const openNewTopic = () => {
    setEditingTopic(null);
    setTopicForm(emptyTopicForm);
    setIsTopicModalOpen(true);
  };

  const openEditTopic = (topic: TrendingTopic) => {
    setEditingTopic(topic);
    setTopicForm({
      label: topic.label,
      description: topic.description || "",
      emoji: topic.emoji || "",
      color: topic.color,
      href: topic.href || "",
      active: topic.active,
      sortOrder: topic.sortOrder,
    });
    setIsTopicModalOpen(true);
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Delete this post?")) return;
    const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
    if (res.ok) setPosts(posts.filter((p) => p.id !== id));
  };

  const handleDeleteTopic = async (id: string) => {
    if (!confirm("Delete this trending topic?")) return;
    const res = await fetch(`/api/trending-topics/${id}`, { method: "DELETE" });
    if (res.ok) setTopics(topics.filter((t) => t.id !== id));
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const pollOptions =
      postForm.postType === "POLL"
        ? postForm.pollOptions
            .filter((l) => l.trim())
            .map((label, i) => ({
              id: `opt-${i + 1}`,
              label: label.trim(),
              votes: editingPost?.pollOptions?.[i]?.votes ?? 0,
            }))
        : undefined;

    const payload = {
      title: postForm.title,
      excerpt: postForm.excerpt,
      content: postForm.content || postForm.excerpt,
      category: postForm.category,
      author: postForm.author,
      published: postForm.published,
      tags: postForm.tags.split(",").map((t) => t.trim()).filter(Boolean),
      coverImage: postForm.coverImage,
      postType: postForm.postType,
      trending: postForm.trending,
      pollOptions,
      pollEndsAt: postForm.pollEndsAt ? new Date(postForm.pollEndsAt).toISOString() : null,
    };

    try {
      const res = editingPost
        ? await fetch(`/api/blog/${editingPost.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });

      if (res.ok) {
        await fetchPosts();
        setIsPostModalOpen(false);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = editingTopic
        ? await fetch(`/api/trending-topics/${editingTopic.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(topicForm) })
        : await fetch("/api/trending-topics", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(topicForm) });

      if (res.ok) {
        await fetchTopics();
        setIsTopicModalOpen(false);
      }
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px", color: "white", outline: "none" } as const;
  const labelStyle = { display: "block", marginBottom: "0.5rem", color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" } as const;

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, margin: "0 0 0.5rem" }}>
            Blog & Engagement
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>
            Manage articles, community polls, and trending topics.
          </p>
        </div>
        <button
          onClick={tab === "posts" ? openNewPost : openNewTopic}
          style={{ background: "var(--gradient-hero)", color: "white", border: "none", borderRadius: 8, padding: "10px 18px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Plus size={18} /> {tab === "posts" ? "New Post / Poll" : "New Topic"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        {([
          { id: "posts" as Tab, label: "Articles & Polls", icon: BarChart3 },
          { id: "trending" as Tab, label: "Trending Topics", icon: TrendingUp },
        ]).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: 8,
              border: tab === id ? "1px solid rgba(59,91,255,0.4)" : "1px solid rgba(255,255,255,0.1)",
              background: tab === id ? "rgba(59,91,255,0.15)" : "transparent",
              color: "white",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.5)" }}>Loading...</div>
      ) : tab === "posts" ? (
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                {["Title", "Type", "Category", "Flags", "Status", "Actions"].map((h) => (
                  <th key={h} style={{ padding: "1rem 1.25rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", textTransform: "uppercase", textAlign: h === "Actions" ? "right" : "left" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <td style={{ padding: "1rem 1.25rem", fontWeight: 600 }}>{post.title}</td>
                  <td style={{ padding: "1rem 1.25rem", color: "rgba(255,255,255,0.6)" }}>{post.postType === "POLL" ? "Poll" : "Article"}</td>
                  <td style={{ padding: "1rem 1.25rem", color: "rgba(255,255,255,0.6)" }}>{post.category}</td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    {post.trending && <span style={{ fontSize: "0.7rem", color: "#fca5a5", marginRight: 8 }}>🔥 Trending</span>}
                    {post.postType === "POLL" && <span style={{ fontSize: "0.7rem", color: "#a5b4fc" }}>📊 Poll</span>}
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span style={{ padding: "4px 10px", borderRadius: 100, fontSize: "0.75rem", fontWeight: 700, background: post.published ? "rgba(34,197,94,0.15)" : "rgba(251,176,52,0.15)", color: post.published ? "#22c55e" : "#FBB034" }}>
                      {post.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                    <button onClick={() => openEditPost(post)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", marginRight: "1rem" }}><Edit2 size={16} /></button>
                    <button onClick={() => handleDeletePost(post.id)} style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
          {topics.map((topic) => (
            <div key={topic.id} style={{ padding: "1.25rem", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.25rem" }}>{topic.emoji}</span>
                <div>
                  <button onClick={() => openEditTopic(topic)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", marginRight: 8 }}><Edit2 size={14} /></button>
                  <button onClick={() => handleDeleteTopic(topic.id)} style={{ background: "none", border: "none", color: "#ef4444", cursor: "pointer" }}><Trash2 size={14} /></button>
                </div>
              </div>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{topic.label}</div>
              <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>{topic.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Post Modal */}
      <AnimatePresence>
        {isPostModalOpen && (
          <Modal onClose={() => setIsPostModalOpen(false)} title={editingPost ? "Edit Post" : "Create Post / Poll"} footer={<ModalFooter onClose={() => setIsPostModalOpen(false)} saving={saving} formId="post-form" />}>
            <form id="post-form" onSubmit={handlePostSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Type</label>
                  <select value={postForm.postType} onChange={(e) => setPostForm({ ...postForm, postType: e.target.value as "ARTICLE" | "POLL" })} style={inputStyle}>
                    <option value="ARTICLE">Article</option>
                    <option value="POLL">Poll</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Category</label>
                  <input required value={postForm.category} onChange={(e) => setPostForm({ ...postForm, category: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Title</label>
                <input required value={postForm.title} onChange={(e) => setPostForm({ ...postForm, title: e.target.value })} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Excerpt</label>
                <textarea required value={postForm.excerpt} onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })} style={{ ...inputStyle, minHeight: 70 }} />
              </div>
              {postForm.postType === "ARTICLE" && (
                <div>
                  <label style={labelStyle}>Content</label>
                  <textarea required value={postForm.content} onChange={(e) => setPostForm({ ...postForm, content: e.target.value })} style={{ ...inputStyle, minHeight: 180, fontFamily: "monospace" }} />
                </div>
              )}
              {postForm.postType === "POLL" && (
                <>
                  <div>
                    <label style={labelStyle}>Poll options (one per line)</label>
                    {postForm.pollOptions.map((opt, i) => (
                      <input
                        key={i}
                        value={opt}
                        onChange={(e) => {
                          const next = [...postForm.pollOptions];
                          next[i] = e.target.value;
                          setPostForm({ ...postForm, pollOptions: next });
                        }}
                        style={{ ...inputStyle, marginBottom: 8 }}
                        placeholder={`Option ${i + 1}`}
                      />
                    ))}
                    <button type="button" onClick={() => setPostForm({ ...postForm, pollOptions: [...postForm.pollOptions, ""] })} style={{ background: "none", border: "1px dashed rgba(255,255,255,0.2)", color: "white", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: "0.8rem" }}>
                      + Add option
                    </button>
                  </div>
                  <div>
                    <label style={labelStyle}>Poll ends at (optional)</label>
                    <input type="datetime-local" value={postForm.pollEndsAt} onChange={(e) => setPostForm({ ...postForm, pollEndsAt: e.target.value })} style={inputStyle} />
                  </div>
                </>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Author</label>
                  <input required value={postForm.author} onChange={(e) => setPostForm({ ...postForm, author: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Cover image URL</label>
                  <input value={postForm.coverImage} onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Tags (comma separated)</label>
                <input value={postForm.tags} onChange={(e) => setPostForm({ ...postForm, tags: e.target.value })} style={inputStyle} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={postForm.trending} onChange={(e) => setPostForm({ ...postForm, trending: e.target.checked })} />
                <Flame size={14} /> Mark as trending
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={postForm.published} onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })} />
                Publish live
              </label>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      {/* Topic Modal */}
      <AnimatePresence>
        {isTopicModalOpen && (
          <Modal onClose={() => setIsTopicModalOpen(false)} title={editingTopic ? "Edit Topic" : "New Trending Topic"} footer={<ModalFooter onClose={() => setIsTopicModalOpen(false)} saving={saving} formId="topic-form" />}>
            <form id="topic-form" onSubmit={handleTopicSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Emoji</label>
                  <input value={topicForm.emoji} onChange={(e) => setTopicForm({ ...topicForm, emoji: e.target.value })} style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Label</label>
                  <input required value={topicForm.label} onChange={(e) => setTopicForm({ ...topicForm, label: e.target.value })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Description</label>
                <input value={topicForm.description} onChange={(e) => setTopicForm({ ...topicForm, description: e.target.value })} style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={labelStyle}>Color</label>
                  <input type="color" value={topicForm.color} onChange={(e) => setTopicForm({ ...topicForm, color: e.target.value })} style={{ ...inputStyle, height: 42, padding: 4 }} />
                </div>
                <div>
                  <label style={labelStyle}>Sort order</label>
                  <input type="number" value={topicForm.sortOrder} onChange={(e) => setTopicForm({ ...topicForm, sortOrder: Number(e.target.value) })} style={inputStyle} />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Custom link (optional)</label>
                <input value={topicForm.href} onChange={(e) => setTopicForm({ ...topicForm, href: e.target.value })} placeholder="https:// or /blog/topic/..." style={inputStyle} />
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={topicForm.active} onChange={(e) => setTopicForm({ ...topicForm, active: e.target.checked })} />
                Active on site
              </label>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

function Modal({ children, onClose, title, footer }: { children: React.ReactNode; onClose: () => void; title: string; footer?: React.ReactNode }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} style={{ position: "relative", width: "90%", maxWidth: 720, maxHeight: "90vh", background: "#0f0f1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "1.15rem" }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}><X /></button>
        </div>
        <div style={{ padding: "1.5rem", overflowY: "auto", flex: 1 }}>{children}</div>
        {footer}
      </motion.div>
    </div>
  );
}

function ModalFooter({ onClose, saving, formId }: { onClose: () => void; saving: boolean; formId: string }) {
  return (
    <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
      <button type="button" onClick={onClose} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "10px 20px", borderRadius: 8, cursor: "pointer" }}>Cancel</button>
      <button form={formId} type="submit" disabled={saving} style={{ background: "var(--gradient-hero)", border: "none", color: "white", padding: "10px 24px", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
