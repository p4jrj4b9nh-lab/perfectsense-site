import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://perfectsenseproductions.com"),
  title: {
    default: "Perfect Sense Productions",
    template: "%s | Perfect Sense Productions",
  },
  description: "AI-generated short-form comedy video shows. DNN, Sit Stay Spill, The Yard, and ...processing.",
  keywords: ["Perfect Sense Productions", "AI comedy", "DNN", "Dog News Network", "Sit Stay Spill", "The Yard", "processing pod"],
  authors: [{ name: "Perfect Sense Productions" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Perfect Sense Productions",
    title: "Perfect Sense Productions",
    description: "AI-generated short-form comedy video shows.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Perfect Sense Productions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfect Sense Productions",
    description: "AI-generated short-form comedy video shows.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Perfect Sense Productions",
              description: "AI-generated short-form comedy video shows.",
              url: "https://perfectsenseproductions.com",
              sameAs: [
                "https://tiktok.com/@dnn_show",
                "https://tiktok.com/@sitstayspill_show",
                "https://tiktok.com/@the.yard12",
                "https://tiktok.com/@processing_show",
                "https://instagram.com/dnn_show",
                "https://instagram.com/sitstayspill_show",
                "https://instagram.com/theyard_show",
                "https://instagram.com/processing.show",
                "https://youtube.com/@dnnshow",
                "https://youtube.com/@sitstayspill_show",
                "https://youtube.com/@theyard_show",
                "https://youtube.com/@processing_show",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
