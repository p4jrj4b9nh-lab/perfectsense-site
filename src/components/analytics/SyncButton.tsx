"use client";

import { useState } from "react";

interface SyncButtonProps {
  showSlug: string;
}

export default function SyncButton({ showSlug }: SyncButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  async function handleSync() {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`/api/analytics/sync-youtube?show=${showSlug}`);
      const data = await res.json();

      if (!res.ok) {
        setResult(`Error: ${data.error || "Sync failed"}`);
        return;
      }

      setResult(
        `Synced ${data.matched ?? 0} matched, ${data.created ?? 0} created`
      );
    } catch {
      setResult("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="inline-flex items-center gap-3">
      <button
        onClick={handleSync}
        disabled={loading}
        className="px-4 py-2 text-sm font-[200] bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white/80 transition-colors disabled:opacity-40"
      >
        {loading ? "Syncing..." : "Sync YouTube"}
      </button>
      {result && (
        <span className="text-xs font-[200] text-white/40">{result}</span>
      )}
    </div>
  );
}
