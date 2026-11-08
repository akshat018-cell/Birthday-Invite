import type { Metadata, Viewport } from "next";
import { Unbounded, Outfit } from "next/font/google";
import "./globals.css";
import { DesktopBlocker } from "@/components/DesktopBlocker";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://angad14.party"),
  title: "Angad's 14th Birthday Bash",
  description:
    "Official VIP invitation for Angad Khandelwal's 14th Birthday Bash on 11 November 2026. RSVP now!",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Angad's 14th Birthday Bash",
    description:
      "Official VIP invitation for Angad Khandelwal's 14th Birthday Bash on 11 November 2026.",
    url: "https://angad14.party",
    siteName: "Angad's 14th Birthday",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Angad's 14th Birthday Bash",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Angad's 14th Birthday Bash",
    description:
      "Official VIP invitation for Angad Khandelwal's 14th Birthday Bash on 11 November 2026.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#07070D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${unbounded.variable} ${outfit.variable}`}>
      <body className="bg-[#07070D] text-gray-100 min-h-dvh font-body selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Background Atmosphere Mesh & Faint Grain */}
        <div className="bg-gradient-mesh" aria-hidden="true" />
        <div className="bg-grain" aria-hidden="true" />

        {/* Desktop Blocker Screen for Viewports >= 768px */}
        <DesktopBlocker />

        {/* Mobile Viewport Wrapper (360px - 430px centered column) */}
        <div className="block md:hidden relative z-10 w-full min-h-dvh flex flex-col items-center">
          <div className="w-full max-w-[430px] min-h-dvh flex flex-col relative px-safe pt-safe pb-safe shadow-[0_0_80px_rgba(0,0,0,0.8)] bg-[#07070D]/40">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

