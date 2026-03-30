"use client";

interface KPICardProps {
  label: string;
  value: string;
  target?: number;
  suffix?: string;
  color?: string;
}

function getStatusColor(value: number, target: number): string {
  const ratio = value / target;
  if (ratio >= 1) return "#22c55e";
  if (ratio >= 0.7) return "#eab308";
  return "#ef4444";
}

export default function KPICard({ label, value, target, suffix, color }: KPICardProps) {
  const numericValue = parseFloat(value);
  const statusColor =
    target !== undefined && !isNaN(numericValue)
      ? getStatusColor(numericValue, target)
      : undefined;

  const progress =
    target !== undefined && !isNaN(numericValue)
      ? Math.min((numericValue / target) * 100, 100)
      : undefined;

  return (
    <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-5 flex flex-col gap-3">
      <span className="text-[11px] font-[300] uppercase tracking-[0.15em] text-white/40">
        {label}
      </span>

      <div className="flex items-baseline gap-1">
        <span
          className="text-3xl font-[200] tracking-tight"
          style={{ color: color || "rgba(255,255,255,0.9)" }}
        >
          {value}
        </span>
        {suffix && (
          <span className="text-lg font-[200] text-white/40">{suffix}</span>
        )}
      </div>

      {target !== undefined && progress !== undefined && (
        <div className="space-y-1.5">
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                backgroundColor: statusColor,
              }}
            />
          </div>
          <span className="text-[10px] font-[200] text-white/30">
            Target: {target}
            {suffix}
          </span>
        </div>
      )}
    </div>
  );
}
