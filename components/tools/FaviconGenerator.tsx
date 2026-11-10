"use client";

import { useRef, useState } from "react";
import { Download, Upload, AlertCircle } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

const SIZES = [16, 32, 48, 96, 180, 192, 512];
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB limit
const ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

function resizeToDataUrl(image: HTMLImageElement, size: number): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(image, 0, 0, size, size);
  return canvas.toDataURL("image/png");
}

export function FaviconGenerator() {
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [previews, setPreviews] = useState<Record<number, string>>({});
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    setError(null);
    if (!file) return;

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setError("Please upload a valid PNG, JPG, WebP, or SVG image.");
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError("Image file is too large. Please select a file under 5MB.");
      return;
    }

    // Sanitize filename for safe downloads
    const safeBase = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_\-]/g, "_")
      .slice(0, 40);
    setFileName(safeBase || "favicon");

    const reader = new FileReader();
    reader.onerror = () => {
      setError("Failed to read image file.");
    };

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => {
        setError("Invalid or corrupted image format.");
      };

      img.onload = () => {
        setSourceImage(img);
        const next: Record<number, string> = {};
        SIZES.forEach((size) => {
          next[size] = resizeToDataUrl(img, size);
        });
        setPreviews(next);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            Favicon <span className="text-gradient">Generator</span>
          </>
        }
        description="Upload a square logo or image and instantly preview it across every favicon and app-icon size you need."
      />

      <div className="tool-panel glass-card-premium" style={{ marginBottom: "1.5rem" }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={(e) => handleFile(e.target.files?.[0])}
          style={{ display: "none" }}
        />
        <div className="tool-dropzone" onClick={() => inputRef.current?.click()} style={{ cursor: "pointer" }}>
          <Upload size={26} style={{ margin: "0 auto 0.75rem", color: "var(--accent)" }} />
          <p
            style={{
              fontFamily: "var(--font-heading)",
              fontWeight: 600,
              color: "var(--text-primary)",
              margin: "0 0 0.35rem",
            }}
          >
            {sourceImage ? "Click to replace image" : "Click to upload an image"}
          </p>
          <p style={{ fontSize: "0.8rem", margin: 0, color: "var(--text-secondary)" }}>
            PNG, JPG, WebP, or SVG (max 5MB) — square images work best.
          </p>
        </div>
        {error && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              borderRadius: "10px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.25)",
              color: "#f87171",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {sourceImage && (
        <div className="tool-panel glass-card">
          <div className="tool-swatch-grid">
            {SIZES.map((size) => (
              <div key={size} className="tool-swatch" style={{ textAlign: "center" }}>
                <div
                  style={{
                    height: 96,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "repeating-conic-gradient(#1a1d26 0% 25%, #14171f 0% 50%) 50% / 16px 16px",
                  }}
                >
                  {previews[size] && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previews[size]}
                      alt={`${size}x${size} favicon preview`}
                      width={Math.min(size, 72)}
                      height={Math.min(size, 72)}
                      style={{ imageRendering: size <= 32 ? "pixelated" : "auto" }}
                    />
                  )}
                </div>
                <div className="tool-swatch-info" style={{ justifyContent: "center", gap: 8 }}>
                  <span>
                    {size}×{size}
                  </span>
                  <a
                    href={previews[size]}
                    download={`${fileName || "favicon"}-${size}x${size}.png`}
                    className="tool-copy-btn"
                    aria-label={`Download ${size} by ${size} favicon`}
                  >
                    <Download size={13} />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              marginTop: "1.25rem",
              marginBottom: 0,
            }}
          >
            Use 16×16 / 32×32 for browser tabs, 180×180 for Apple touch icons, and 192×192 / 512×512 for PWA manifests.
          </p>
        </div>
      )}
    </div>
  );
}
