"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User } from "lucide-react";
import Image from "next/image";

interface AIChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatModal({ isOpen, onClose }: AIChatModalProps) {
  const [sessionId] = useState(() => {
    if (typeof window === "undefined") return "";
    let id = localStorage.getItem("liminiq_chat_session_id");
    if (!id) {
      id = "chat_" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("liminiq_chat_session_id", id);
    }
    return id;
  });

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    body: { sessionId },
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hey! I'm the LimiNiq assistant. What are you looking to build or grow?",
      },
    ],
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-24 right-4 md:right-6 w-[90vw] max-w-[380px] h-[500px] max-h-[70vh] bg-[#080C14]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col z-[210] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B5BFF] to-[#7B61FF] flex items-center justify-center overflow-hidden flex-shrink-0 border border-[#7B61FF]/30">
                <Image src="/images/ai_avatar.png" alt="AI" width={32} height={32} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">LimiNiq AI Assistant</h3>
                <p className="text-white/60 text-xs">Quick, friendly answers</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center mt-1 overflow-hidden ${
                    m.role === "user"
                      ? "bg-white/10"
                      : "bg-gradient-to-br from-[#3B5BFF] to-[#7B61FF] shadow-md border border-[#7B61FF]/30"
                  }`}
                >
                  {m.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Image src="/images/ai_avatar.png" alt="AI" width={32} height={32} className="w-full h-full object-cover" />
                  )}
                </div>
                <div
                  className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm ${
                    m.role === "user"
                      ? "bg-white text-black rounded-tr-sm"
                      : "bg-[#111827] text-white/90 border border-white/5 rounded-tl-sm"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-[#3B5BFF] to-[#7B61FF] overflow-hidden shadow-md border border-[#7B61FF]/30">
                  <Image src="/images/ai_avatar.png" alt="AI" width={32} height={32} className="w-full h-full object-cover" />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-[#111827] text-white/90 border border-white/5 rounded-tl-sm flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-red-400 text-xs text-center p-2 bg-red-400/10 rounded-lg border border-red-400/20">
                Sorry, something went wrong or the AI service is unavailable.
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-white/10 bg-black/40">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
            >
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Type a short reply..."
                className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/40"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !(input || "").trim()}
                className="text-[#3B5BFF] hover:text-[#7B61FF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
