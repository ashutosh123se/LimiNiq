"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function AdminNotFound() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      padding: "2rem",
      textAlign: "center",
      color: "white"
    }}>
      <AlertCircle size={64} color="var(--accent-primary)" style={{ marginBottom: "1.5rem" }} />
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 800, marginBottom: "1rem" }}>
        Page Not Found
      </h1>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "rgba(255,255,255,0.6)", maxWidth: 400, marginBottom: "2rem" }}>
        The admin page you are looking for doesn't exist or is still under construction.
      </p>
      <Link href="/admin" className="btn-primary" style={{ display: "inline-block", padding: "12px 24px" }}>
        Return to Dashboard
      </Link>
    </div>
  );
}
