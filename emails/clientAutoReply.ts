export function clientAutoReplyTemplate(lead: {
  name: string;
  services: string[];
}): string {
  const firstName = lead.name.split(" ")[0];
  const siteUrl = process.env.NEXTAUTH_URL || "https://liminiq.com";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>We received your brief — LIMINIQ</title>
</head>
<body style="margin:0;padding:0;background:#040508;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#040508;padding:40px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0D1220;border:1px solid rgba(255,255,255,0.08);border-radius:24px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,0.5);">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,rgba(59,91,255,0.1) 0%,rgba(123,97,255,0.1) 100%);padding:48px 32px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.06);">
  <div style="font-family:'Syne',Arial,sans-serif;font-size:36px;font-weight:800;color:#F0F4FF;letter-spacing:-1.5px;">LIMINIQ</div>
  <div style="font-size:12px;color:#00C8A0;margin-top:8px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">Next-Gen Digital Solutions</div>
</td></tr>

<!-- Main content -->
<tr><td style="padding:48px 40px 32px;">
  <h1 style="font-size:26px;font-weight:700;color:#F0F4FF;margin:0 0 16px;line-height:1.3;font-family:'Syne',Arial,sans-serif;">Hi ${firstName}! 👋</h1>
  <p style="font-size:16px;color:#8892B0;line-height:1.7;margin:0 0 32px;">
    We've received your project brief and we're excited to learn more about your goals. Our team will review your submission and get back to you <strong style="color:#F0F4FF;">within 24 hours</strong> with a tailored growth plan.
  </p>

  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;margin-bottom:40px;">
    <div style="font-size:12px;font-weight:700;color:#3B5BFF;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:16px;">You expressed interest in:</div>
    ${lead.services.map((s) => `<div style="display:inline-block;background:rgba(59,91,255,0.15);color:#A0B4FF;border:1px solid rgba(59,91,255,0.3);border-radius:100px;padding:6px 16px;font-size:13px;font-weight:600;margin:4px 6px 4px 0;">${s}</div>`).join("")}
  </div>

  <!-- What happens next -->
  <h2 style="font-size:18px;font-weight:700;color:#F0F4FF;margin:0 0 20px;font-family:'Syne',Arial,sans-serif;">What happens next?</h2>
  ${[
    { num: "01", title: "We review your brief", desc: "Our team thoroughly analyses your requirements and goals." },
    { num: "02", title: "Strategy call", desc: "We'll reach out to schedule a 30-min discovery call at your convenience." },
    { num: "03", title: "Custom proposal", desc: "You'll receive a tailored proposal with timeline and pricing within 48h." },
  ].map((step) => `
  <div style="display:flex;gap:20px;margin-bottom:24px;align-items:flex-start;">
    <div style="background:linear-gradient(135deg,#3B5BFF,#7B61FF);color:white;width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;flex-shrink:0;text-align:center;line-height:36px;box-shadow:0 4px 12px rgba(59,91,255,0.3);">${step.num}</div>
    <div>
      <div style="font-size:15px;font-weight:700;color:#F0F4FF;margin-bottom:4px;">${step.title}</div>
      <div style="font-size:14px;color:#8892B0;line-height:1.6;">${step.desc}</div>
    </div>
  </div>`).join("")}

  <!-- While you wait -->
  <div style="border-top:1px solid rgba(255,255,255,0.06);margin:40px 0 32px;"></div>
  <h2 style="font-size:16px;font-weight:700;color:#F0F4FF;margin:0 0 16px;font-family:'Syne',Arial,sans-serif;">While you wait:</h2>
  <a href="${siteUrl}/portfolio" style="display:block;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 20px;margin-bottom:12px;text-decoration:none;color:#F0F4FF;font-size:14px;font-weight:600;">📁 View our case studies →</a>
  <a href="${siteUrl}/blog" style="display:block;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:16px 20px;text-decoration:none;color:#F0F4FF;font-size:14px;font-weight:600;">📚 Read our latest insights →</a>
</td></tr>

