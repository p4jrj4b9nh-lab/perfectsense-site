import { cookies } from "next/headers";
import LoginForm from "@/components/analytics/LoginForm";
import { SHOWS } from "@/lib/analytics/types";
import Link from "next/link";

export const metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

export default async function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get("analytics_auth");

  if (!authCookie) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white/90">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            href="/analytics"
            className="text-lg font-[200] tracking-wide text-white/80 hover:text-white transition-colors"
          >
            Analytics
          </Link>

          <div className="flex items-center gap-4 text-sm font-[200]">
            <Link
              href="/analytics"
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/analytics/add"
              className="text-white/40 hover:text-white/70 transition-colors"
            >
              Add Data
            </Link>
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          <div className="flex items-center gap-3 text-sm font-[200]">
            {SHOWS.map((show) => (
              <Link
                key={show.slug}
                href={`/analytics/${show.slug}`}
                className="px-2 py-1 rounded text-white/40 hover:text-white/70 transition-colors"
                style={{
                  borderBottom: `2px solid transparent`,
                }}
                onMouseEnter={undefined}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-1.5"
                  style={{ backgroundColor: show.color }}
                />
                {show.slug.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">{children}</div>
    </div>
  );
}
