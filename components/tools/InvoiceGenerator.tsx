"use client";

import { useMemo, useState } from "react";
import { jsPDF } from "jspdf";
import { Download, Plus, Trash2 } from "lucide-react";
import { ToolHeader } from "@/components/tools/ToolHeader";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

function newLineItem(): LineItem {
  return { id: crypto.randomUUID(), description: "", qty: 1, rate: 0 };
}

const CURRENCIES = [
  { code: "USD", symbol: "$", locale: "en-US" },
  { code: "GBP", symbol: "£", locale: "en-GB" },
  { code: "EUR", symbol: "€", locale: "de-DE" },
  { code: "AED", symbol: "AED ", locale: "en-AE" },
  { code: "CAD", symbol: "CA$ ", locale: "en-CA" },
  { code: "AUD", symbol: "A$ ", locale: "en-AU" },
  { code: "INR", symbol: "₹", locale: "en-IN" },
] as const;

export function InvoiceGenerator() {
  const [currencyCode, setCurrencyCode] = useState<string>("USD");
  const [fromName, setFromName] = useState("LIMINIQ");
  const [fromAddress, setFromAddress] = useState("Paschim Vihar, Delhi 110063, India");
  const [toName, setToName] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [dueDate, setDueDate] = useState("");
  const [taxPercent, setTaxPercent] = useState("0");
  const [notes, setNotes] = useState("Payment terms: 14 days. Thank you for your business.");
  const [items, setItems] = useState<LineItem[]>([newLineItem()]);

  const currentCurrency = useMemo(
    () => CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0],
    [currencyCode]
  );

  const { subtotal, taxAmount, total } = useMemo(() => {
    const sub = items.reduce((sum, item) => sum + Math.max(0, item.qty) * Math.max(0, item.rate), 0);
    const taxRate = Math.min(100, Math.max(0, parseFloat(taxPercent || "0") || 0));
    const tax = sub * (taxRate / 100);
    return { subtotal: sub, taxAmount: tax, total: sub + tax };
  }, [items, taxPercent]);

  function updateItem(id: string, patch: Partial<LineItem>) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, ...patch };
        if (typeof updated.description === "string") {
          updated.description = updated.description.slice(0, 200);
        }
        if (typeof updated.qty === "number") {
          updated.qty = Math.min(1000000, Math.max(0, updated.qty));
        }
        if (typeof updated.rate === "number") {
          updated.rate = Math.min(100000000, Math.max(0, updated.rate));
        }
        return updated;
      })
    );
  }

  function addItem() {
    if (items.length >= 30) return; // Prevent excessive elements
    setItems((prev) => [...prev, newLineItem()]);
  }

  function removeItem(id: string) {
    setItems((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  }

  function formatCurrency(value: number) {
    return `${currentCurrency.symbol}${value.toLocaleString(currentCurrency.locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function handleDownload() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 48;
    let y = 60;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(20, 20, 30);
    doc.text("INVOICE", margin, y);

    // Sanitize invoice number for display
    const cleanInvoiceNumber = (invoiceNumber || "—").replace(/[^\w\s\-#.]/g, "").slice(0, 30);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 100);
    doc.text(`# ${cleanInvoiceNumber}`, pageWidth - margin, y - 4, { align: "right" });
    doc.text(`Date: ${invoiceDate || "—"}`, pageWidth - margin, y + 12, { align: "right" });
    if (dueDate) doc.text(`Due: ${dueDate}`, pageWidth - margin, y + 26, { align: "right" });

    y += 48;
    doc.setDrawColor(220, 220, 225);
    doc.line(margin, y, pageWidth - margin, y);
    y += 28;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 130);
    doc.text("FROM", margin, y);
    doc.text("BILL TO", pageWidth / 2, y);
    y += 16;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 40);
    const cleanFromName = fromName.slice(0, 100);
    const cleanFromAddress = fromAddress.slice(0, 200);
    const cleanToName = (toName || "Client name").slice(0, 100);
    const cleanToAddress = (toAddress || "Client address").slice(0, 200);

    const fromLines = doc.splitTextToSize(`${cleanFromName}\n${cleanFromAddress}`, pageWidth / 2 - margin - 20);
    const toLines = doc.splitTextToSize(`${cleanToName}\n${cleanToAddress}`, pageWidth / 2 - margin - 20);
    doc.text(fromLines, margin, y);
    doc.text(toLines, pageWidth / 2, y);

    y += Math.max(fromLines.length, toLines.length) * 14 + 32;

    // Table header
    doc.setFillColor(24, 26, 34);
    doc.rect(margin, y, pageWidth - margin * 2, 26, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("DESCRIPTION", margin + 10, y + 17);
    doc.text("QTY", pageWidth - margin - 200, y + 17, { align: "right" });
    doc.text(`RATE (${currencyCode})`, pageWidth - margin - 110, y + 17, { align: "right" });
    doc.text("AMOUNT", pageWidth - margin - 10, y + 17, { align: "right" });
    y += 26;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    items.forEach((item, i) => {
      const rowHeight = 24;
      if (i % 2 === 1) {
        doc.setFillColor(246, 246, 248);
        doc.rect(margin, y, pageWidth - margin * 2, rowHeight, "F");
      }
      doc.setTextColor(40, 40, 50);
      const cleanDesc = (item.description || "Item description").slice(0, 80);
      doc.text(cleanDesc, margin + 10, y + 16);
      doc.text(String(item.qty), pageWidth - margin - 200, y + 16, { align: "right" });
      doc.text(formatCurrency(item.rate), pageWidth - margin - 110, y + 16, { align: "right" });
      doc.text(formatCurrency(item.qty * item.rate), pageWidth - margin - 10, y + 16, { align: "right" });
      y += rowHeight;
    });

    y += 20;
    const totalsX = pageWidth - margin - 200;
    doc.setFontSize(10);
    doc.setTextColor(90, 90, 100);
    doc.text("Subtotal", totalsX, y, { align: "left" });
    doc.setTextColor(30, 30, 40);
    doc.text(formatCurrency(subtotal), pageWidth - margin - 10, y, { align: "right" });
    y += 18;

    const safeTax = Math.min(100, Math.max(0, parseFloat(taxPercent || "0") || 0));
    doc.setTextColor(90, 90, 100);
    doc.text(`Tax (${safeTax}%)`, totalsX, y, { align: "left" });
    doc.setTextColor(30, 30, 40);
    doc.text(formatCurrency(taxAmount), pageWidth - margin - 10, y, { align: "right" });
    y += 8;

    doc.setDrawColor(220, 220, 225);
    doc.line(totalsX, y + 8, pageWidth - margin, y + 8);
    y += 26;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(20, 20, 30);
    doc.text("Total", totalsX, y, { align: "left" });
    doc.text(formatCurrency(total), pageWidth - margin - 10, y, { align: "right" });

    if (notes) {
      y += 50;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 130);
      const cleanNotes = notes.slice(0, 500);
      const noteLines = doc.splitTextToSize(cleanNotes, pageWidth - margin * 2);
      doc.text(noteLines, margin, y);
    }

    // Path traversal defense on downloaded filename
    const safeFilename = (invoiceNumber || "invoice")
      .replace(/[^a-zA-Z0-9_\-]/g, "_")
      .slice(0, 40);
    doc.save(`${safeFilename || "invoice"}.pdf`);
  }

  return (
    <div>
      <ToolHeader
        eyebrow="Free Tool"
        title={
          <>
            Invoice <span className="text-gradient">Generator</span>
          </>
        }
        description="Fill in the details below and download a clean, professional PDF invoice in USD, EUR, GBP, or INR — no signup, nothing stored."
      />

      <div className="tool-panel glass-card-premium" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>Currency:</span>
            <select
              className="form-input"
              value={currencyCode}
              onChange={(e) => setCurrencyCode(e.target.value)}
              style={{ width: "auto", padding: "0.35rem 0.75rem", fontSize: "0.85rem", cursor: "pointer" }}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol.trim()})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="tool-grid-2">
          <div>
            <div className="tool-field">
              <label>From</label>
              <input
                className="form-input"
                maxLength={100}
                value={fromName}
                onChange={(e) => setFromName(e.target.value)}
                placeholder="Your business name"
              />
            </div>
            <div className="tool-field">
              <label>From Address</label>
              <textarea
                className="form-input"
                maxLength={250}
                style={{ minHeight: 70 }}
                value={fromAddress}
                onChange={(e) => setFromAddress(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="tool-field">
              <label>Bill To</label>
              <input
                className="form-input"
                maxLength={100}
                value={toName}
                onChange={(e) => setToName(e.target.value)}
                placeholder="Client name"
              />
            </div>
            <div className="tool-field">
              <label>Client Address</label>
              <textarea
                className="form-input"
                maxLength={250}
                style={{ minHeight: 70 }}
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="tool-field-row" style={{ marginTop: "0.5rem" }}>
          <div className="tool-field">
            <label>Invoice #</label>
            <input
              className="form-input"
              maxLength={30}
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
          <div className="tool-field">
            <label>Invoice Date</label>
            <input type="date" className="form-input" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </div>
          <div className="tool-field">
            <label>Due Date</label>
            <input type="date" className="form-input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
          <div className="tool-field">
            <label>Tax (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="form-input"
              value={taxPercent}
              onChange={(e) => setTaxPercent(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="tool-panel glass-card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <span className="font-heading" style={{ fontWeight: 700, color: "var(--text-primary)" }}>
            Line Items ({items.length}/30)
          </span>
          <button
            type="button"
            onClick={addItem}
            disabled={items.length >= 30}
            className="btn-secondary"
            style={{ padding: "0.5rem 1rem", fontSize: "0.8rem" }}
          >
            <Plus size={14} /> Add Item
          </button>
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 80px 120px 110px 32px",
              gap: "0.6rem",
              marginBottom: "0.6rem",
              alignItems: "center",
            }}
          >
            <input
              className="form-input"
              placeholder="Description"
              maxLength={200}
              value={item.description}
              onChange={(e) => updateItem(item.id, { description: e.target.value })}
            />
            <input
              type="number"
              min="0"
              max="100000"
              className="form-input"
              value={item.qty}
              onChange={(e) => updateItem(item.id, { qty: parseFloat(e.target.value) || 0 })}
            />
            <input
              type="number"
              min="0"
              max="100000000"
              className="form-input"
              value={item.rate}
              onChange={(e) => updateItem(item.id, { rate: parseFloat(e.target.value) || 0 })}
            />
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", textAlign: "right" }}>
              {formatCurrency(item.qty * item.rate)}
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="tool-copy-btn"
              aria-label="Remove item"
              disabled={items.length === 1}
              style={{ opacity: items.length === 1 ? 0.3 : 1 }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}

        <div className="tool-field" style={{ marginTop: "1rem" }}>
          <label>Notes</label>
          <textarea
            className="form-input"
            maxLength={500}
            style={{ minHeight: 60 }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </div>

      <div
        className="tool-panel glass-card-premium"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1.25rem" }}
      >
        <div>
          <div className="tool-result-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="tool-result-row">
            <span>Tax</span>
            <strong>{formatCurrency(taxAmount)}</strong>
          </div>
          <div className="tool-result-row">
            <span>Total</span>
            <strong style={{ fontSize: "1.3rem" }}>{formatCurrency(total)}</strong>
          </div>
        </div>
        <button type="button" onClick={handleDownload} className="btn-primary">
          <Download size={16} /> Download PDF
        </button>
      </div>
    </div>
  );
}
