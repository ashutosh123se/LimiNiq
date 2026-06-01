"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function AboutTeaser() {
  const containerRef = useRef(null);
  
  // Create parallax scroll effects tied to the section's position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  
  // Marquee scroll speeds
  const xMarquee1 = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const xMarquee2 = useTransform(scrollYProgress, [0, 1], [-800, 0]);

  return (
    <section ref={containerRef} style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden", padding: "8rem 0" }}>
      
      {/* Text Content Block */}
      <div className="section-container" style={{ position: "relative", zIndex: 10, marginBottom: "2rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="pill-badge shimmer" style={{ marginBottom: "1.5rem", display: "inline-flex", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", color: "white" }}>
              <span style={{ color: "var(--accent-teal)" }}>✦</span> The LimiNiq Standard
            </div>
            <h2 className="section-h2" style={{ color: "var(--text-primary)", marginBottom: "1.5rem", fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              Driven By Data.<br/>
              <span style={{ color: "var(--text-secondary)" }}>Built By Builders.</span>
            </h2>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: "600px", margin: "0 auto 2.5rem auto" }}>
              We are an elite collective of engineers, SEO strategists, and performance marketers. We abandoned the traditional agency model to build a boutique powerhouse obsessed with code quality and measurable ROI.
            </p>
            <Link href="/about" className="btn-primary" style={{ display: "inline-flex", padding: "1rem 2rem", fontSize: "1rem" }}>
              Meet The Team →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Marquee Gallery Area */}
      <div style={{ position: "relative", height: "70vh", minHeight: "500px", maxHeight: "800px", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "4rem" }}>
        
        {/* Massive Background Marquees */}
        <div style={{ position: "absolute", width: "100%", display: "flex", flexDirection: "column", gap: "2rem", opacity: 0.04, transform: "rotate(-3deg) scale(1.1)", pointerEvents: "none" }}>
           <motion.div style={{ x: xMarquee1, whiteSpace: "nowrap", fontSize: "clamp(6rem, 12vw, 15rem)", fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1 }}>
              WEB DEVELOPMENT • SEO STRATEGY • PERFORMANCE MARKETING • BRAND IDENTITY • WEB DEVELOPMENT • SEO STRATEGY • PERFORMANCE MARKETING • BRAND IDENTITY
           </motion.div>
           <motion.div style={{ x: xMarquee2, whiteSpace: "nowrap", fontSize: "clamp(6rem, 12vw, 15rem)", fontFamily: "var(--font-heading)", fontWeight: 900, textTransform: "uppercase", color: "transparent", WebkitTextStroke: "2px var(--text-primary)", lineHeight: 1 }}>
              DIGITAL INNOVATION • DATA DRIVEN • ROI FOCUSED • CREATIVE EXCELLENCE • DIGITAL INNOVATION • DATA DRIVEN • ROI FOCUSED • CREATIVE EXCELLENCE
           </motion.div>
        </div>

        {/* Floating Parallax Images */}
        <div className="section-container" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
           {/* Image 1 - Left Portrait */}
           <motion.div 
             style={{ 
               y: y1, 
               position: "absolute", 
               top: "10%", 
               left: "0%", 
               width: "25vw", 
               height: "35vw", 
               maxWidth: "320px", 
               maxHeight: "450px", 
               minWidth: "200px",
               minHeight: "280px",
               borderRadius: "24px", 
               overflow: "hidden", 
               boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
               border: "1px solid rgba(255,255,255,0.05)"
             }}
           >
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" 
                fill 
                style={{ objectFit: "cover" }} 
                alt="LimiNiq Team Collaborating" 
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,5,8,0.8), transparent)" }} />
           </motion.div>

           {/* Image 2 - Right Landscape */}
           <motion.div 
             style={{ 
               y: y2, 
               position: "absolute", 
               top: "35%", 
               right: "0%", 
               width: "35vw", 
               height: "22vw", 
               maxWidth: "480px", 
               maxHeight: "300px", 
               minWidth: "280px",
               minHeight: "180px",
               borderRadius: "24px", 
               overflow: "hidden", 
               boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
               border: "1px solid rgba(255,255,255,0.05)"
             }}
           >
              <Image 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
                fill 
                style={{ objectFit: "cover" }} 
                alt="Digital Strategy Planning" 
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,5,8,0.8), transparent)" }} />
           </motion.div>

           {/* Image 3 - Center Bottom Square */}
           <motion.div 
             style={{ 
               y: y1, 
               position: "absolute", 
               bottom: "0%", 
               left: "50%", 
               x: "-50%",
               width: "22vw", 
               height: "22vw", 
               maxWidth: "300px", 
               maxHeight: "300px", 
               minWidth: "180px",
               minHeight: "180px",
               borderRadius: "24px", 
               overflow: "hidden", 
               boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
               border: "1px solid rgba(255,255,255,0.05)",
               zIndex: 2
             }}
           >
              <Image 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800" 
                fill 
                style={{ objectFit: "cover" }} 
                alt="Development Code" 
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(4,5,8,0.8), transparent)" }} />
           </motion.div>
        </div>
      </div>
      
      {/* Decorative gradient blur */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(circle, rgba(59,91,255,0.05) 0%, transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />
    </section>
  );
}
