"use client";

import { useRef, useState } from "react";
import { Download, Upload } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

const SIZES = [16, 32, 48, 96, 180, 192, 512];

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
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name.replace(/\.[^.]+$/, ""));
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
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
        <div className="tool-dropzone" onClick={() => inputRef.current?.click()}>
          <Upload size={26} style={{ margin: "0 auto 0.75rem", color: "var(--accent)" }} />
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.35rem" }}>
            {sourceImage ? "Click to replace image" : "Click to upload an image"}
          </p>
          <p style={{ fontSize: "0.8rem", margin: 0 }}>PNG, JPG, WebP, or SVG — square images work best.</p>
        </div>
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
                    background: "repeating-conic-gradient(#1a1d26 0% 25%, #14171f 0% 50%) 50% / 16px 16px",
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
                  <span>{size}×{size}</span>
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
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "1.25rem", marginBottom: 0 }}>
            Use 16×16 / 32×32 for browser tabs, 180×180 for Apple touch icons, and 192×192 / 512×512 for PWA manifests.
          </p>
        </div>
      )}
    </div>
  );
}
