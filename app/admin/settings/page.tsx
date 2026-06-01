"use client";

import { useState, useEffect } from "react";
import { Save, Building2, Mail, Phone, MapPin } from "lucide-react";

type Settings = {
  companyEmail: string;
  companyPhone: string;
  companyCity: string;
};

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<Settings>({
    companyEmail: "",
    companyPhone: "",
    companyCity: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings({
          companyEmail: data.companyEmail || "",
          companyPhone: data.companyPhone || "",
          companyCity: data.companyCity || "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setMessage("Settings saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Failed to save settings.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: "3rem", color: "white", textAlign: "center" }}>Loading settings...</div>;

  return (
    <div style={{ padding: "2rem", color: "white", maxWidth: 800 }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          Global Settings
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)" }}>
          Manage your agency contact details and site-wide preferences.
        </p>
      </div>

      <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        
        {/* Contact Info Section */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "2rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <Building2 size={20} color="#3b82f6" /> Contact Information
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Mail size={16} /> Public Contact Email
              </label>
              <input
                type="email"
                value={settings.companyEmail}
                onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                placeholder="e.g. hello@liminiq.com"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "0.75rem 1rem", color: "white", width: "100%", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={16} /> Contact Phone Number
              </label>
              <input
                type="text"
                value={settings.companyPhone}
                onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                placeholder="e.g. +91 99999 99999"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "0.75rem 1rem", color: "white", width: "100%", outline: "none" }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <label style={{ fontSize: "0.875rem", fontWeight: 500, color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <MapPin size={16} /> Base Location (City/Country)
              </label>
              <input
                type="text"
                value={settings.companyCity}
                onChange={(e) => setSettings({ ...settings, companyCity: e.target.value })}
                placeholder="e.g. Mumbai, India"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "0.75rem 1rem", color: "white", width: "100%", outline: "none" }}
              />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "1.5rem" }}>
          <div>
            {message && <span style={{ color: message.includes("success") ? "#4ade80" : "#f87171", fontSize: "0.875rem", fontWeight: 500 }}>{message}</span>}
          </div>
          <button
            type="submit"
            disabled={saving}
            style={{ background: "white", color: "black", padding: "0.75rem 1.5rem", borderRadius: 8, border: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.5rem", cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
          >
            <Save size={18} /> {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>

      </form>
    </div>
  );
}
