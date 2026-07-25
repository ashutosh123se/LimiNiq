"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Download, QrCode as QrCodeIcon } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

const COLORS = ["#000000", "#6c5ce7", "#22d3ee", "#ef4444", "#f59e0b"];

export function QrGenerator() {
  const [text, setText] = useState("https://www.liminiq.com");
  const [color, setColor] = useState(COLORS[0]);
  const [dataUrl, setDataUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!text.trim()) {
      setDataUrl("");
      return;
    }
    QRCode.toDataURL(text, {
      width: 480,
      margin: 2,
      color: { dark: color, light: "#ffffff" },
    })
      .then((url) => {
        setDataUrl(url);
        setError("");
      })
      .catch(() => setError("Couldn't generate a QR code for that input."));
  }, [text, color]);

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            QR Code <span className="text-gradient">Generator</span>
          </>
        }
        description="Turn any link or text into a downloadable QR code instantly — no watermark, no signup."
      />

      <div className="tool-grid-2">
        <div className="tool-panel glass-card-premium">
          <div className="tool-field">
            <label htmlFor="qr-text">URL or Text</label>
            <textarea
              id="qr-text"
              className="form-input"
              style={{ minHeight: 100, resize: "vertical" }}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>
          <div className="tool-field">
            <label>Color</label>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`Use color ${c}`}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: c,
                    border: color === c ? "2px solid var(--text-primary)" : "2px solid var(--border-subtle)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>
          {error && <p style={{ fontSize: "0.8rem", color: "#f87171" }}>{error}</p>}
        </div>

        <div className="tool-panel glass-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.25rem" }}>
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={dataUrl} alt="Generated QR code" width={220} height={220} style={{ borderRadius: 12, background: "white", padding: 12 }} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem", color: "var(--text-muted)" }}>
              <QrCodeIcon size={40} />
              <span>Enter text to generate a QR code</span>
            </div>
          )}
          {dataUrl && (
            <a href={dataUrl} download="qr-code.png" className="btn-primary">
              <Download size={16} /> Download PNG
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
