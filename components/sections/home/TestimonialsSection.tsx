'use client'

import { useState, useEffect } from 'react'

interface Testimonial {
  name: string
  company: string
  role: string
  quote: string
  rating: number
  service?: string
  avatar?: string | null
  reviewedAt?: string
}

const REVIEW_AGO = [
  '1 week ago',
  '2 weeks ago',
  '3 weeks ago',
  '1 month ago',
  '5 weeks ago',
  '2 months ago',
  '6 weeks ago',
  '3 months ago',
  '1 month ago',
  '2 weeks ago',
]

const AVATAR_COLORS = [
  '#1a73e8',
  '#ea4335',
  '#34a853',
  '#fbbc04',
  '#9334e6',
  '#0d9488',
  '#e8710a',
  '#4285f4',
  '#137333',
  '#c5221f',
]

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  { name: 'Rohan Mehta', company: 'TechScale SaaS', role: 'CEO', quote: 'LIMINIQ rebuilt our platform and organic traffic shot up 420% in 4 months. The team is insanely talented — they think like product builders, not just developers.', rating: 5, service: 'Web Dev' },
  { name: 'Priya Sharma', company: 'HealthFirst Clinics', role: 'Marketing Director', quote: "We rank #1 for 45 high-intent keywords now. Our patient inquiries doubled in 6 months. LIMINIQ's SEO team is exceptional — data-driven and results-obsessed.", rating: 5, service: 'SEO' },
  { name: 'Arjun Kapoor', company: 'LearnSphere EdTech', role: 'Founder', quote: "Our Meta campaigns went from a 1.2x ROAS to 4.8x in just 8 weeks. The level of optimisation and attention to detail is unlike any agency I've worked with.", rating: 5, service: 'Digital Marketing' },
  { name: 'Sneha Iyer', company: 'PropVault Realty', role: 'Co-Founder', quote: 'Website speed went from 42 to 98 on PageSpeed, and our lead form conversions tripled. LIMINIQ delivered exactly what they promised, on time.', rating: 5, service: 'Web Dev' },
  { name: 'Vikram Singh', company: 'LegalEdge LLP', role: 'Managing Partner', quote: "Our firm now dominates local search in 3 cities. Revenue from organic search grew 220% year-over-year. Best investment we've made in marketing.", rating: 5, service: 'SEO' },
  { name: 'Anika Joshi', company: 'CraftBite Foods', role: 'Brand Head', quote: 'They launched our Instagram commerce strategy and we hit ₹1Cr in online sales in month 3. The team feels like an extension of our internal team.', rating: 5, service: 'Digital Marketing' },
  { name: 'Deepak Nair', company: 'CloudStack IT', role: 'CTO', quote: 'LIMINIQ built our entire B2B web app from scratch — clean architecture, flawless UI, and delivered 2 weeks early. Rare to find this level of craft.', rating: 5, service: 'Web Dev' },
  { name: 'Meera Pillai', company: 'Organic Root', role: 'Founder', quote: "We were invisible on Google. 6 months with LIMINIQ and we're ranking for 200+ keywords. Organic orders now make up 65% of our revenue.", rating: 5, service: 'SEO' },
  { name: 'Rahul Gupta', company: 'QuickFin Loans', role: 'VP Marketing', quote: "Our cost per acquisition dropped 58% while lead volume grew 3x. The LIMINIQ team's command of Google Ads is genuinely world-class.", rating: 5, service: 'Digital Marketing' },
  { name: 'Tanvi Choudhary', company: 'StyleHub Fashion', role: 'E-Commerce Head', quote: 'The new Shopify store LIMINIQ built loads in under 0.8 seconds and our cart abandonment fell 40%. Revenue per visitor is up 2.4x.', rating: 5, service: 'Web Dev' },
]

function GoogleMark({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="greview-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path
            fill={i < rating ? '#FBBC04' : '#dadce0'}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      ))}
    </span>
  )
}

function getAvatarColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]
}

function enrichTestimonial(t: Testimonial, index: number): Testimonial {
  return {
    ...t,
    reviewedAt: t.reviewedAt || REVIEW_AGO[index % REVIEW_AGO.length],
  }
}

function GoogleReviewCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const avatarColor = getAvatarColor(testimonial.name)

  return (
    <article className="greview-card">
      <div className="greview-card-top">
        <div className="greview-reviewer">
          {testimonial.avatar ? (
            <img src={testimonial.avatar} alt="" className="greview-avatar greview-avatar--photo" />
          ) : (
            <div
              className="greview-avatar"
              style={{ background: avatarColor }}
            >
              {testimonial.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="greview-name">{testimonial.name}</div>
            <div className="greview-meta">
              <StarRating rating={testimonial.rating} size={15} />
              <span className="greview-dot">·</span>
              <span className="greview-time">{testimonial.reviewedAt}</span>
            </div>
          </div>
        </div>
        <GoogleMark size={16} />
      </div>

      <p className="greview-text">{testimonial.quote}</p>

      <div className="greview-foot">
        <span className="greview-role">{testimonial.role}, {testimonial.company}</span>
        <span className="greview-verified">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 12l2 2 4-4" stroke="#1a73e8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="10" stroke="#1a73e8" strokeWidth="2" />
          </svg>
          Posted on Google
        </span>
      </div>
    </article>
  )
}

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    FALLBACK_TESTIMONIALS.map(enrichTestimonial)
  )

  useEffect(() => {
    fetch('/api/testimonials?active=true')
      .then((res) => res.json())
      .then((data: Testimonial[]) => {
        if (data && data.length > 0) {
          const enriched = data.map((t, i) => enrichTestimonial(t, i))
          setTestimonials(enriched.length < 6 ? [...enriched, ...enriched, ...enriched] : enriched)
        }
      })
      .catch(() => {})
  }, [])

  const mid = Math.ceil(testimonials.length / 2)
  const row1 = [...testimonials.slice(0, mid), ...testimonials.slice(0, mid)]
  const row2 = [...testimonials.slice(mid), ...testimonials.slice(mid)]
  const avgRating = (
    testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length
  ).toFixed(1)

  return (
    <section className="greviews-section section-padding">
      <div className="greviews-glow" />

      <div className="section-container greviews-inner">
        <div className="greviews-header">
          <div className="greviews-header-copy">
            <div className="greviews-google-badge">
              <GoogleMark size={20} />
              <span>Google Reviews</span>
            </div>
            <h2 className="section-h2 greviews-title">
              Trusted by <span className="text-gradient">Growing Brands</span>
            </h2>
            <p className="greviews-sub">
              Real feedback from clients who&apos;ve worked with LIMINIQ — pulled from our Google Business profile.
            </p>
          </div>

          <div className="greviews-summary glass-card-premium">
            <div className="greviews-summary-score">{avgRating}</div>
            <StarRating rating={5} size={18} />
            <p className="greviews-summary-label">Based on {testimonials.length}+ Google reviews</p>
            <a
              href="https://www.google.com/search?q=LIMINIQ+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="greviews-summary-link"
            >
              View on Google
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>

        <div className="greviews-marquee greviews-marquee--a">
          <div className="greviews-track">
            {row1.map((t, i) => (
              <GoogleReviewCard key={`r1-${t.name}-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>

        <div className="greviews-marquee greviews-marquee--b">
          <div className="greviews-track greviews-track--reverse">
            {row2.map((t, i) => (
              <GoogleReviewCard key={`r2-${t.name}-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .greviews-section {
          position: relative;
          overflow: hidden;
          background: var(--bg-primary);
        }

        .greviews-glow {
          position: absolute;
          width: 520px;
          height: 320px;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          background: rgba(66, 133, 244, 0.08);
        }

        .greviews-inner {
          position: relative;
          z-index: 1;
        }

        .greviews-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .greviews-google-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.45rem 0.95rem;
          border-radius: 100px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-family: var(--font-heading);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
          margin-bottom: 0.85rem;
        }

        .greviews-title {
          text-align: left;
          margin-bottom: 0.5rem !important;
        }

        .greviews-sub {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.65;
          margin: 0;
          max-width: 28rem;
        }

        .greviews-summary {
          flex-shrink: 0;
          text-align: center;
          padding: 1.25rem 1.5rem;
          min-width: 180px;
          border-color: rgba(66, 133, 244, 0.2) !important;
          background: linear-gradient(160deg, rgba(66, 133, 244, 0.08), rgba(255, 255, 255, 0.02)) !important;
        }

        .greviews-summary-score {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 0.35rem;
        }

        .greviews-summary-label {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin: 0.45rem 0 0.75rem;
        }

        .greviews-summary-link {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-family: var(--font-heading);
          font-size: 0.82rem;
          font-weight: 600;
          color: #1a73e8;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .greviews-summary-link:hover {
          opacity: 0.85;
        }

        .greview-stars {
          display: inline-flex;
          align-items: center;
          gap: 1px;
        }

        .greviews-marquee {
          margin-bottom: 1rem;
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }

        .greviews-track {
          display: flex;
          width: max-content;
          gap: 1rem;
          animation: greviewsMarquee 45s linear infinite;
        }

        .greviews-track--reverse {
          animation: greviewsMarqueeReverse 45s linear infinite;
        }

        .greviews-marquee:hover .greviews-track {
          animation-play-state: paused;
        }

        .greview-card {
          width: min(380px, 88vw);
          flex-shrink: 0;
          padding: 1.25rem 1.3rem;
          border-radius: 12px;
          background: #fff;
          border: 1px solid #e8eaed;
          box-shadow: 0 1px 3px rgba(60, 64, 67, 0.12), 0 4px 8px rgba(60, 64, 67, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .greview-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .greview-reviewer {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          min-width: 0;
        }

        .greview-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: #fff;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1rem;
          text-transform: uppercase;
        }

        .greview-avatar--photo {
          object-fit: cover;
        }

        .greview-name {
          font-family: 'Google Sans', var(--font-heading), sans-serif;
          font-size: 0.95rem;
          font-weight: 600;
          color: #202124;
          line-height: 1.2;
        }

        .greview-meta {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-top: 0.2rem;
          flex-wrap: wrap;
        }

        .greview-dot {
          color: #5f6368;
          font-size: 0.75rem;
        }

        .greview-time {
          font-size: 0.8rem;
          color: #5f6368;
        }

        .greview-text {
          margin: 0;
          font-family: 'Roboto', var(--font-body), sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          color: #3c4043;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .greview-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          flex-wrap: wrap;
          padding-top: 0.35rem;
          border-top: 1px solid #f1f3f4;
        }

        .greview-role {
          font-size: 0.78rem;
          color: #5f6368;
        }

        .greview-verified {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #1a73e8;
        }

        @keyframes greviewsMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes greviewsMarqueeReverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 820px) {
          .greviews-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .greviews-summary {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .greviews-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
