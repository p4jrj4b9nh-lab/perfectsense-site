"use client";

import { useState, useEffect } from "react";

interface PollOption {
  id: string;
  label: string;
  color?: string;
}

interface PollWidgetProps {
  question: string;
  options: PollOption[];
}

export default function PollWidget({ question, options }: PollWidgetProps) {
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("psp-poll-votes");
    const storedChoice = localStorage.getItem("psp-poll-choice");
    if (stored) setVotes(JSON.parse(stored));
    if (storedChoice) setVoted(storedChoice);
  }, []);

  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (id: string) => {
    if (voted) return;
    const newVotes = { ...votes, [id]: (votes[id] || 0) + 1 };
    setVotes(newVotes);
    setVoted(id);
    localStorage.setItem("psp-poll-votes", JSON.stringify(newVotes));
    localStorage.setItem("psp-poll-choice", id);
  };

  return (
    <div className="max-w-md">
      <p className="text-[15px] font-[200] text-white mb-6">{question}</p>
      <div className="space-y-3">
        {options.map((opt) => {
          const count = votes[opt.id] || 0;
          const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;

          return (
            <button
              key={opt.id}
              onClick={() => handleVote(opt.id)}
              disabled={!!voted}
              className={`w-full text-left relative overflow-hidden border transition-all ${
                voted === opt.id ? "border-white/30" : "border-white/10 hover:border-white/20"
              } px-4 py-3`}
            >
              {voted && (
                <div
                  className="absolute inset-0 opacity-15 transition-all duration-500"
                  style={{ width: `${pct}%`, background: opt.color || "#fff" }}
                />
              )}
              <div className="relative flex justify-between items-center">
                <span className="text-[14px] font-[200] text-white">{opt.label}</span>
                {voted && (
                  <span className="text-[12px] font-[300] text-[#999]">{pct}%</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
      {voted && (
        <p className="text-[11px] font-[200] text-[#555] mt-3">
          {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
