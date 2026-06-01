export function calculateLeadScore(lead: {
  budget?: string | null;
  services?: string[];
  message?: string | null;
  phone?: string | null;
  company?: string | null;
  website?: string | null;
  timeline?: string | null;
}): number {
  let score = 0;

  // Budget (max 30 points)
  const budgetScores: Record<string, number> = {
    "Under ₹10K": 5,
    "₹10K–₹30K": 10,
    "₹30K–₹75K": 20,
    "₹75K–₹2L": 25,
    "₹2L+": 30,
  };
  if (lead.budget) score += budgetScores[lead.budget] ?? 0;

  // Services selected (max 15 points)
  const servicesCount = lead.services?.length ?? 0;
  score += Math.min(servicesCount * 5, 15);

  // Message quality (max 20 points)
  const msgLen = lead.message?.length ?? 0;
  if (msgLen > 500) score += 20;
  else if (msgLen > 200) score += 12;
  else if (msgLen > 50) score += 6;

  // Contact completeness (max 20 points)
  if (lead.phone) score += 8;
  if (lead.company) score += 6;
  if (lead.website) score += 6;

  // Timeline urgency (max 15 points)
  const timelineScores: Record<string, number> = {
    "ASAP": 15,
    "Within 1 month": 12,
    "1–3 months": 8,
    "3–6 months": 4,
    "Flexible": 2,
  };
  if (lead.timeline) score += timelineScores[lead.timeline] ?? 0;

  return Math.min(score, 100);
}

export function getScoreLabel(score: number): string {
  if (score >= 75) return "Hot";
  if (score >= 50) return "Warm";
  if (score >= 25) return "Cool";
  return "Cold";
}

export function getScorePriority(score: number): "URGENT" | "HIGH" | "MEDIUM" | "LOW" {
  if (score >= 75) return "URGENT";
  if (score >= 60) return "HIGH";
  if (score >= 35) return "MEDIUM";
  return "LOW";
}
