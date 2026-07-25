"use client";

import { useRef, useState } from "react";
import { Check, Copy, Upload } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

interface Swatch {
  hex: string;
  percent: number;
}

function toHex(value: number) {
  return value.toString(16).padStart(2, "0");
}

function extractPalette(image: HTMLImageElement, count = 6): Swatch[] {
  const canvas = document.createElement("canvas");
  const size = 100;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return [];

  ctx.drawImage(image, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);

  const buckets = new Map<string, number>();
  const bucketSize = 32;

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha < 100) continue;
    const r = Math.floor(data[i] / bucketSize) * bucketSize;
    const g = Math.floor(data[i + 1] / bucketSize) * bucketSize;
    const b = Math.floor(data[i + 2] / bucketSize) * bucketSize;
    const key = `${r},${g},${b}`;
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  const total = Array.from(buckets.values()).reduce((sum, n) => sum + n, 0) || 1;

  return Array.from(buckets.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key, freq]) => {
      const [r, g, b] = key.split(",").map(Number);
      return { hex: `#${toHex(r)}${toHex(g)}${toHex(b)}`, percent: Math.round((freq / total) * 100) };
    });
}

export function ColorPaletteExtractor() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [palette, setPalette] = useState<Swatch[]>([]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const src = reader.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => setPalette(extractPalette(img));
      img.src = src;
    };
    reader.readAsDataURL(file);
  }

  async function copyHex(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1200);
  }

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            Color Palette <span className="text-gradient">Extractor</span>
          </>
        }
        description="Upload any image to pull out its dominant colors as ready-to-use hex codes for your brand, UI, or design system."
      />

      <div className="tool-panel glass-card-premium" style={{ marginBottom: "1.5rem" }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={(e) => handleFile(e.target.files?.[0])}
          style={{ display: "none" }}
        />
        <div className="tool-dropzone" onClick={() => inputRef.current?.click()}>
          <Upload size={26} style={{ margin: "0 auto 0.75rem", color: "var(--accent)" }} />
          <p style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.35rem" }}>
            {imageSrc ? "Click to replace image" : "Click to upload an image"}
          </p>
          <p style={{ fontSize: "0.8rem", margin: 0 }}>PNG, JPG, or WebP — photos and logos both work well.</p>
        </div>
      </div>

      {imageSrc && (
        <div className="tool-grid-2">
          <div className="tool-panel glass-card" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageSrc} alt="Uploaded" style={{ maxWidth: "100%", maxHeight: 320, borderRadius: 12 }} />
          </div>

          <div className="tool-panel glass-card">
            <div className="tool-swatch-grid">
              {palette.map((swatch) => (
                <div key={swatch.hex} className="tool-swatch">
                  <div className="tool-swatch-color" style={{ background: swatch.hex }} />
                  <div className="tool-swatch-info">
                    <span>{swatch.hex.toUpperCase()}</span>
                    <button type="button" onClick={() => copyHex(swatch.hex)} className="tool-copy-btn" aria-label={`Copy ${swatch.hex}`}>
                      {copiedHex === swatch.hex ? <Check size={13} color="var(--signal)" /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