<!-- Footer -->
<tr><td style="background:rgba(255,255,255,0.02);padding:32px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);">
  <p style="font-size:13px;color:#8892B0;margin:0 0 12px;">Questions? Reply to this email or reach us at</p>
  <a href="mailto:hello@liminiq.com" style="color:#3B5BFF;font-weight:600;text-decoration:none;font-size:14px;">hello@liminiq.com</a>
  
  <div style="margin:24px 0;">
    <a href="https://www.linkedin.com/company/124623896/admin/dashboard/" style="display:inline-block;margin-right:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#8892B0;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600;">LinkedIn</a>
    <a href="https://www.instagram.com/liminiq_com?igsh=bm1xM28yM2JzZGhv" style="display:inline-block;margin-right:12px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#8892B0;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600;">Instagram</a>
    <a href="https://twitter.com/liminiq" style="display:inline-block;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#8892B0;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600;">Twitter</a>
  </div>

  <p style="font-size:12px;color:#4A5568;margin:0 0 8px;">© ${new Date().getFullYear()} LIMINIQ. Based in India, Building Globally.</p>
  <p style="font-size:12px;color:#4A5568;margin:0;"><a href="${siteUrl}/privacy-policy" style="color:#4A5568;">Privacy Policy</a> · <a href="{unsubscribe_url}" style="color:#4A5568;">Unsubscribe</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function followUpTemplate(data: {
  name: string;
  service: string;
  calendlyLink?: string;
}): string {
  const firstName = data.name.split(" ")[0];
  const siteUrl = process.env.NEXTAUTH_URL || "https://liminiq.com";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Following up — LIMINIQ</title></head>
<body style="margin:0;padding:0;background:#F4F6FF;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FF;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:20px;overflow:hidden;box-shadow:0 8px 32px rgba(59,91,255,0.10);">
<tr><td style="background:linear-gradient(135deg,#3B5BFF,#7B61FF);padding:32px;text-align:center;">
  <div style="font-family:'Syne',Arial,sans-serif;font-size:28px;font-weight:800;color:white;">LIMINIQ</div>
</td></tr>
<tr><td style="padding:40px;">
  <p style="font-size:15px;color:#3D4568;line-height:1.8;margin:0 0 16px;">Hi ${firstName},</p>
  <p style="font-size:15px;color:#3D4568;line-height:1.8;margin:0 0 20px;">
    I wanted to personally follow up on your inquiry about <strong style="color:#0A0F2C;">${data.service}</strong>. I noticed we haven't connected yet, and I'd love to understand your goals better.
  </p>
  <p style="font-size:15px;color:#3D4568;line-height:1.8;margin:0 0 28px;">
    Could we schedule a quick 20-minute call? No pitch, just a genuine conversation about what you're trying to achieve.
  </p>
  ${data.calendlyLink ? `<a href="${data.calendlyLink}" style="display:inline-block;background:linear-gradient(135deg,#3B5BFF,#7B61FF);color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">Schedule a Call →</a>` : ""}
  <p style="font-size:14px;color:#3D4568;line-height:1.8;margin:28px 0 0;">
    <em>P.S. — <a href="${siteUrl}/portfolio" style="color:#3B5BFF;">Check out this case study</a> — we grew a similar brand's organic traffic by 420% in 4 months. Might be relevant for what you're building.</em>
  </p>
  <p style="font-size:14px;color:#8891B4;margin:24px 0 0;">Warm regards,<br><strong style="color:#0A0F2C;">The LIMINIQ Team</strong></p>
</td></tr>
<tr><td style="background:#F4F6FF;padding:20px;text-align:center;border-top:1px solid rgba(59,91,255,0.06);">
  <p style="font-size:11px;color:#8891B4;margin:0;"><a href="{unsubscribe_url}" style="color:#8891B4;">Unsubscribe</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export function newsletterWelcomeTemplate(data: { name?: string }): string {
  const name = data.name ? data.name.split(" ")[0] : "there";
  const siteUrl = process.env.NEXTAUTH_URL || "https://liminiq.com";

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Welcome — LIMINIQ</title></head>
<body style="margin:0;padding:0;background:#F4F6FF;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FF;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:20px;overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#3B5BFF 0%,#7B61FF 50%,#00C8A0 100%);padding:40px;text-align:center;">
  <div style="font-size:32px;font-weight:800;color:white;font-family:'Syne',Arial,sans-serif;">LIMINIQ</div>
  <div style="font-size:18px;color:rgba(255,255,255,0.9);margin-top:8px;">Welcome to the Lab 🔬</div>
</td></tr>
<tr><td style="padding:40px;">
  <h1 style="font-size:22px;color:#0A0F2C;margin:0 0 16px;">Hey ${name}! You're in. 🎉</h1>
  <p style="font-size:15px;color:#3D4568;line-height:1.8;margin:0 0 24px;">
    Welcome to the LIMINIQ newsletter — where we share <strong>actionable insights</strong> on web development, SEO strategy, and digital marketing every week. No fluff, just tactics that actually work.
  </p>
  <p style="font-size:15px;color:#3D4568;line-height:1.8;margin:0 0 28px;">
    As a welcome gift, here's our free <strong>SEO Quick-Win Checklist</strong> — 15 changes you can make today to see results within 30 days.
  </p>
  <a href="${siteUrl}/blog/seo-quick-wins-checklist" style="display:inline-block;background:linear-gradient(135deg,#3B5BFF,#7B61FF);color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin-bottom:32px;">Download Free Checklist →</a>
  <div style="border-top:1px solid #ECEFFE;padding-top:28px;">
    <div style="font-size:13px;font-weight:700;color:#8891B4;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Follow us for daily tips:</div>
    <div>
      <a href="https://www.linkedin.com/company/124623896/admin/dashboard/" style="display:inline-block;margin-right:10px;background:#F4F6FF;border:1px solid rgba(59,91,255,0.12);color:#3B5BFF;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">LinkedIn</a>
      <a href="https://www.instagram.com/liminiq_com?igsh=bm1xM28yM2JzZGhv" style="display:inline-block;margin-right:10px;background:#F4F6FF;border:1px solid rgba(59,91,255,0.12);color:#3B5BFF;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">Instagram</a>
      <a href="https://twitter.com/liminiq" style="display:inline-block;background:#F4F6FF;border:1px solid rgba(59,91,255,0.12);color:#3B5BFF;padding:8px 16px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;">Twitter</a>
    </div>
  </div>
</td></tr>
<tr><td style="background:#F4F6FF;padding:20px;text-align:center;">
  <p style="font-size:11px;color:#8891B4;margin:0;">© ${new Date().getFullYear()} LIMINIQ · <a href="{unsubscribe_url}" style="color:#8891B4;">Unsubscribe</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}

export function proposalSentTemplate(data: {
  name: string;
  services: string[];
  proposalUrl: string;
}): string {
  const firstName = data.name.split(" ")[0];

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>Your Proposal is Ready — LIMINIQ</title></head>
<body style="margin:0;padding:0;background:#F4F6FF;font-family:'Plus Jakarta Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FF;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:white;border-radius:20px;overflow:hidden;">
<tr><td style="background:linear-gradient(135deg,#0A0F2C,#1a1440);padding:40px;text-align:center;">
  <div style="font-size:32px;font-weight:800;color:white;font-family:'Syne',Arial,sans-serif;margin-bottom:12px;">LIMINIQ</div>
  <div style="font-size:28px;">🎉</div>
  <div style="font-size:18px;color:rgba(255,255,255,0.9);margin-top:8px;font-weight:600;">Your Proposal is Ready!</div>
</td></tr>
<tr><td style="padding:40px;">
  <p style="font-size:15px;color:#3D4568;line-height:1.8;margin:0 0 16px;">Hi ${firstName},</p>
  <p style="font-size:15px;color:#3D4568;line-height:1.8;margin:0 0 24px;">
    Great news — we've prepared a custom proposal based on your project requirements. It covers our recommended approach, timeline, deliverables, and investment for:
  </p>
  <div style="background:#F4F6FF;border-radius:12px;padding:16px;margin-bottom:24px;">
    ${data.services.map((s) => `<div style="display:inline-block;background:rgba(59,91,255,0.08);color:#3B5BFF;border:1px solid rgba(59,91,255,0.18);border-radius:100px;padding:5px 14px;font-size:13px;font-weight:600;margin:3px;">${s}</div>`).join("")}
  </div>
  <a href="${data.proposalUrl}" style="display:inline-block;background:linear-gradient(135deg,#3B5BFF,#7B61FF);color:white;padding:16px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;margin-bottom:28px;">View Your Proposal →</a>
  <h2 style="font-size:16px;font-weight:700;color:#0A0F2C;margin:0 0 12px;">Next steps:</h2>
  ${["Review the proposal at your convenience", "Reply to this email with any questions", "Schedule a call to discuss further", "Sign off and we kick off immediately"].map((step, i) => `
  <div style="display:flex;gap:12px;margin-bottom:10px;">
    <div style="background:rgba(59,91,255,0.1);color:#3B5BFF;width:24px;height:24px;border-radius:6px;text-align:center;line-height:24px;font-size:12px;font-weight:700;flex-shrink:0;">${i+1}</div>
    <div style="font-size:14px;color:#3D4568;line-height:1.6;">${step}</div>
  </div>`).join("")}
</td></tr>
<tr><td style="background:#F4F6FF;padding:20px;text-align:center;">
  <p style="font-size:11px;color:#8891B4;margin:0;">© ${new Date().getFullYear()} LIMINIQ · <a href="{unsubscribe_url}" style="color:#8891B4;">Unsubscribe</a></p>
</td></tr>
</table></td></tr></table>
</body></html>`;
}
