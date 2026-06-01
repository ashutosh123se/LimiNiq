export function adminNotificationTemplate(lead: {
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
}): string {
  const scoreColor = lead.score >= 75 ? "#00C8A0" : lead.score >= 50 ? "#FBB034" : "#ef4444";
  const scoreLabel = lead.score >= 75 ? "HOT 🔥" : lead.score >= 50 ? "WARM" : "COLD";
  const dashboardUrl = `${process.env.NEXTAUTH_URL || "https://liminiq.com"}/admin/leads/${lead.id}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>New Lead — LIMINIQ</title>
</head>
<body style="margin:0;padding:0;background:#F4F6FF;font-family:'DM Sans',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F4F6FF;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

<!-- Header -->
<tr><td style="background:linear-gradient(135deg,#3B5BFF,#7B61FF);border-radius:16px 16px 0 0;padding:32px;text-align:center;">
  <div style="font-family:'Syne',Arial,sans-serif;font-size:28px;font-weight:800;color:white;letter-spacing:-1px;margin-bottom:4px;">LIMINIQ</div>
  <div style="font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:1px;text-transform:uppercase;">New Lead Received</div>
</td></tr>

<!-- Alert banner -->
<tr><td style="background:#0A0F2C;padding:20px 32px;text-align:center;">
  <span style="font-size:22px;">🔔</span>
  <span style="font-size:16px;font-weight:700;color:white;margin-left:8px;">New Lead Alert</span>
  <div style="margin-top:8px;">
    <span style="background:${scoreColor};color:white;padding:4px 14px;border-radius:100px;font-size:12px;font-weight:700;letter-spacing:1px;">${scoreLabel} — Score: ${lead.score}/100</span>
  </div>
</td></tr>

<!-- Lead details -->
<tr><td style="background:white;padding:32px;">
  <h2 style="font-size:18px;font-weight:700;color:#0A0F2C;margin:0 0 20px;">Lead Details</h2>
  <table width="100%" cellpadding="0" cellspacing="0">
    ${[
      ["Name", lead.name],
      ["Email", lead.email],
      ["Phone", lead.phone || "Not provided"],
      ["Company", lead.company || "Not provided"],
      ["Services", lead.services.join(", ")],
      ["Budget", lead.budget || "Not specified"],
      ["Source", lead.source || "Direct"],
      ["UTM Source", lead.utmSource || "—"],
      ["UTM Campaign", lead.utmCampaign || "—"],
    ].map(([label, value]) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#8891B4;font-size:13px;font-weight:600;width:40%;">${label}</td>
      <td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#0A0F2C;font-size:14px;">${value}</td>
    </tr>`).join("")}
  </table>

  ${lead.message ? `
  <div style="margin-top:24px;">
    <div style="font-size:13px;font-weight:600;color:#8891B4;margin-bottom:8px;text-transform:uppercase;letter-spacing:1px;">Project Message</div>
    <div style="background:#F4F6FF;border-left:3px solid #3B5BFF;padding:16px;border-radius:8px;font-size:14px;color:#3D4568;line-height:1.7;">${lead.message}</div>
  </div>` : ""}

  <!-- CTAs -->
  <div style="margin-top:32px;display:flex;gap:12px;text-align:center;">
    <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#3B5BFF,#7B61FF);color:white;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;margin-right:12px;">View in Dashboard →</a>
    <a href="mailto:${lead.email}" style="display:inline-block;border:2px solid #3B5BFF;color:#3B5BFF;padding:12px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:14px;">Reply to Lead</a>
  </div>
</td></tr>

<!-- Footer -->
<tr><td style="background:#F4F6FF;padding:20px 32px;text-align:center;border-radius:0 0 16px 16px;">
  <p style="font-size:12px;color:#8891B4;margin:0;">This notification was sent from LIMINIQ CRM. <a href="${process.env.NEXTAUTH_URL}/admin" style="color:#3B5BFF;">Open Admin Panel</a></p>
</td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}
