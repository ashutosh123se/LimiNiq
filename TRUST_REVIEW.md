# LIMINIQ Trust & Verifiability Audit: Founder Review Guide

This document flags every numerical claim, client metric, credential, and external profile reference across the LIMINIQ codebase. In accordance with Google's Quality Rater Guidelines (E-E-A-T) and international consumer protection standards, all claims should be verifiable, supported by internal project documentation, or replaced with qualitative scope statements.

---

## 1. Top-Level Metric Claims Needing Founder Confirmation

| Metric Claim | Current Locations in Code | Recommended Action | Founder Confirmation Status |
| :--- | :--- | :--- | :--- |
| **"$12M+ Revenue Influenced / Generated"** | `TheLeads.tsx`, `TrustTicker.tsx`, `ProofCredentials.tsx` | Either provide internal calculation methodology (e.g. cumulative client GMV / revenue pipelines impacted) or adjust to a verified operational metric (e.g. *"500,000+ Automated Transactions"* or *"100,000+ Lines of Production Code Shipped"*). | `[ ] Keep / [ ] Adjust / [ ] Remove` |
| **"150+ Projects Delivered"** | `TheLeads.tsx`, `TrustTicker.tsx`, `Footer.tsx`, `ProofCredentials.tsx` | Confirm whether this count reflects all deliverables (web, SaaS, internal tools, marketing funnels) since 2019. If lower, adjust to verified figure (e.g. *"60+ Custom Systems Shipped"*). | `[ ] Confirmed / [ ] Adjust to: _____` |
| **"98% Client Retention"** | `TheLeads.tsx`, `TrustTicker.tsx`, `ProofCredentials.tsx` | Clarify the retention definition (e.g. repeat milestones, monthly SLA retainers, ongoing maintenance contracts). Added footnote clarifying NDA references. | `[ ] Confirmed / [ ] Adjust to: _____` |
| **"4.9★ Client Rating"** | `lib/site.ts`, `TrustTicker.tsx`, `Hero.tsx`, `ProofCredentials.tsx`, `Footer.tsx` | Unified from fragmented 4.5★ / 4.9★ claims. A single source of truth was established in `lib/site.ts`. If no public reviews link is active yet, keep label as *"Verified Client Rating"* based on internal post-delivery surveys. | `[ ] Confirmed based on internal reviews` |
| **"Rank #1 for 45 Competitive Keywords"** | `ProofCredentials.tsx`, `data/disciplines.ts` | Confirm whether this reflects specific tracked search phrases (e.g. in Semrush/Ahrefs for SEO client contracts) or replace with *"Page 1 Search Rankings for Growth Clients"*. | `[ ] Confirmed / [ ] Adjust to: _____` |

---

## 2. Third-Party Review Badges (Clutch, Google Reviews, GoodFirms)

All review badges have been updated to **dynamically hide** on the live site unless real URLs are provided in your environment variables:

| Platform | Required Environment Variable | Current Status | Founder Action Needed |
| :--- | :--- | :--- | :--- |
| **Google Reviews** | `NEXT_PUBLIC_GOOGLE_REVIEW_URL` | **Hidden** (Null) | Paste your Google Business Profile review link in `.env.local` / Vercel. |
| **Clutch** | `NEXT_PUBLIC_CLUTCH_URL` | **Hidden** (Null) | Create or claim Clutch.co profile, then paste public profile URL. |
| **GoodFirms** | `NEXT_PUBLIC_GOODFIRMS_URL` | **Hidden** (Null) | Create or claim GoodFirms profile, then paste public profile URL. |

> **Note**: As soon as you add these environment variables, the badges will automatically render in `TestimonialMarquee.tsx` and link directly to your verified third-party profiles.

---

## 3. Testimonials & Client Verification

All testimonials are consolidated in `data/testimonials.ts`. Placeholders like `[REAL_CLIENT_LINKEDIN_URL_1]` were purged.
All testimonials are currently set to `verified: false`, which hides the "Verified" pill and LinkedIn icon until verified.

| Client Name | Stated Title & Company | Verified? | Founder Action Needed |
| :--- | :--- | :--- | :--- |
| **Deepak Nair** | VP of Sales Ops, CloudStack IT | `false` | Confirm client permission to display name/quote + provide real LinkedIn URL if permitted. |
| **Arjun Kapoor** | Head of Product, PropSearch Middle East | `false` | Confirm client permission to display name/quote + provide real LinkedIn URL if permitted. |
| **Sarah Jenkins** | COO, ApexFlow Technologies | `false` | Confirm client permission to display name/quote + provide real LinkedIn URL if permitted. |
| **Elena Rostova** | VP Engineering, Finova Analytics | `false` | Confirm client permission to display name/quote + provide real LinkedIn URL if permitted. |
| **Marcus Vance** | Founder, OmniScale Growth | `false` | Confirm client permission to display name/quote + provide real LinkedIn URL if permitted. |
| **Priya Sharma** | Managing Partner, LearnSphere Global | `false` | Confirm client permission to display name/quote + provide real LinkedIn URL if permitted. |

To verify any client:
Open `data/testimonials.ts`, set `verified: true`, and add `linkedinUrl: "https://www.linkedin.com/in/real-handle"`.

---

## 4. Team Leadership Profiles

In `data/team.ts`, bracketed placeholder links were removed:
- **Ashutosh Shekhar** (Founder & CEO): Please provide personal LinkedIn profile URL.
- **Ayush Shekhar** (Technical Head & Architect): Please provide personal LinkedIn profile URL.
- **Akanksha Singh** (Head of Growth & Search): Please provide personal LinkedIn profile URL.
- **Aman Kumar** (Head of Design & Motion): Please provide personal LinkedIn profile URL.

---

## 5. Structured Data & Schema Compliance

- **Removed**: Fake `aggregateRating` (which previously claimed 58 reviews) from `lib/seo/schema.ts` to prevent Google Rich Results penalties.
- **Implemented**: Clean `Organization` and `ProfessionalService` schema with verified NAP (Name, Address, Phone: `Paschim Vihar, Delhi 110063, India`, `+91 9431471654`).
- **Implemented**: Valid `FAQPage` schema on the homepage and service landing pages matching exact server-rendered HTML.

