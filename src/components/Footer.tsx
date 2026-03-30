import Link from "next/link";

const showLinks = [
  { name: "DNN", href: "/dnn" },
  { name: "Sit Stay Spill", href: "/sitstayspill" },
  { name: "The Yard", href: "/theyard" },
  { name: "...processing", href: "/processing" },
];

const companyLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Custom Videos", href: "/custom" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-0 mb-4">
              <span className="text-lg font-[200] tracking-[0.15em] text-[#0a0a0a]">
                Perfect Sense
              </span>
              <span className="inline-block w-[7px] h-[7px] bg-[#0a0a0a] rounded-full ml-[3px]" />
            </Link>
          </div>

          {/* Shows */}
          <div>
            <p className="text-[10px] font-[200] tracking-[0.3em] uppercase text-[#999] mb-4">Shows</p>
            <div className="space-y-2">
              {showLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[14px] font-[200] text-[#666] hover:text-[#0a0a0a] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-[10px] font-[200] tracking-[0.3em] uppercase text-[#999] mb-4">Company</p>
            <div className="space-y-2">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-[14px] font-[200] text-[#666] hover:text-[#0a0a0a] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar — centered copyright only */}
        <div className="border-t border-black/5 pt-8 text-center">
          <p className="text-[12px] font-[200] text-[#999]">
            &copy; 2026 Perfect Sense Productions
          </p>
        </div>
      </div>
    </footer>
  );
}
