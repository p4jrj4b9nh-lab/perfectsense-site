import Link from "next/link";
import { getShows } from "@/lib/analytics/db";
import { SHOWS } from "@/lib/analytics/types";
import SetupButton from "@/components/analytics/SetupButton";

export default async function AnalyticsDashboard() {
  let shows: Awaited<ReturnType<typeof getShows>> = [];
  let dbError = false;

  try {
    shows = await getShows();
  } catch {
    dbError = true;
  }

  // Merge DB shows with registry for display
  const showCards = SHOWS.map((reg) => {
    const dbShow = shows.find((s) => s.slug === reg.slug);
    return { ...reg, inDb: !!dbShow, id: dbShow?.id };
  });

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-[200] tracking-wide text-white/90 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-sm font-[200] text-white/40">
          Performance tracking across all shows
        </p>
      </div>

      {/* Quick Stats */}
      {shows.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-[300]">
              Shows
            </p>
            <p className="text-2xl font-[200] text-white/90 mt-1">
              {shows.length}
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-[300]">
              Registered
            </p>
            <p className="text-2xl font-[200] text-white/90 mt-1">
              {SHOWS.length}
            </p>
          </div>
          <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 col-span-2 sm:col-span-2">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/40 font-[300]">
              Status
            </p>
            <p className="text-2xl font-[200] text-white/90 mt-1">
              {dbError ? "DB Offline" : "Online"}
            </p>
          </div>
        </div>
      )}

      {/* Show Cards */}
      <div>
        <h2 className="text-lg font-[200] tracking-wide text-white/60 mb-4">
          Shows
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {showCards.map((show) => (
            <Link
              key={show.slug}
              href={`/analytics/${show.slug}`}
              className="group bg-[#1a1a1a] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: show.color }}
                />
                <h3 className="text-base font-[200] text-white/80 group-hover:text-white transition-colors">
                  {show.name}
                </h3>
              </div>
              <p className="text-xs font-[200] text-white/30">
                {show.inDb ? "Active in database" : "Not yet initialized"}
              </p>
              <p className="text-xs font-[200] text-white/20 mt-1">
                /{show.slug}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Setup Section */}
      <div className="border-t border-white/5 pt-8">
        <h2 className="text-lg font-[200] tracking-wide text-white/60 mb-2">
          Setup
        </h2>
        <p className="text-sm font-[200] text-white/30 mb-4">
          Initialize or reset the analytics database tables and seed show data.
        </p>
        <SetupButton />

        {dbError && (
          <p className="mt-4 text-sm font-[200] text-yellow-400/70">
            Database connection failed. Run migration to initialize tables, or
            check your POSTGRES_URL environment variable.
          </p>
        )}
      </div>
    </div>
  );
}
