import type { Metadata } from "next";
import EmailSignup from "@/components/EmailSignup";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Merch for humans and their dogs. Coming soon from Perfect Sense Productions.",
};

const categories = [
  {
    name: "Human Apparel",
    description: "Hoodies, tees, and hats from every show.",
  },
  {
    name: "Dog Apparel",
    description: "Bandanas, sweaters, and collars your dog will tolerate.",
  },
  {
    name: "Accessories",
    description: "Mugs, stickers, and things you didn\u2019t know you needed.",
  },
  {
    name: "Dog Supplies",
    description: "Bowls, toys, and treats endorsed by our cast.",
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center pt-24">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-[200] tracking-[0.04em] leading-none mb-6">
          Shop
          <span
            className="inline-block w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] md:w-[20px] md:h-[20px] bg-[#0a0a0a] rounded-full ml-1"
            style={{ verticalAlign: '-0.05em' }}
            aria-hidden="true"
          />
        </h1>
        <p className="text-sm sm:text-base font-[200] text-[#666]">
          Merch for humans and their dogs.
        </p>
        <p className="text-xs font-[200] tracking-[6px] uppercase text-[#999] mt-6">
          Coming Soon
        </p>
      </section>

      {/* Category Previews */}
      <section className="px-6 sm:px-10 lg:px-20 py-24 md:py-32 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="border border-black/5 rounded-xl p-8 hover:border-black/10 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-[200] tracking-[0.02em] text-[#0a0a0a] mb-3">
                {cat.name}
              </h3>
              <p className="text-sm font-[200] text-[#888] leading-[1.8]">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Email Signup */}
      <section className="px-6 sm:px-10 lg:px-20 py-24 md:py-32 max-w-2xl mx-auto">
        <EmailSignup heading="Get notified when the shop opens." dark={false} accentColor="#0a0a0a" />
      </section>
    </div>
  );
}
