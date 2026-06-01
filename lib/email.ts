import nodemailer from "nodemailer";
import { adminNotificationTemplate } from "@/emails/adminNotification";
import { clientAutoReplyTemplate } from "@/emails/clientAutoReply";
import { followUpTemplate } from "@/emails/followUp";
import { newsletterWelcomeTemplate } from "@/emails/newsletterWelcome";
import { proposalSentTemplate } from "@/emails/proposalSent";

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

// ── Primary: SendGrid ────────────────────────────────────────
async function sendViaSendGrid(payload: EmailPayload): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) return false;

  try {
    const sgMail = await import("@sendgrid/mail");
    sgMail.default.setApiKey(apiKey);
    await sgMail.default.send({
      to: payload.to,
      from: {
        email: process.env.EMAIL_FROM || "hello@liminiq.com",
        name: "LIMINIQ",
      },
      replyTo: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    });
    return true;
  } catch (error) {
    console.error("[Email] SendGrid failed:", error);
    return false;
  }
}

// ── Fallback: Nodemailer SMTP ────────────────────────────────
async function sendViaNodemailer(payload: EmailPayload): Promise<boolean> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return false;

  try {
    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"LIMINIQ" <${process.env.EMAIL_FROM || "hello@liminiq.com"}>`,
      to: payload.to,
      replyTo: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    });
    return true;
  } catch (error) {
    console.error("[Email] Nodemailer failed:", error);
    return false;
  }
}

// ── Core send function ───────────────────────────────────────
async function sendEmail(payload: EmailPayload): Promise<{ success: boolean; provider: string }> {
  // Try SendGrid first
  const sgOk = await sendViaSendGrid(payload);
  if (sgOk) return { success: true, provider: "sendgrid" };

  // Fallback to SMTP
  const smtpOk = await sendViaNodemailer(payload);
  if (smtpOk) return { success: true, provider: "smtp" };

  console.error("[Email] All providers failed for:", payload.to);
  return { success: false, provider: "none" };
}

// ── Public API ───────────────────────────────────────────────
export async function sendAdminNotification(lead: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  services: string[];
  budget?: string | null;
  message?: string | null;
  score: number;
  source?: string | null;
  utmSource?: string | null;
  utmCampaign?: string | null;
  id: string;
}) {
  const adminEmail = process.env.EMAIL_ADMIN || "admin@liminiq.com";
  return sendEmail({
    to: adminEmail,
    subject: `🔔 New Lead: ${lead.name} (Score: ${lead.score}/100)`,
    html: adminNotificationTemplate(lead),
  });
}

export async function sendClientAutoReply(lead: {
  name: string;
  email: string;
  services: string[];
}) {
  return sendEmail({
    to: lead.email,
    subject: "We received your brief — LIMINIQ",
    html: clientAutoReplyTemplate(lead),
    replyTo: process.env.EMAIL_FROM || "hello@liminiq.com",
  });
}

export async function sendFollowUp(data: {
  to: string;
  name: string;
  service: string;
  calendlyLink?: string;
}) {
  return sendEmail({
    to: data.to,
    subject: `Following up on your ${data.service} inquiry — LIMINIQ`,
    html: followUpTemplate(data),
    replyTo: process.env.EMAIL_FROM || "hello@liminiq.com",
  });
}

export async function sendNewsletterWelcome(data: { to: string; name?: string }) {
  return sendEmail({
    to: data.to,
    subject: "Welcome to the LIMINIQ newsletter 🚀",
    html: newsletterWelcomeTemplate(data),
  });
}

export async function sendProposalNotification(data: {
  to: string;
  name: string;
  services: string[];
  proposalUrl: string;
}) {
  return sendEmail({
    to: data.to,
    subject: "Your LIMINIQ Proposal is Ready! 🎉",
    html: proposalSentTemplate(data),
  });
}

export async function sendCustomEmail(data: {
  to: string;
  subject: string;
  html: string;
}) {
  return sendEmail({ to: data.to, subject: data.subject, html: data.html });
}
