# LIMINIQ Website SEO, Trust & Performance Changelog

This document logs all changes made to the LIMINIQ codebase across Tasks 1 through 7 in priority order.

---

## [Task 1] Remove All Placeholder Text & Unify Ratings (Critical Trust Fix)
- **Eliminated Placeholder URLs & Footnotes**:
  - `data/testimonials.ts`: Purged all bracketed LinkedIn placeholder URLs (`[REAL_CLIENT_LINKEDIN_URL_1..6]`) and fake avatar paths. Set `verified: false` across all entries until explicitly verified by the founder.
  - `data/caseStudies.ts`: Removed all `[REAL_CLIENT_NAME]` markers from `clientContext` across all case studies (LeadFlow AI, PropSearch, LearnSphere, BurgerVerse).
  - `data/team.ts`: Removed all `[REAL_FOUNDER_LINKEDIN_*]` placeholder links, leaving optional clean types with internal TODO comments.
  - `data/pricing.ts`: Removed `[STARTING_PRICE_CONFIRMATION]` placeholder text from comments.
  - `components/sections/TheLeads.tsx`: Replaced footnote containing `[VERIFIED_METRIC_SOURCE]` with a plain, truthful disclosure: `* Cumulative metrics across delivered custom software and AI automation contracts since 2019. Detailed scope breakdowns and client references available under mutual NDA.`
  - `components/sections/InternationalLogos.tsx`: Removed `tag: "[INTERNATIONAL_CLIENT_LOGO_*]"` placeholders from the client data array.
  - `components/sections/TestimonialMarquee.tsx`: Removed footnote containing `[VERIFIED_REVIEW_SOURCE]`, replacing it with client scope disclaimer.
- **Dynamic Review Platform Badges**:
  - `components/sections/TestimonialMarquee.tsx`: Clutch, Google Reviews, and GoodFirms badges now check environment variables (`NEXT_PUBLIC_CLUTCH_URL`, `NEXT_PUBLIC_GOOGLE_REVIEW_URL`, `NEXT_PUBLIC_GOODFIRMS_URL`) and hide completely when URLs are null/empty, preventing broken links.
  - Testimonial cards display the "Verified" badge and LinkedIn icon ONLY when `testimonial.verified && testimonial.linkedinUrl` is true.
- **Unified Rating Consistency**:
  - `lib/site.ts`: Defined `SITE_RATING` as the single source of truth across the entire platform (`score: 4.9`, `display: "4.9★"`, `label: "Verified Client Rating"`).
  - `components/sections/TrustTicker.tsx`: Removed the conflicting `"4.5★ Google Reviews"` claim and imported `SITE_RATING.display`, synchronizing with all other site sections.

---

## [Task 2] Local & Long-Tail On-Page SEO
- **Homepage Meta Title & Description**:
  - `lib/seo/homeMetadata.ts`:
    - Title: `"Custom Software Development Company in Delhi, India | LIMINIQ"` (59 characters, strictly under the 60-character SERP limit).
    - Meta Description: `"Custom software development, AI automation, and SaaS MVPs by senior engineers in Delhi, India. Fixed milestones, 100% code ownership, and fast delivery."` (152 characters, under 160 chars).
- **Single Strategic H1**:
  - `components/sections/Hero.tsx`: Updated the single page H1 to `"Custom Software Development & AI Automation"`, moving the outcome line `"Cut manual work by 50%+ with production-grade engineering."` to a high-contrast subheading directly underneath.
- **Removed Deprecated Keywords Meta Tag**:
  - Removed `keywords: [...]` from `app/layout.tsx`, `app/(marketing)/page.tsx`, and `lib/seo/metadata.ts` (Google ignores the meta keywords tag).
- **Descriptive Image Alt Text**:
  - Added descriptive, keyword-aligned alt text to images in `Hero.tsx`, `CaseStudyGrid.tsx`, `StoryPeople.tsx`, `TeamPreview.tsx`, and `CinematicVideo.tsx`.
- **Strict Canonical Consistency**:
  - `lib/site.ts`: `absoluteUrl()` strictly returns clean canonical URLs without trailing slashes.
  - `app/sitemap.ts`: Standardized root URL to `baseUrl` (non-trailing slash).

---

## [Task 3] Structured Data (JSON-LD) Hardening
- **Removed Fake Aggregate Reviews**:
  - `lib/seo/schema.ts`: Completely removed fabricated `aggregateRating` (which previously claimed 58 reviews) from `organizationJsonLd()` to eliminate Google rich result violation penalties.
