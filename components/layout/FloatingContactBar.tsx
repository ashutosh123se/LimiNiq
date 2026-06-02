"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, MessageCircle, Bot } from "lucide-react";
import { AIChatModal } from "@/components/ui/AIChatModal";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi LIMINIQ! I'm interested in your services. Could you help me get started?"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export function FloatingContactBar() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <AIChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 z-[200] pointer-events-none flex items-end justify-center gap-2 sm:gap-4 w-max max-w-[95vw]">
        
        {/* Action Pill */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="pointer-events-auto flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full p-1 sm:p-1.5 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3">
            <a
              href="mailto:contact@liminiq.com"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white/80 hover:text-white transition-colors mr-1 sm:mr-2"
            >
              <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
            </a>
          </div>

          <Link
            href="/contact"
            className="bg-white hover:bg-gray-100 text-black text-sm sm:text-base font-semibold px-4 py-2 sm:px-6 sm:py-2.5 rounded-full transition-colors flex-shrink-0"
          >
            Book Call
          </Link>
        </motion.div>

        {/* Right Icon: Avatar */}
        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto w-14 h-14 rounded-full border-2 border-[#7B61FF] overflow-hidden flex-shrink-0 relative shadow-[0_0_20px_rgba(123,97,255,0.4)] bg-gradient-to-br from-[#3B5BFF] to-[#7B61FF] flex items-center justify-center group cursor-pointer"
        >
          {/* Fallback avatar if no image is present - using a generic futuristic look */}
          <div className="absolute inset-0 z-20 overflow-hidden rounded-full">
            <Image
              src="/images/ai_avatar.png"
              alt="AI Assistant"
              width={56}
              height={56}
              className="object-cover w-full h-full"
            />
          </div>
        </motion.button>
      </div>
    </>
  );
}
