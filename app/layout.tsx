import type { Metadata } from "next";
import { Geist, Geist_Mono, Public_Sans } from "next/font/google";
import Navbar from "@/components/layout/navbar/navbar";
import "./globals.css";
import Footer from "@/components/layout/footer/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Vanna Finance",
  description: "Vanna provides superior APYs for lenders and empowers traders with cross-market strategies using composable leverage and chain abstraction.",
  icons: {
    icon: "/icons/favicon.ico",
  },
  openGraph: {
    title: "Vanna Finance",
    description: "Vanna provides superior APYs for lenders and empowers traders with cross-market strategies using composable leverage and chain abstraction.",
    images: ["https://www.vanna.finance/images/preview.png"],
    url: "https://www.vanna.finance/join-waitlist",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vanna Finance",
    description: "Vanna provides superior APYs for lenders and empowers traders with cross-market strategies using composable leverage and chain abstraction.",
    images: ["https://www.vanna.finance/images/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${publicSans.variable} antialiased  `}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