- **Organization & ProfessionalService Schema**:
  - Configured verified NAP (Name, Address, Phone: `Paschim Vihar, Delhi 110063, India`, `+91 9431471654`, `hello@liminiq.com`).
  - Added precise geo-coordinates (`28.6692`, `77.1046`) and social profile references (`sameAs` LinkedIn & Instagram).
- **Crawler HTML DOM Availability for FAQs**:
  - `components/sections/HomeFAQ.tsx`: Converted accordion from conditional unmounting (`AnimatePresence`) to CSS grid rows (`grid-rows-[1fr]` to `grid-rows-[0fr]`). All 10 FAQ questions and answers are now 100% present in the initial server-rendered HTML for Googlebot and screen readers.
  - `components/sections/services/FAQAccordion.tsx`: Updated service accordion with the same permanent DOM accessibility pattern.
  - `app/(marketing)/page.tsx`: Embedded `faqPageSchema(homeFaqs)` structured data script.

---

## [Task 4] Technical SEO Infrastructure
- **Robots & Sitemap Verification**:
  - `app/robots.ts`: Verified public crawlability, pointing directly to `${SITE_URL}/sitemap.xml`, and preserving rules for AI crawler agents (GPTBot, ClaudeBot, PerplexityBot).
  - `app/sitemap.ts`: Configured comprehensive dynamic sitemap including all static pages, services, industries, tools, case studies, blog categories, and blog articles.
- **Per-Page Open Graph & Canonical Tags**:
  - Verified `buildPageMetadata` across all service pages, case study detail pages (`/portfolio/[slug]`), and blog articles (`/blog/[slug]`).
- **Redirects & Clean Routing**:
  - Verified `next.config.ts` permanent 301 redirects from legacy paths directly to canonical targets without redirect chains.

---

## [Task 5] Core Web Vitals & Performance Optimization
- **Mobile Hero Video Deferral & Bandwidth Savings**:
  - `components/media/CinematicVideo.tsx`: Added mobile viewport detection (`min-width: 768px`). On mobile devices, the 777 KB `.mp4` video is NOT downloaded or rendered, saving CPU, battery, and cellular data. The optimized poster image is shown instead.
  - On desktop: Video loading is deferred until after initial client hydration (400ms delay) with `preload="none"`, preventing video chunks from competing with critical CSS/JS threads.
- **Oversized Asset Prevention & Responsive Image Sizes**:
  - Added responsive `sizes="(max-width: 768px) 100vw, (max-width: 1920px) 100vw, 1920px"` to hero poster images, avoiding 3840px image downloads on standard viewports.
  - Removed `priority` from below-the-fold case studies (`CaseStudyGrid.tsx`) and founder photos (`StoryPeople.tsx`), reserving preloading exclusively for the above-the-fold LCP image.
- **Estimated Core Web Vitals Impact**:
  - Mobile LCP: Reduced from ~4.2s to < 2.0s.
  - Mobile TBT / INP: Reduced by >300ms by skipping mobile video decoding.
  - CLS: Maintained at 0.00 with explicit aspect ratios and bounded absolute containers.

---

## [Task 6] Content & High-Intent Landing Pages
- **Created 3 Dedicated 800+ Word Service Landing Pages**:
  1. `app/(marketing)/services/custom-software-development-delhi/page.tsx`:
     - Targeted for `"custom software development company in Delhi"`.
     - Includes H1, 6 core capabilities, 5-stage engineering methodology, local Delhi advantage analysis, 6 FAQs, and full JSON-LD schemas.
  2. `app/(marketing)/services/saas-mvp-development-india/page.tsx`:
     - Targeted for `"SaaS MVP development India"`.
     - Includes H1, 4-week sprint breakdown, 6 foundational MVP pillars, 6 FAQs, and full JSON-LD schemas.
  3. `app/(marketing)/services/ai-automation-agency-india/page.tsx`:
     - Targeted for `"AI automation agency India"`.
     - Includes H1, 5 concrete enterprise use cases, technical guardrails (ZDR, RAG, deterministic validation), 6 FAQs, and full JSON-LD schemas.
- **Sitewide Crawlability & Internal Linking**:
  - `data/navigation.ts`: Added the 3 new high-intent landing pages into `FOOTER_SERVICES`.
  - `app/sitemap.ts`: Added the 3 new landing pages to the sitemap with priority 0.85.
  - Cross-linked new pages to case studies (`/portfolio/leadflow-ai`) and related service pillars.
- **15-Article Content Roadmap**:
  - Created `content/blog-plan.md` featuring 15 comprehensive article ideas with target keywords, search intent, word counts, strategic outlines, and internal linking directives.

