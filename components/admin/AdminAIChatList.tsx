"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Bot, User, MessageSquare } from "lucide-react";

type Message = { role: string; content: string };
type AIChatSession = {
  id: string;
  sessionId: string;
  messages: Message[];
  updatedAt: Date;
};

export function AdminAIChatList({ sessions }: { sessions: AIChatSession[] }) {
  const [selectedSession, setSelectedSession] = useState<AIChatSession | null>(sessions[0] || null);

  return (
    <div className="p-6 h-[calc(100vh-80px)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">AI Chat Logs</h1>
          <p className="text-white/60 text-sm mt-1">Review conversations between leads and the AI assistant.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[calc(100%-80px)]">
        {/* Sidebar List */}
        <div className="col-span-1 bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <h2 className="text-sm font-semibold text-white">Recent Chats</h2>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2">
            {sessions.length === 0 && (
              <div className="text-center p-8 text-white/40 text-sm">No chat logs found.</div>
            )}
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`w-full text-left p-3 rounded-xl transition-colors ${
                  selectedSession?.id === session.id
                    ? "bg-[#3B5BFF]/20 border border-[#3B5BFF]/30"
                    : "hover:bg-white/5 border border-transparent"
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-[#3B5BFF]" />
                    Session: {session.sessionId.slice(-6)}
                  </span>
                  <span className="text-white/40 text-xs">
                    {format(new Date(session.updatedAt), "MMM d, h:mm a")}
                  </span>
                </div>
                <div className="text-white/60 text-xs truncate">
                  {session.messages.length} messages
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Transcript View */}
        <div className="col-span-2 bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
          {selectedSession ? (
            <>
              <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-white">
                  Transcript: {selectedSession.sessionId}
                </h2>
                <span className="text-xs text-white/50">
                  Updated: {format(new Date(selectedSession.updatedAt), "PPpp")}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {selectedSession.messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${
                        m.role === "user"
                          ? "bg-white/10"
                          : "bg-gradient-to-br from-[#3B5BFF] to-[#7B61FF]"
                      }`}
                    >
                      {m.role === "user" ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Bot className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div
                      className={`px-5 py-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-white text-black rounded-tr-sm"
                          : "bg-[#111827] text-white/90 border border-white/5 rounded-tl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-white/40">
              <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
              <p>Select a chat session to view the transcript</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
