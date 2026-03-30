"use client";

import { useState } from "react";
import type { EpisodeWithMetrics } from "@/lib/analytics/types";
import { KPI_TARGETS } from "@/lib/analytics/types";

type SortKey =
  | "number"
  | "title"
  | "launch_date"
  | "views"
  | "likes"
  | "comments"
  | "shares"
  | "saves"
  | "engagement_rate"
  | "share_rate";

interface MetricsTableProps {
  episodes: EpisodeWithMetrics[];
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

function rateColor(value: number, target: number): string {
  if (value >= target) return "text-green-400";
  if (value >= target * 0.7) return "text-yellow-400";
  return "text-red-400";
}

export default function MetricsTable({ episodes }: MetricsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("number");
  const [sortAsc, setSortAsc] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const sorted = [...episodes].sort((a, b) => {
    let av: number | string;
    let bv: number | string;

    switch (sortKey) {
      case "number":
        av = a.number;
        bv = b.number;
        break;
      case "title":
        av = a.title;
        bv = b.title;
        break;
      case "launch_date":
        av = a.launch_date || "";
        bv = b.launch_date || "";
        break;
      case "views":
        av = a.totals.views;
        bv = b.totals.views;
        break;
      case "likes":
        av = a.totals.likes;
        bv = b.totals.likes;
        break;
      case "comments":
        av = a.totals.comments;
        bv = b.totals.comments;
        break;
      case "shares":
        av = a.totals.shares;
        bv = b.totals.shares;
        break;
      case "saves":
        av = a.totals.saves;
        bv = b.totals.saves;
        break;
      case "engagement_rate":
        av = a.totals.engagement_rate;
        bv = b.totals.engagement_rate;
        break;
      case "share_rate":
        av = a.totals.share_rate;
        bv = b.totals.share_rate;
        break;
      default:
        av = a.number;
        bv = b.number;
    }

    if (typeof av === "string" && typeof bv === "string") {
      return sortAsc ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    return sortAsc ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  const columns: { key: SortKey; label: string; className?: string }[] = [
    { key: "number", label: "#", className: "w-12" },
    { key: "title", label: "Title", className: "min-w-[140px]" },
    { key: "launch_date", label: "Launch" },
    { key: "views", label: "Views" },
    { key: "likes", label: "Likes" },
    { key: "comments", label: "Comments" },
    { key: "shares", label: "Shares" },
    { key: "saves", label: "Saves" },
    { key: "engagement_rate", label: "Eng %" },
    { key: "share_rate", label: "Share %" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-[200]">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                className={`px-3 py-3 text-left text-[11px] uppercase tracking-[0.12em] text-white/40 font-[300] cursor-pointer hover:text-white/70 transition-colors select-none ${col.className || ""}`}
              >
                {col.label}
                {sortKey === col.key && (
                  <span className="ml-1 text-white/60">
                    {sortAsc ? "\u2191" : "\u2193"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((ep) => (
            <>
              <tr
                key={ep.id}
                onClick={() => setExpandedId(expandedId === ep.id ? null : ep.id)}
                className="border-b border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors"
              >
                <td className="px-3 py-3 text-white/50">{ep.number}</td>
                <td className="px-3 py-3 text-white/80">{ep.title}</td>
                <td className="px-3 py-3 text-white/40">
                  {ep.launch_date
                    ? new Date(ep.launch_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "\u2014"}
                </td>
                <td className="px-3 py-3 text-white/70">{fmt(ep.totals.views)}</td>
                <td className="px-3 py-3 text-white/50">{fmt(ep.totals.likes)}</td>
                <td
                  className={`px-3 py-3 ${rateColor(
                    ep.totals.comment_rate,
                    KPI_TARGETS.comment_rate
                  )}`}
                >
                  {fmt(ep.totals.comments)}
                </td>
                <td
                  className={`px-3 py-3 ${rateColor(
                    ep.totals.share_rate,
                    KPI_TARGETS.share_rate
                  )}`}
                >
                  {fmt(ep.totals.shares)}
                </td>
                <td className="px-3 py-3 text-white/50">{fmt(ep.totals.saves)}</td>
                <td className="px-3 py-3 text-white/60">
                  {ep.totals.engagement_rate.toFixed(1)}%
                </td>
                <td
                  className={`px-3 py-3 font-[300] ${rateColor(
                    ep.totals.share_rate,
                    KPI_TARGETS.share_rate
                  )}`}
                >
                  {ep.totals.share_rate.toFixed(2)}%
                </td>
              </tr>

              {expandedId === ep.id && ep.posts.length > 0 && (
                <tr key={`${ep.id}-detail`}>
                  <td colSpan={10} className="bg-white/[0.02] px-6 py-3">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-[300] mb-2">
                        Platform Breakdown
                      </p>
                      {ep.posts.map((post) => (
                        <div
                          key={post.id}
                          className="flex items-center gap-4 text-xs text-white/50"
                        >
                          <span className="w-32 text-white/60 font-[300]">
                            {post.platform.replace("_", " ")}
                          </span>
                          <span className="text-white/30">{post.asset_type}</span>
                          {post.latest_metrics ? (
                            <>
                              <span>{fmt(post.latest_metrics.views)} views</span>
                              <span>{fmt(post.latest_metrics.likes)} likes</span>
                              <span>{fmt(post.latest_metrics.shares)} shares</span>
                              <span>{fmt(post.latest_metrics.comments)} comments</span>
                            </>
                          ) : (
                            <span className="text-white/20">No metrics yet</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}

          {sorted.length === 0 && (
            <tr>
              <td colSpan={10} className="px-3 py-8 text-center text-white/30">
                No episodes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
