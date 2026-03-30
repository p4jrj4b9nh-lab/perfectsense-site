"use client";

import { useState } from "react";

export default function SetupButton() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  async function handleMigrate() {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/analytics/migrate", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        setResult(`Error: ${data.error || "Migration failed"}`);
      } else {
        setResult("Database initialized successfully");
      }
    } catch {
      setResult("Network error");
    } finally {
      setLoading(false);
      setConfirmed(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handleMigrate}
        disabled={loading}
        className="px-4 py-2 text-sm font-[200] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white/80 transition-colors disabled:opacity-40"
      >
        {loading
          ? "Running..."
          : confirmed
            ? "Confirm -- this will initialize the database"
            : "Run Migration"}
      </button>
      {result && (
        <span
          className={`text-xs font-[200] ${
            result.startsWith("Error") ? "text-red-400" : "text-green-400"
          }`}
        >
          {result}
        </span>
      )}
    </div>
  );
}
